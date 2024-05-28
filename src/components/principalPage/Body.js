import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../../services/authService';
import '../../styles/principalPage.css';

const Body = () => {
  const [data, setData] = useState([]);
  const [upcomingMatch, setUpcomingMatch] = useState(null);
  const [recentMatches, setRecentMatches] = useState([]);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (currentUser && currentUser.idUser) {
      axios.get(`http://localhost:5000/api/userDataRoutes/${currentUser.idUser}`)
        .then(response => {
          setData(response.data);
          const clubId = response.data[0].clubId;
          fetchLastMatches(clubId);
        })
        .catch(error => {
          console.error('Error al obtener datos:', error);
        });
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }, [currentUser]);

  const fetchLastMatches = (clubId) => {
    axios.get(`http://localhost:5000/api/matches/upcomingAndRecent/${clubId}`)
      .then(response => {
        setUpcomingMatch(response.data.upcomingMatch);
        setRecentMatches(response.data.recentMatches);
      })
      .catch(error => {
        console.error('Error al obtener los últimos partidos:', error);
      });
  };

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
        <div className="flex-items">
          <h2>Próximo Partido</h2>
          {upcomingMatch ? (
            <div>
              <p>Rival: {upcomingMatch.rival_name}</p>
              <img src={upcomingMatch.rival_image} alt={upcomingMatch.rival_name} />
              <p>Fecha: {upcomingMatch.match_day} a las {upcomingMatch.match_hour}</p>
              <p>Localidad: {upcomingMatch.local_or_visitor}</p>
              <p>Resultado: {upcomingMatch.result}</p>
            </div>
          ) : (
            <p>No hay próximos partidos.</p>
          )}

          <h2>Partidos Recientes</h2>
          {recentMatches.map((match, index) => (
            <div key={index}>
              <p>Rival: {match.rival_name}</p>
              <img src={match.rival_image} alt={match.rival_name} />
              <p>Fecha: {match.match_day} a las {match.match_hour}</p>
              <p>Localidad: {match.local_or_visitor}</p>
              <p>Resultado: {match.result}</p>
            </div>
          ))}
        </div>
        <div className="flex-items">Este DIV es el de OJEADOR</div>
        <div className="flex-items">Este DIV es el de MIS JUGADORES</div>
        <div className="flex-items">Este DIV es el de MIS RIVALES</div>
      </div>
    </main>
  );
};

export default Body;
