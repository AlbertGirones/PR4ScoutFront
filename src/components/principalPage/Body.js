import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../../services/authService'; // Asegúrate de importar authService
import '../../styles/principalPage.css';

const Body = () => {
  const [data, setData] = useState([]);
  const currentUser = authService.getCurrentUser(); // Obtiene el usuario actual

  useEffect(() => {
    if (currentUser && currentUser.idUser) {
      axios.get(`http://localhost:5000/api/userDataRoutes/${currentUser.idUser}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error al obtener datos:', error);
        });
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }, [currentUser]);

  return (
    <main>
      {data.length > 0 && (
        <div className="flex-message">
          <p>Hola, {data[0].userName} {data[0].userSurname}!</p>
          <div className="flex-mssgItem">
            <img src={data[0].image} alt="Avatar del usuario"/>
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

      {/* {data.length > 0 && <Link to={`/team-matches/${data[0].clubId}`}>Agregar partidos</Link>} */}
    </main>
  );
};

export default Body;
