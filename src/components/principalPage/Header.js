import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logoPrincipal.png';
import logoutLogo from '../../img/logoutLogo.svg';
import loginLogo from '../../img/login.svg';
import authService from '../../services/authService';
import axios from 'axios';
import '../../styles/principalPage.css';

const Header = () => {
  const [teamId, setTeamId] = useState(null);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      axios.get(`/api/user/${currentUser.idUser}/team`)
        .then(response => {
          setTeamId(response.data.teamId);
        })
        .catch(error => {
          console.error('Error fetching team ID:', error);
        });
    }
  }, [currentUser]);

  return (
    <header>
      <nav className="container">
        <img className="logoPrincipal" src={logo} alt="Logo principal" />
        {currentUser ? (
          <div className="navLinks">
            <><Link to="/add-team" className="Link">Crear equipo</Link><Link to="/add-player" className="Link">Crear jugador</Link><Link to="/add-league" className="Link">Añadir liga</Link><Link to={`/addMatchScreen/${teamId}`} className="Link">Añadir jornadas</Link><Link to="/logout" className="LinkLogoLogout"><img className="logoLogout" src={logoutLogo} alt="Logout" /></Link></>
          </div>
        ) : (
          <img className="logoLogin" src={loginLogo} alt="Login" />
        )}
      </nav>
    </header>
  );
}

export default Header;