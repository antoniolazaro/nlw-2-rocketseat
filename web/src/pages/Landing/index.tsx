import React, { useState, useEffect } from 'react';

import LogoImg from '../../assets/images/logo.svg';
import LandingImg from '../../assets/images/landing.svg';
import StudyIcon from '../../assets/images/icons/study.svg';
import GiveClassIcon from '../../assets/images/icons/give-classes.svg';
import PurpleIcon from '../../assets/images/icons/purple-heart.svg';
import './styles.css';
import { Link } from 'react-router-dom';
import api from '../../service/api';

function Landing(){

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response =>{
            const {total} = response.data;
            setTotalConnections(total);
        })
    }, 
    []);

    return (
    <div id="page-landing">
        <div id="page-landing-content" className="container">
            <div className="logo-container">
                <img src={LogoImg} alt="Proffy Logo" />
                <h2>Sua plataforma de estudos online.</h2>
            </div>
            <img 
            src={LandingImg} 
            alt="Plataforma de estudos" 
            className="hero-image"
            />

            <div className="buttons-container">
                <Link to="/study" className="study">
                    <img src={StudyIcon} alt="Estudar" />
                    Estudar
                </Link>
                <Link to="/give-classes" className="give-classes">
                    <img src={GiveClassIcon} alt="Dar Aulas" />
                    Dar Aulas
                </Link>               
            </div>
            <span className="total-connections">
    Total de {totalConnections} conexões já realizadas <img src={PurpleIcon} alt="Coração Roxo" />
                </span>

        </div>
    </div>
    );
}

export default Landing;