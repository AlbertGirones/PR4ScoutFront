import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logoPrincipal.png';
import backLogo from '../../img/back.svg';
import '../../styles/principalPage.css';

const Header = () => {

  return (
    <header>
      <nav className="container">
        <img className="logoPrincipal" src={logo} alt="Logo principal" />
        <Link to="/">
          <img className="logoBack" src={backLogo} alt="Tornar ..." />
        </Link>
      </nav>
    </header>
  );
}

export default Header;