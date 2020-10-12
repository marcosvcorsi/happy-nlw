import React from 'react';
import {FiArrowRight} from 'react-icons/fi'
import { Link } from 'react-router-dom';

import logoImg from '../../images/logo.svg'

import './styles.css'

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
    <div className="content-wrapper">
      <img src={logoImg} alt="Happy"/>

      <main>
        <h1>Leve felicidade para o mundo</h1>
        <p>Visita orfanatos e mude o dia de muitas crianças.</p>
      </main>

      <div className="location">
        <strong>Francisco Beltrão</strong>
        <span>Paraná</span>
      </div>

      <Link className="enter-app" to="/app">
        <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>
      </Link>
    </div>
  </div>
  );
}

export default Landing;