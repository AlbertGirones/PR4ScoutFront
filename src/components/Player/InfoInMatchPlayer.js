/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import imgGoles from '../../img/football-ball-svgrepo-com.svg';
import imgAssists from '../../img/football-shoe-svgrepo-com.svg';
import imgYellowCard from '../../img/zzzzz.svg';
import './InfoInMatch.css';

const InfoInMatchPlayer = () => {
    const [data, setData] = useState([]);
    const { playerId, matchId } = useParams();
    const { state } = useLocation();
    const [playerPosition, setPlayerPosition] = useState(null);
    const [idTeam, setPlayerTeam] = useState(null);
    const [playerInfo, setPlayerInfo] = useState([]);
    const [clubIdCurrentUser, setClubId] = useState(null);
    const [playerStats, setPlayerStats] = useState([]);
    const navigate = useNavigate();

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
        axios.get(`/api/getGeneralStatsInMatch/${playerId}/${matchId}`)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setPlayerStats(response.data);
                    console.log(response.data);
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

    return (
        <div className="InMatchInfo">
            {playerInfo.length > 0 && (
            <div className='infoPlayerInfoInMatch'>
                <img src={playerInfo[0].image ? `/${playerInfo[0].image}` : 'imagen_por_defecto.jpg'} alt={playerInfo[0].name} className='fotoPlayerSummary' />
                <h1>{playerInfo[0].name}</h1>
                <h1>Rating: {playerStats[0]?.Rating}</h1>
                <div className={`${getPositionClass(playerPosition)}`}>{playerPosition}</div>
            </div>
            )}
            <div className='essentialStatsInInfoMatch'>
                {playerStats.length > 0 && (
                    <>
                        {playerStats[0].goals !== 0 && (
                            <div className='childEssentialStatsInInfoMatch'>
                                <p>X</p>
                                <p className='statEssentials'>{playerStats[0].goals}</p>
                                <img src={imgGoles} alt="Goles" className='footballInMatchOL'></img>
                            </div>
                        )}
                        {playerStats[0].assist !== 0 && (
                            <div className='childEssentialStatsInInfoMatch'>
                                <p>X</p>
                                <p className='statEssentials'>{playerStats[0].assist}</p>
                                <img src={imgAssists} alt="Assists" className='footballInMatchOL'></img>
                            </div>
                        )}
                        {playerStats[0].yellow_cards !== 0 && (
                            <div className='childEssentialStatsInInfoMatch'>
                                <p>X</p>
                                <p className='statEssentials'>{playerStats[0].yellow_cards}</p>
                                <img src={imgYellowCard} alt="Assists" className='yellowCardInMatchOL'></img>
                            </div>
                        )}
                    </>
                )}
            </div>
            
            {playerStats ? (
                <>
                <div>
                    <h2>Resumen del Jugador</h2>
                    <p>Golpeos totales: {playerStats[0]?.totalShots} - {playerStats[0]?.goodShots}/{playerStats[0]?.shots} en porteria</p>
                    <p>Pases totales: {playerStats[0]?.totalPass} - {playerStats[0]?.goodPass}/{playerStats[0]?.pass} - Precisión de pase: {playerStats[0]?.passAccuracy}%</p>
                    <h4 className='SUBTITULO'>Trabajo defensivo</h4>
                    <p>Recuperaciones de balón: {playerStats[0]?.interceptions}</p>
                    <p>Robos: {playerStats[0]?.steals}</p>
                    <p>1vs1 Defensivos: Exitoso en {playerStats[0]?.defensiveOneVsOne} 1vs1</p>
                    <h4 className='SUBTITULO'>Minutos jugados: {playerStats[0]?.minutes}</h4>
                </div>

                </>
            ) : (
                <p>No hay estadísticas para mostrar.</p>
            )}
        </div>
    );
};

export default InfoInMatchPlayer;