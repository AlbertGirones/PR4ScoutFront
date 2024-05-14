import React, { useState } from 'react';
import logo from '../../img/logoPrincipal.png';
import logoutLogo from '../../img/logoutLogo.svg';
import loginLogo from '../../img/login.svg';
import '../../styles/principalPage.css';

const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header>
      <nav class="container">
        <img class="logoPrincipal" src={logo} alt="Logo principal" />
        {isLoggedIn ? (
          <img class="logoLogout" src={logoutLogo} alt="Logout" />
        ) : (
          <img class="logoLogin" src={loginLogo} alt="Login" />
        )}
      </nav>
    </header>
  );
}

export default Header;