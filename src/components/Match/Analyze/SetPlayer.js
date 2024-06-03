import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const SetPlayer = () => {
  const { matchId } = useParams();
  const [matchInfo, setMatchInfo] = useState({});
  const [localTeam, setLocalTeam] = useState(null);
  const [visitantTeam, setVisitantTeam] = useState(null);
  const [localPlayers, setLocalPlayers] = useState([]);
  const [visitantPlayers, setVisitantPlayers] = useState([]);

  useEffect(() => {
    fetchMatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId]);

  useEffect(() => {
    if (localTeam) {
      fetchLocalPlayers();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTeam]);

  useEffect(() => {
    if (visitantTeam) {
      fetchVisitantPlayers();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitantTeam]);

  const fetchMatch = () => {
    axios.get(`/api/infoMatch/${matchId}`)
      .then(response => {
        setMatchInfo(response.data);
        setLocalTeam(response.data.local_team);
        setVisitantTeam(response.data.visitor_team);
      })
      .catch(error => {
        console.error('Error fetching match:', error);
      });
  };

  const fetchLocalPlayers = () => {
    axios.get(`/api/localPlayersOfMatch/${localTeam}/${matchId}`)
      .then(response => {
        setLocalPlayers(response.data);
      })
      .catch(error => {
        console.error('Error fetching local players:', error);
      });
  };

  const fetchVisitantPlayers = () => {
    axios.get(`/api/visitantPlayersOfMatch/${visitantTeam}/${matchId}`)
      .then(response => {
        setVisitantPlayers(response.data);
      })
      .catch(error => {
        console.error('Error fetching visitant players:', error);
      });
  };
  
  return (
    <>
      <div className='matchFlex'>
        <div className='teamIcons'>
          <img src={matchInfo.local_team_image} alt={matchInfo.local_team_name} className='escudoSetPlayer' />
          <p>-</p>
          <img src={matchInfo.visitor_team_image} alt={matchInfo.visitor_team_name} className='escudoSetPlayer' />
        </div>
        <div className='JourneyHour'>
          <div className='DayHour'>
            <p>{matchInfo.dayGood}</p>
            <p>{matchInfo.hourGood}</p>
          </div>
          <h1>Jornada {matchInfo.journey}</h1>
        </div>
      </div>
      <div className='playersBox'>
        <div className='contentPlayers'>
          <h2>Jugadores {matchInfo.local_team_name}</h2>
          <ul className='playersList'>
            {localPlayers.length === 0 ? (
                <li>No quedan jugadores por analizar</li>
              ) : (
                localPlayers.map((player, index) => (
                  <li className={index % 2 === 0 ? 'par' : 'impars'}>
                    <Link to={`/AnalyzePlayer/SetStats/${matchId}/${player.id_player}`}>
                      <img src={player.image ? `/${player.image}` : 'imagen_por_defecto.jpg'} alt={player.name} className='fotoPlayerSetPlayer' />
                      <p className='NamePlayer'>{player.name}</p>
                      <div className="position">{player.position}</div>
                    </Link>
                  </li>
                ))
              )}
          </ul>
        </div>
        <div className='contentPlayers'>
          <h2>Jugadores {matchInfo.visitor_team_name}</h2>
          <ul className='playersList'>
            {visitantPlayers.length === 0 ? (
              <li>No quedan jugadores por analizar</li>
            ) : (
              visitantPlayers.map((player, index) => (
                <li key={index} className={index % 2 === 0 ? 'par' : 'impar'}>
                  <Link to={`/AnalyzePlayer/SetStats/${matchId}/${player.id_player}`}>
                    <img src={player.image ? `/${player.image}` : 'imagen_por_defecto.jpg'} alt={player.name} className='fotoPlayerSetPlayer' />
                    <p className='NamePlayer'>{player.name}</p>
                    <div className="position">{player.position}</div>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SetPlayer;
