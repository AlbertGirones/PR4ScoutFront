import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';
import imgGoles from '../../../img/football-ball-svgrepo-com.svg';
import imgAssists from '../../../img/football-shoe-svgrepo-com.svg';
import imgYellowCard from '../../../img/zzzzz.svg';

const Summary = () => {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState([]);
    const { playerId, matchId, minPlayed } = useParams();
    const { state } = useLocation();
    const [playerPosition, setPlayerPosition] = useState(null);
    const [idTeam, setPlayerTeam] = useState(null);
    const [playerInfo, setPlayerInfo] = useState([]);
    const [playerRating, setPlayerRating] = useState(null);
    const [inserted, setInserted] = useState(false);
    const [clubIdCurrentUser, setClubId] = useState(null);
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

    const stats = state && state.stats ? state.stats : null;

    // Calcular estadísticas derivadas
    const totalShots = stats.trueShots + stats.falseShots;
    const passAttempts = stats.successfulPasses + stats.wrongPasses;
    const defensiveAttempts = stats.defensiveOneVsOne + stats.steals;
    const offensiveAttempts = stats.offensiveOneVsOne + stats.falseShots;

    const passAccuracy = passAttempts ? (stats.successfulPasses / passAttempts) * 100 : 0;
    const defensiveSuccessRate = defensiveAttempts ? (stats.defensiveOneVsOne / defensiveAttempts) * 100 : 0;
    const offensiveSuccessRate = offensiveAttempts ? (stats.offensiveOneVsOne / offensiveAttempts) * 100 : 0;

    // VALORACIONES POR POSICION

    const weights = {
        defender: {
            defensive: 0.5,
            passing: 0.333,
            offensive: 0.167,
        },
        midfielder: {
            defensive: 0.333,
            passing: 0.333,
            offensive: 0.333,
        },
        forward: {
            defensive: 0.167,
            passing: 0.333,
            offensive: 0.5,
        }
    };

    // Definir los pesos en función de la posición
    let positionWeights;

    if (playerPosition) {
        if (playerPosition.startsWith('D')) {
            positionWeights = weights.defender;
        } else if (playerPosition.startsWith('M')) {
            positionWeights = weights.midfielder;
        } else if (playerPosition.startsWith('E') || playerPosition.startsWith('S') || playerPosition.startsWith('D')) {
            positionWeights = weights.forward;
        } else {
            positionWeights = weights.midfielder;
        }
    } else {
        positionWeights = weights.midfielder;
    }

    useEffect(() => {
        // Calcular el rating total en función de la posición
        const rawRating = (
            (stats.goals * 1.5) +
            (stats.assists * 1.2) +
            ((defensiveSuccessRate * positionWeights.defensive) +
            (passAccuracy * positionWeights.passing) +
            (offensiveSuccessRate * positionWeights.offensive))
        );

        // Normalizar el rating a una escala de 0 a 10
        const normalizedRating = Math.min((rawRating / 10), 10).toFixed(2);
        setPlayerRating(normalizedRating);
    }, [stats, positionWeights, passAccuracy, defensiveSuccessRate, offensiveSuccessRate]);

    const insertStats = () => {
        // Verificar si ya existen estadísticas para el jugador en el partido actual
        // Si no existen, insertamos las estadísticas
        axios.post('http://localhost:5000/api/insertPlayerStats', {
            id_match: matchId,
            id_team: idTeam,
            player: playerId,
            minutes: minPlayed,
            yellow_cards: stats.yellowCards,
            goals: stats.goals,
            assist: stats.assists,
            shots: totalShots,
            goodShots: stats.trueShots,
            pass: passAttempts,
            goodPass: stats.successfulPasses,
            offensiveonevsone: stats.offensiveOneVsOne,
            defensiveonevsone: stats.defensiveOneVsOne,
            interceptions: stats.interceptions,
            steals: stats.steals,
            Rating: playerRating
        })
        .then(response => {
            console.log('Estadísticas insertadas correctamente');
            setInserted(true);
            navigate(`/MatchScreen/${clubIdCurrentUser}`);
        })
        .catch(error => {
            console.error('Error al insertar estadísticas:', error);
        });
    };

    return (
        <div className="summary">
            {playerInfo.length > 0 && (
            <div className='infoPlayerSummary'>
                <img src={playerInfo[0].image ? `/${playerInfo[0].image}` : 'imagen_por_defecto.jpg'} alt={playerInfo[0].name} className='fotoPlayerSummary' />
                <h1>{playerInfo[0].name}</h1>
                <h1 className='Rating'>Rating: {playerRating}</h1>
                <div className={`${getPositionClass(playerPosition)}`}>{playerPosition}</div>
            </div>
            )}
            {stats ? (
                <>

                    <div className='essentialStats'>
                        <div className='childEssentialStats'>
                            <p>X</p>
                            <p className='statEssentials'>{stats.goals}</p>
                            <img src={imgGoles} alt="Goles" className='football'></img>
                        </div>
                        <div className='childEssentialStats'>
                            <p>X</p>
                            <p className='statEssentials'>{stats.assists}</p>
                            <img src={imgAssists} alt="Assists" className='football'></img>
                        </div>
                        <div className='childEssentialStats'>
                            <p>X</p>
                            <p className='statEssentials'>{stats.yellowCards}</p>
                            <img src={imgYellowCard} alt="Assists" className='yellowCard'></img>
                        </div>
                    </div>
                    <div>
                        <h2>Resumen del Jugador</h2>
                        <p>Golpeos totales: {totalShots} - {stats.trueShots}/{totalShots} en porteria</p>
                        <p>Pases totales: {passAttempts} - {stats.successfulPasses}/{passAttempts} - Precisión de pase: {passAccuracy.toFixed(2)}%</p>
                        <h4 className='SUBTITULO'>Trabajo defensivo</h4>
                        <p>Recuperaciones de balón: {stats.interceptions}</p>
                        <p>Robos: {stats.steals}</p>
                        <p>1vs1 Defensivos: Exitoso en {stats.defensiveOneVsOne} 1vs1</p>
                        <h4 className='SUBTITULO'>Minutos jugados: {minPlayed}</h4>
                        <h3>Porcentajes individuales:</h3>
                        <p>Éxito en 1vs1 defensivos: {defensiveSuccessRate.toFixed(2)}%</p>
                        <p>Éxito en 1vs1 ofensivos: {offensiveSuccessRate.toFixed(2)}%</p>
                    </div>
                    <button onClick={insertStats} disabled={inserted} className='buttonAddStatsResume'>
                        {inserted ? 'Estadísticas insertadas' : 'Insertar estadísticas'}
                    </button>
                </>
            ) : (
                <p>No hay estadísticas para mostrar.</p>
            )}
        </div>
    );
};

export default Summary;