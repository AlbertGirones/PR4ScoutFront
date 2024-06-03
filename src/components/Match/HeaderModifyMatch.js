import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logoPrincipal.png';
import backLogo from '../../img/back.svg';
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
        <Link to="/">
          <img className="logoPrincipal" src={logo} alt="Logo principal" />
        </Link>
        <Link to={`/MatchScreen/${teamId}`}>
          <img className="logoBack" src={backLogo} alt="Tornar ..." />
        </Link>
      </nav>
    </header>
  );
}

export default Header;