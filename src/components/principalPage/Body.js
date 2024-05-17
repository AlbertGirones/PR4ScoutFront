import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/principalPage.css';

const Body = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/userDataRoutes')
      .then(response => {
        setData(response.data);
        console.log(response);
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
            <img src={data[0].image} alt="Avatar del usuario" />
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
      <Link to="/add-player">Crear jugador</Link>

    </main>
  );
}

export default Body;
