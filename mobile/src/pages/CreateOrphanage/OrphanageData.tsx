import React, { useCallback, useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import * as ImagePicker from 'expo-image-picker';

interface RouteParams {
  position: {
    latitude: number;
    longitude: number;
  }
}

export default function OrphanageData() {
  const navigation = useNavigation();
  const route = useRoute();

  const params = route.params as RouteParams;

  const [formValues, setFormValues] = useState({
    name: '',
    about: '',
    instructions: '',
    opening_hours: '',
    open_on_weekends: true,
  });

  const [images, setImages] = useState<string[]>([]);

  const handleInputChange = useCallback((key, value) => {
    setFormValues(state => ({
      ...state,
      [key]: value
    }))
  }, [])

  const handleSelectImages = useCallback(async () => {
    const {status} = await ImagePicker.requestCameraRollPermissionsAsync();

    if(status !== 'granted') {
      Alert.alert('Ooops', 'Precisamos da permissão para enviar as fotos')
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if(result.cancelled) {
      return;
    }

    const {uri} = result;

    setImages(state => [...state, uri])
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const {name, about, instructions, opening_hours, open_on_weekends} = formValues;

      const {latitude, longitude} = params.position;

      const formData = new FormData();

      formData.append('name', name);
      formData.append('about', about);
      formData.append('instructions', instructions);
      formData.append('opening_hours', opening_hours);
      formData.append('open_on_weekends', String(open_on_weekends));
      formData.append('latitude', String(latitude));
      formData.append('longitude', String(longitude));

      images.forEach((image, index) => {
        formData.append('images', {
          name: `image_${index}.jpg`,
          type: 'image/jpg',
          uri: image
        } as any);
      })

      await api.post('/orphanages', formData);

      Alert.alert('Sucesso', 'Orfanato cadastrado com sucesso');

      navigation.navigate('OrphanagesMap');
    } catch(error) {
      Alert.alert('Erro', 'erro ao cadastrar orfanato');
    } 
  }, [formValues, params.position])

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={formValues.name}
        onChangeText={text => handleInputChange('name', text)}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={formValues.about}
        onChangeText={text => handleInputChange('about', text)}
      />
{/* 
      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      /> */}

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map(image => (
          <Image source={{uri: image}} style={styles.uploadedImage} key={image}/>
        ))}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={formValues.instructions}
        onChangeText={text => handleInputChange('instructions', text)}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={formValues.opening_hours}
        onChangeText={text => handleInputChange('opening_hours', text)}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={formValues.open_on_weekends}
          onValueChange={value => handleInputChange('open_on_weekends', value)}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: 'row'
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})