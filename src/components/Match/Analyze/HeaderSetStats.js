import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../img/logoPrincipal.png';
import '../../../styles/principalPage.css';

const Header = () => {
  return (
    <header>
      <nav className="container">
        <Link to="/">
          <img className="logoPrincipal" src={logo} alt="Logo principal" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;