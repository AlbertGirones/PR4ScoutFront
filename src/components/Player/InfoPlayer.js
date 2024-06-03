import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import './InfoPlayer.css';
import goalIcon from '../../img/football-ball-svgrepo-com.svg';
import yellowCardIcon from '../../img/zzzzz.svg';
import assistIcon from '../../img/football-shoe-svgrepo-com.svg';


const InfoPlayer = () => {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState([]);
    const { playerId} = useParams();
    const [playerStats, setPlayerStats] = useState([]);
    const [playerPosition, setPlayerPosition] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [idTeam, setPlayerTeam] = useState(null);
    const [playerInfo, setPlayerInfo] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [clubIdCurrentUser, setClubId] = useState(null);

    useEffect(() => {
      const fetchUserAndData = async () => {
          const user = authService.getCurrentUser();
          if (user && user.idUser) {
          try {
            const userDataResponse = await axios.get(`http://localhost:5000/api/userDataRoutes/${user.idUser}`);
            const userData = userDataResponse.data;
            setData(userData);
            if (userData.length > 0) {
              setClubId(userData[0].clubId);
            }
          } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
          }
        } else {
          console.error('No se pudo obtener el usuario actual.');
        }
      };

      fetchUserAndData();
    }, []);

    useEffect(() => {
        fetchPlayer();
        fetchStatsOfPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerId]);

    const fetchPlayer = () => {
        axios.get(`/api/getInfoPlayer/${playerId}`)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setPlayerInfo(response.data);
                    setPlayerPosition(response.data[0].position);
                    setPlayerTeam(response.data[0].team);
                } else {
                    console.error('No se encontró información para el jugador');
                }
            })
            .catch(error => {
                console.error('Error fetching player:', error);
            });
    };

    const fetchStatsOfPlayer = () => {
        axios.get(`/api/getGeneralStats/${playerId}`)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setPlayerStats(response.data);
                } else {
                    console.error('No se encontró estadisticas para el jugador');
                }
            })
            .catch(error => {
                console.error('Error fetching player:', error);
            });
    }

    const getPositionClass = (position) => {
        switch (position) {
            case 'DFC':
            case 'LD / CAD':
            case 'LI / CAI':
                return 'defender';
            case 'MCD':
            case 'MC':
            case 'MCO':
            case 'MI':
            case 'MD':
                return 'midfielder';
            case 'EI':
            case 'ED':
            case 'SD':
            case 'DC':
                return 'forward';
            default:
                return '';
        }
    };

    const lastPlayerStats = playerStats.length > 0 ? playerStats[playerStats.length - 1] : null;

    return (
        <div className="playerInfo">
            {playerInfo.length > 0 && (
            <div className='infoPlayerfirstContainer'>
                <img src={playerInfo[0].image ? `/${playerInfo[0].image}` : 'imagen_por_defecto.jpg'} alt={playerInfo[0].name} className='fotoPlayerInfoPlayer' />
                <h1>{playerInfo[0].name}</h1>
                <div className={`${getPositionClass(playerPosition)}`}>{playerPosition}</div>
            </div>
            )}
            {/* <h1>Características principales</h1>
            <div>{playerInfo[0].description}</div> */}
            <h1>Ultimos partidos:</h1>
            {playerStats.length > 0 && (
                <div className='iconMatchResumeLastFiveContainer'>
                    {playerStats.map((player, index) => (
                        <div className='iconMatchResumeLastFive' key={index}>
                            <div className='nimutesOfInfoPlayerPage'>{player.minutes}'</div>
                            {player.goals !== 0 && (
                                <div className='nimutesOfInfoPlayerPageGOALS'>
                                    {[...Array(player.goals)].map((_, goalIndex) => (
                                        <img key={goalIndex} src={goalIcon} alt={`Goal ${goalIndex + 1}`} />
                                    ))}
                                </div>
                            )}
                            {player.assist !== 0 && (
                                <div className='nimutesOfInfoPlayerPageASSIST'>
                                    {[...Array(player.assist)].map((_, assistIndex) => (
                                        <img key={assistIndex} src={assistIcon} alt={`Asisst ${assistIndex + 1}`} />
                                    ))}
                                </div>
                            )}
                            {player.yellor_cards !== 0 && (
                                <div className='nimutesOfInfoPlayerPageYELLOWCARDS'>
                                    {[...Array(player.yellor_cards)].map((_, yellowCardIndex) => (
                                        <img key={yellowCardIndex} src={yellowCardIcon} alt={`YellowCard ${yellowCardIndex + 1}`} />
                                    ))}
                                </div>
                            )}
                            <div>
                                {/* Enlace para ver las estadísticas del jugador en el partido específico */}
                                <Link to={`/MyTeamScreen/viewMatchOfPlayer/${player.player}/${player.id_match}`} className='nimutesOfInfoPlayerPageLINK'>
                                    Ver estadísticas
                                </Link>
                            </div>
                        </div> 
                    ))}
                </div>
            )}
            <h1>Estadísticas generales</h1>
            {lastPlayerStats && (
                <div>
                    <p>Goles totales: {lastPlayerStats.totalGoals}</p>
                    <p>Asistencias totales: {lastPlayerStats.totalAssists}</p>
                    <p>Acierto en el pase: {lastPlayerStats.passAccuracy}%</p>
                    <p>Acierto en el disparo: {lastPlayerStats.shotAccuracy}%</p>
                </div>
            )}
        </div>
    );
};

export default InfoPlayer;