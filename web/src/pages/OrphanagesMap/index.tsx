import React from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'

import mapMarkerImg from '../../images/map-marker.svg'

import 'leaflet/dist/leaflet.css'
import './styles.css';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
})

const OrphanagesMap: React.FC = () => {
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
      
        <Marker position={[-26.0658396,-53.088474]} icon={mapIcon}>
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Teste
            <Link to="/orphanages/1">
              <FiArrowRight size={20} color="#FFF" />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;