import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import GoodroboIcon from '../../../img/duelos.svg';
import BadroboIcon from '../../../img/Baduelos.svg';
import RecuIcon from '../../../img/intercepciones.svg';
import BadrecuperationIcon from '../../../img/basRecu.svg';
import Goo1v from '../../../img/good1vs1.svg';
import Bad1vs1 from '../../../img/bad1vs1.svg';
import GoodShot from '../../../img/GOODSHOT.svg';
import RmvGoodShot from '../../../img/RMVGOODSHOT.svg';
import GodPass from '../../../img/GOODPASS.svg';
import RmvGodPass from '../../../img/RMVGOODPASS.svg';
import BadPass from '../../../img/BADPASS.svg';
import RmvBadPass from '../../../img/badpasres.svg';
import BadShot from '../../../img/BADSHOT.svg';
import RmvBadShot from '../../../img/resbadshot.svg';
import goalIcon from '../../../img/football-ball-svgrepo-com.svg';
import RmvgoalIcon from '../../../img/RMVGOAL.svg';
import assistsIcon from '../../../img/football-shoe-svgrepo-com.svg';
import RmvassistsIcon from '../../../img/RMVASSIS.svg';
import yellowCardIcon from '../../../img/zzzzz.svg';

const SetStats = () => {

    const { playerId, matchId } = useParams();
    const navigate = useNavigate();
    const [playerPosition, setPlayerPosition] = useState(null);
    const [playerInfo, setPlayerInfo] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [minutesPlayed, setMinutesPlayed] = useState(0);
    const [yellowCardsCount, setYellowCardsCount] = useState(0);

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
                } else {
                    console.error('No se encontró información para el jugador');
                }
            })
            .catch(error => {
                console.error('Error fetching player:', error);
            });
    };
    

    const initialStats = {
        goals: 0,
        assists: 0,
        trueShots: 0,
        falseShots: 0,
        successfulPasses: 0,
        wrongPasses: 0,
        interceptions: 0,
        steals: 0,
        defensiveOneVsOne: 0,
        offensiveOneVsOne: 0,
        yellowCards: 0,
    };

    const [stats, setStats] = useState(initialStats);

    const incrementStat = (stat) => {
        if (stat === 'yellowCards') {
            setYellowCardsCount(yellowCardsCount + 1);
            setStats((prevStats) => ({
                ...prevStats,
                [stat]: prevStats[stat] + 1,
            }));
            if (yellowCardsCount + 1 === 2) {
                setIsModalOpen(true);
            }
        } else {
            setStats((prevStats) => ({
                ...prevStats,
                [stat]: prevStats[stat] + 1,
            }));
        }
    };

    const decrementStat = (stat) => {
        if (stats[stat] > 0) {
            setStats((prevStats) => ({
                ...prevStats,
                [stat]: prevStats[stat] - 1,
            }));
        }
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

    // Modal

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate(`/AnalyzePlayer/Summary/${matchId}/${playerId}/${minutesPlayed}`, { state: { stats } });
    };

    const handleMinutesChange = (event) => {
        setMinutesPlayed(event.target.value);
    };

    const handleSaveMinutes = () => {
        setStats((prevStats) => ({
            ...prevStats,
            minutes: minutesPlayed,
        }));
        console.log('Minutos jugados:', minutesPlayed);
        handleCloseModal();
    };

    return (
        <div className='Content'>
            {playerInfo.length > 0 && (
            <div className='infoPlayer'>
                <img src={playerInfo[0].image ? `/${playerInfo[0].image}` : 'imagen_por_defecto.jpg'} alt={playerInfo[0].name} className='fotoPlayer' />
                <h1>{playerInfo[0].name}</h1>
                <div className={`${getPositionClass(playerPosition)}`}>{playerPosition}</div>
            </div>
            )}
            <h2>Insertar Estadísticas</h2>
            <div className='fullStats'>
                <h3 className='tituloDefensivos'>Acciones clave</h3>
                <div className='defensiveStats'>
                    <div>
                        <h4>Goles</h4>
                        <div className='defensiveItem'>
                            <button onClick={() => incrementStat('goals')}><img src={goalIcon} alt="AddGoal" /></button>
                            <button onClick={() => decrementStat('goals')}><img src={RmvgoalIcon} alt="RmvGoal" /></button>
                        </div>
                    </div>
                    <div>
                        <h4>Asistencias</h4>
                        <div className='defensiveItem'>
                            <button onClick={() => incrementStat('assists')}><img src={assistsIcon} alt="AddAssists" /></button>
                            <button onClick={() => decrementStat('assists')}><img src={RmvassistsIcon} alt="RmvAssist" /></button>
                        </div>
                    </div>
                    <div>
                        <h4>Targetas</h4>
                        <div className='defensiveItem'>
                            <button onClick={() => incrementStat('yellowCards')} className='buttonTargetaAmarilla'><img src={yellowCardIcon} alt="AddYellowCard" className="yellowCardAddStats"/></button>
                        </div>
                    </div>
                </div>

                <h3 className='tituloDefensivos'>Acciones defensivas</h3>
                <div className='defensiveStats'>
                    <div>
                        <h4>Duelos</h4>
                        <div className='defensiveItem'>
                            <button onClick={() => incrementStat('steals')}><img src={GoodroboIcon} alt="AddRobo" /></button>
                            <button onClick={() => decrementStat('steals')}><img src={BadroboIcon} alt="RmvRobo" /></button>
                        </div>
                    </div>
                    <div>
                        <h4>Intercepciones</h4>
                        <div className='defensiveItem'>
                            <button onClick={() => incrementStat('interceptions')}><img src={RecuIcon} alt="AddRecuperation" /></button>
                            <button onClick={() => decrementStat('interceptions')}><img src={BadrecuperationIcon} alt="AddRecuperation" /></button>
                        </div>
                    </div>
                    {(getPositionClass(playerPosition) === 'defender' || getPositionClass(playerPosition) === 'midfielder') && (
                        <div>
                            <h4>1VS1 Defensivos</h4>
                            <div className='defensiveItem'>
                            <button onClick={() => incrementStat('defensiveOneVsOne')}><img src={Goo1v} alt="Add1VS1" /></button>
                            <button onClick={() => decrementStat('defensiveOneVsOne')}><img src={Bad1vs1} alt="Rmv1VS1" /></button>
                            </div>
                        </div>
                    )}
                </div>
                <h3 className='tituloDefensivos'>Acciones ofensivas</h3>
                <div className='defensiveStats'>
                    <div>
                        <h4>Golpeo (A PUERTA)</h4>
                        <div className='defensiveItem'>
                            <button onClick={() => incrementStat('trueShots')}><img src={GoodShot} alt="AddGoodShot" className='fotoIconAccions'/></button>
                            <button onClick={() => decrementStat('trueShots')}><img src={RmvGoodShot} alt="RmvGoodShot"className='fotoIconAccions'/></button>
                        </div>
                    </div>
                    <div>
                    <h4>Golpeo</h4>
                        <div className='defensiveItem'>
                            <button onClick={() => incrementStat('falseShots')}><img src={BadShot} alt="AddBadShot" className='fotoIconAccions'/></button>
                            <button onClick={() => decrementStat('falseShots')}><img src={RmvBadShot} alt="RmvBadShot" className='fotoIconAccions'/></button>
                        </div>
                    </div>
                    {(getPositionClass(playerPosition) === 'forward' || getPositionClass(playerPosition) === 'midfielder') && (
                        <div className='EspecialitoDIV'>
                            <h4>1VS1 Ofensivos</h4>
                            <div className='offensiveItem'>
                                <button onClick={() => incrementStat('offensiveOneVsOne')}><img src={Goo1v} alt="Add1VS1" className='fotoIconAccions'/></button>
                                <button onClick={() => decrementStat('offensiveOneVsOne')}><img src={Bad1vs1} alt="Rmv1VS1" className='fotoIconAccions'/></button>
                            </div>
                        </div>
                    )}
                </div>
                <div className='defensiveStats'>
                    <div className='EspecialitoDIV'>
                        <h4>Pase exitoso</h4>
                        <div className='offensiveItem'>
                            <button onClick={() => incrementStat('successfulPasses')}><img src={GodPass} alt="AddGoodPass" className='fotoIconAccions'/></button>
                            <button onClick={() => decrementStat('successfulPasses')}><img src={RmvGodPass} alt="RmvGoodPass" className='fotoIconAccions'/></button>
                        </div>
                    </div>
                    <div className='EspecialitoDIV'>
                        <h4>Pase fallado</h4>
                        <div className='offensiveItem'>
                            <button onClick={() => incrementStat('wrongPasses')}><img src={BadPass} alt="AddWrongPass" className='fotoIconAccions'/></button>
                            <button onClick={() => decrementStat('wrongPasses')}><img src={RmvBadPass} alt="RmvWrongPass" className='fotoIconAccions'/></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botón para abrir el modal */}
            <button onClick={handleOpenModal} className='buttonOpenModelSetStats'>Introducir Minutos Jugados</button>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                <h2>Introduce los minutos jugados</h2>
                <input
                    type='number'
                    value={minutesPlayed}
                    onChange={handleMinutesChange}
                    placeholder='Minutos jugados'
                />
                <button onClick={handleSaveMinutes}>Guardar</button>
            </Modal>
        </div>
    );
};

export default SetStats;
