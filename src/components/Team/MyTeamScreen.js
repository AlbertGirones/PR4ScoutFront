import React, { useEffect, useState } from 'react';
import axios from 'axios';
import editarLogo from "../../img/pencil-svgrepo-com.svg";
import eliminarLogo from "../../img/trash-bin-minimalistic-2-svgrepo-com.svg";
import { useParams, Link } from 'react-router-dom';
import './MyTeamScreen.css';

// Define la URL base de tu servidor
const BASE_URL = 'http://localhost:5000';

const MyTeamScreen = () => {
  const { teamId } = useParams();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  const fetchPlayers = () => {
    axios.get(`/api/getSquadTeam/${teamId}`)
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error('Error fetching players:', error);
      });
  };

  const handleDeletePlayer = (playerId) => {
    axios.delete(`/api/deletePlayer/${playerId}`)
      .then(response => {
        console.log('Jugador eliminado con éxito');
        fetchPlayers();
      })
      .catch(error => {
        console.error('Error al eliminar el jugador:', error);
      });
  }

  const getPositionClass = (position) => {
      switch (position) {
          case 'DFC':
          case 'LD / CAD':
          case 'LI / CAI':
              return 'defenderMyTeamPage';
          case 'MCD':
          case 'MC':
          case 'MCO':
          case 'MI':
          case 'MD':
              return 'midfielderMyTeamPage';
          case 'EI':
          case 'ED':
          case 'SD':
          case 'DC':
              return 'forwardMyTeamPage';
          default:
              return '';
      }
  };

  return (
    <>
      <div className='msgMatchFrame'>
        <h1>Mi plantilla</h1>
        <Link to={`/MyTeamScreen/AddPlayer/${teamId}`}>
          <button className='buttonAdd'>Agregar jugador</button>
        </Link>
      </div>
      <table className='tableMatches'>
        <thead className='headTableMatches'>
          <tr>
            <th>Posición</th>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th colSpan={2}>Acciones</th>
          </tr>
        </thead>
        <tbody>
            {players.map((player, index) => (
            <tr key={player.id_player} className={index % 2 === 0 ? 'par' : 'impar'}>
                <td className={`${getPositionClass(player.position)}`}>{player.position}</td>
                {/* Concatena la URL base con la ruta de la imagen */}
                <td className='td-with-image-Player'><img src={`${BASE_URL}/${player.image}`} alt="" /></td>
                <td><Link className="LinkMyTeamScreen" to={`/viewGeneralPlayer/${teamId}/${player.id_player}`}>{player.name}</Link></td>
                <td>{player.description}</td>
                <td><Link to={`/MyTeamScreen/ModifyPlayer/${player.id_player}`} className="modify"><img className="logoEditar" src={editarLogo} alt="Editar partido" /></Link></td>
                <td><Link to="#" className="delete" onClick={() => handleDeletePlayer(player.id_player)}><img className="logoEditar" src={eliminarLogo} alt="Eliminar jugador" /></Link></td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default MyTeamScreen;
