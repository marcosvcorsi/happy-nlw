import React, { useCallback, useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../../images/map-marker.svg'

import { mapIcon } from '../../utils/mapIcon.';

import './styles.css';
import api from '../../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const loadOrphanges = useCallback(async () => {
    const {data} = await api.get('/orphanages');

    setOrphanages(data);
  }, [])

  useEffect(() => {
    loadOrphanges();
  }, [loadOrphanges])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Marker"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>
            Muitas crianças estão esperando sua visita :)
          </p>
        </header>

        <footer>
            <strong>Francisco Beltrão</strong>
            <span>Paraná</span>
          </footer>
      </aside>

     

      <Map center={[ -26.0658396,-53.088474]} zoom={13} style={{width: '100%', height: '100%'}}>
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
      
        {orphanages.map(orphanage => (
          <Marker position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon} key={orphanage.id}>
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              Teste
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;