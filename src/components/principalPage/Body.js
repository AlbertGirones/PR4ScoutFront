import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/principalPage.css';
import logoProv from '../../img/2561.png';

const Body = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/userDataRoutes')
      .then(response => {
        setData(response.data);
        console.log(response)
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  return (
    <main>
      {data.length > 0 && (
        <div className="flex-message">
          <p>Hola, {data[0].userName} {data[0].userSurname}!</p>
          <div className="flex-mssgItem">
            <img src={logoProv} alt="Avatar del usuario" />
            <p>{data[0].teamName}</p>
          </div>
        </div>
      )}

      <div className="flex-container">
        <div className="flex-items">Este DIV es el de MIS PARTIDOS</div>
        <div className="flex-items">Este DIV es el de OJEADOR</div>
        <div className="flex-items">Este DIV es el de MIS JUGADORES</div>
        <div className="flex-items">Este DIV es el de MIS RIVALES</div>
      </div>

      <Link to="/add-team">Crear equipo</Link>
    </main>
  );
}

export default Body;
