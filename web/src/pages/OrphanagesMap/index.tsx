import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Map, TileLayer } from 'react-leaflet'

import mapMarkerImg from '../../images/map-marker.svg'

import 'leaflet/dist/leaflet.css'
import './styles.css';

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
      </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;