import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import authService from '../../services/authService';
import logoLocal from '../../img/house-svgrepo-com.svg';
import logoVisitante from '../../img/plane-svgrepo-com.svg';
import '../../styles/principalPage.css';

const Body = () => {
  const [clubId, setClubId] = useState(null);
  const [data, setData] = useState([]);
  const [upcomingMatch, setUpcomingMatch] = useState(null);
  const [recentMatches, setRecentMatches] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [nextRivalInfo, setNextRivalInfo] = useState([]);
  const [scoutedPlayers, setScoutedPlayers] = useState([]);
  const [personalPlayers, setPersonalPlayers] = useState([]);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (currentUser && currentUser.idUser) {
      axios.get(`http://localhost:5000/api/userDataRoutes/${currentUser.idUser}`)
        .then(response => {
          setData(response.data);
          const fetchedClubId = response.data[0].clubId;
          setClubId(fetchedClubId);
        })
        .catch(error => {
          console.error('Error al obtener datos:', error);
        });
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }, [currentUser]);

  useEffect(() => {
    if (clubId) {
      fetchLastMatches(clubId);
      fetchScoutedPlayers(clubId);
      fetchPersonalPlayers(clubId);
      fetchNextTeamInfo(clubId);
    }
  }, [clubId]);

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

  const fetchScoutedPlayers = (clubId) => {
    axios.get(`http://localhost:5000/api/players/getScoutedPlayers/${clubId}`)
      .then(response => {
        setScoutedPlayers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los jugadores ojeados:', error);
      });
  };

  const fetchPersonalPlayers = (clubId) => {
    axios.get(`http://localhost:5000/api/players/getPersonalPlayers/${clubId}`)
      .then(response => {
        setPersonalPlayers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los jugadores personales:', error);
      });
  };

  const fetchNextTeamInfo = (clubId) => {
    axios.get(`http://localhost:5000/api/teams/nextTeamInfo/${clubId}`)
      .then(response => {
        setNextRivalInfo(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la información del siguiente rival:', error);
      });
  };

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
        <Link to={`/MatchScreen/${clubId}`} className="flex-items">
          <h2 className='title'>Próximo Partido</h2>
          {recentMatches.length > 0 && (
            <div className='childContentDiv'>
              <img src={recentMatches[0].rival_image} alt={recentMatches[0].rival_name} className='escudoPP' />
              <p className='onep'>{recentMatches[0].rival_name}</p>
              <p className='twop'>{recentMatches[0].match_day.slice(0, 5)}</p>
              <p className='trep'>{recentMatches[0].match_hour}</p>
              {recentMatches[0].local_or_visitor === 'Local' ? (
                <img src={logoLocal} alt={'Local'} className='lv' />
              ) : (
                <img src={logoVisitante} alt={'Visitante'} className='lv' />
              )}
              {recentMatches[0].result === '-' ? (
                <p className='resultN'>-</p>
              ) : (
                <p className='resultY'>{recentMatches[0].result}</p>
              )}
            </div>
          )}
          {recentMatches.length > 1 && (
            <div className='childContentDiv'>
              <img src={recentMatches[1].rival_image} alt={recentMatches[1].rival_name} className='escudoPP' />
              <p className='onep'>{recentMatches[1].rival_name}</p>
              <p className='twop'>{recentMatches[1].match_day.slice(0, 5)}</p>
              <p className='trep'>{recentMatches[1].match_hour}</p>
              {recentMatches[1].local_or_visitor === 'Local' ? (
                <img src={logoLocal} alt={'Local'} className='lv' />
              ) : (
                <img src={logoVisitante} alt={'Visitante'} className='lv' />
              )}
              {recentMatches[1].result === '-' ? (
                <p className='resultN'>-</p>
              ) : (
                <p className='resultY'>{recentMatches[1].result}</p>
              )}
            </div>
          )}
          {upcomingMatch ? (
            <div className='childContentDiv'>
              <img src={upcomingMatch.rival_image} alt={upcomingMatch.rival_name} className='escudoPP' />
              <p className='onep'>{upcomingMatch.rival_name}</p>
              <p className='twop'>{upcomingMatch.match_day.slice(0, 5)}</p>
              <p className='trep'>{upcomingMatch.match_hour}</p>
              {upcomingMatch.local_or_visitor === 'Local' ? (
                <img src={logoLocal} alt={'Local'} className='lv' />
              ) : (
                <img src={logoVisitante} alt={'Visitante'} className='lv' />
              )}
              {upcomingMatch.result === '-' ? (
                <p className='resultN'>-</p>
              ) : (
                <p className='resultY'>{upcomingMatch.result}</p>
              )}
            </div>
          ) : (
            <p>No hay próximos partidos.</p>
          )}
        </Link>
        <div className="flex-items">
          <Link to={`/ScoutScreen/${clubId}`} className="Link-flex-items">
            <h2 className='title'>Ojeador</h2>
            {scoutedPlayers.map((player, index) => (
              <div key={index} className='childContentDiv'>
                <img src={player.image} alt={player.name} className='fotoPlayerPrincipall' />
                <p className='namePlayer'>{player.name}</p>
                <p className='position'>{player.position}</p>
                <img src={player.escudo} alt={player.teamName} className='escudoPP' />
              </div>
            ))}
          </Link>
        </div>
        <div className="flex-items">
          <Link to={`/MyTeamScreen/${clubId}`} className="Link-flex-items">
            <h2 className='title'>Mis jugadores</h2>
            {personalPlayers.map((player, index) => (
              <div key={index} className='childContentDiv'>
                <img src={player.image} alt={player.name} className='fotoPlayerPrincipall' />
                <p className='namePlayer2'>{player.name}</p>
                <p className='position2'>{player.position}</p>
              </div>
            ))}
          </Link>
        </div>
        {/* <div className="flex-items">
          <h2 className='title'>Próximo Rival</h2>
          {nextRivalInfo.map((player, index) => (
            <div key={index} className='childContentDiv'>
              <img src={player.image} alt={player.name} className='fotoPlayerPrincipall' />
              <p className='namePlayer2'>{player.name}</p>
              <p className='position2'>{player.position}</p>
            </div>
          ))}
        </div> */}
      </div>
    </main>
  );
};

export default Body;
