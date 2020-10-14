import React, { useCallback, useState, ChangeEvent, FormEvent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import { mapIcon } from '../../utils/mapIcon.';

import './styles.css';
import api from '../../services/api';

interface MapPosition {
  latitude: number;
  longitude: number;
}

const CreateOrphanage: React.FC = () => {
  const { push } = useHistory();

  const [position, setPosition] = useState<MapPosition>();

  const [formValues, setFormValues] = useState({
    name: '',
    about: '',
    instructions: '',
    opening_hours: '',
    open_on_weekends: true,
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }, []);

  const handleSelectImages = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;

      const selectedImages = Array.from(event.target.files);

      const selectedImagesPreview = selectedImages.map(selectedImage => {
        return URL.createObjectURL(selectedImage);
      });

      setImages(selectedImages);
      setPreviewImages(selectedImagesPreview);
    },
    [],
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      setFormValues(state => ({
        ...state,
        [name]: value,
      }));
    },
    [],
  );

  const handleSetOpenOnWeekends = useCallback(value => {
    setFormValues(state => ({
      ...state,
      open_on_weekends: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const { latitude, longitude } = position || {};

      const {
        name,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
      } = formValues;

      const data = new FormData();

      data.append('name', name);
      data.append('about', about);
      data.append('instructions', instructions);
      data.append('opening_hours', opening_hours);
      data.append('open_on_weekends', String(open_on_weekends));
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));

      images.forEach(image => {
        data.append('images', image);
      });

      await api.post('/orphanages', data);

      alert('Cadastro realizado com sucesso');

      push('/app');
    },
    [formValues, push, images, position],
  );

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" name="name" onChange={handleInputChange} />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                name="about"
                maxLength={300}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image" />

              <div className="images-container">
                {previewImages.map(image => (
                  <img key={image} src={image} alt="Preview" />
                ))}

                <label className="new-image" htmlFor="images">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input
                  type="file"
                  id="images"
                  multiple
                  onChange={handleSelectImages}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                name="instructions"
                onChange={handleInputChange}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                name="opening_hours"
                onChange={handleInputChange}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={formValues.open_on_weekends ? 'active' : ''}
                  onClick={() => handleSetOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!formValues.open_on_weekends ? 'active' : ''}
                  onClick={() => handleSetOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateOrphanage;
