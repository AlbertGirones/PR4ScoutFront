import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../../services/authService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddScout = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState('');
  const [player, setPlayer] = useState('');
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [clubIdCurrentUser, setClubId] = useState(null);

  useEffect(() => {
    axios.get('/api/teams')
      .then(response => {
        setTeams(response.data);
        fetchUserAndData();
      })
      .catch(error => console.error('Error al obtener los equipos:', error));
  }, []);

  useEffect(() => {
    if (team) {
      axios.get(`/api/getSquadTeam/${team}`)
        .then(response => {
          console.log('Jugadores obtenidos:', response.data); // Añadir log aquí
          setPlayers(response.data);
        })
        .catch(error => console.error('Error al obtener los jugadores del equipo:', error));
    } else {
      setPlayers([]);
    }
  }, [team]);

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

  const checkIfPlayerObserved = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/checkIfPlayerObserved/${player}`);
      return response.data.observed;
    } catch (error) {
      console.error('Error al verificar si el jugador está siendo observado:', error);
      return false; // Devolver false en caso de error
    }
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
  
    // Verificar si el jugador ya está en la lista de jugadores observados
    const isPlayerObserved = await checkIfPlayerObserved();
    if (isPlayerObserved) {
      toast.error('¡Este jugador ya está siendo observado!', {
        autoClose: 3000
      });
      return; // Evitar enviar la solicitud a la API
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/addScout', {
        team: clubIdCurrentUser,
        player: player,
        desc: description
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        toast.success('Jugador creado correctamente', {
          autoClose: 1500,
          onClose: () => resetForm()
        });
        console.log('Jugador creado correctamente:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          autoClose: 3000
        });
      } else {
        toast.error('Error al crear el jugador', {
          autoClose: 3000
        });
      }
      console.error('Error al crear el jugador:', error);
    }
  };

  const resetForm = () => {
    setDescription('');
    setTeam('');
  };

  return (
    <div className="flex-containerAddPLayer">
      <h1>Ojear jugador</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputContainerSelect">
          <select 
            value={team} 
            onChange={e => setTeam(e.target.value)}
            required
          >
            <option value="">Selecciona un equipo</option>
            {teams.map(t => (
              <option key={t.id_team} value={t.id_team}>{t.name}</option>
            ))}
          </select>
        </div>
        {team && players.length > 0 && (
          <div className="inputContainerSelect">
            <select
              value={player}
              onChange={e => setPlayer(e.target.value)}
              required
            >
              <option value="">Seleccione un jugador del equipo:</option>
              {players.map(player => (
                <option key={player.id_player} value={player.id_player}>{player.name}</option>
              ))}
            </select>
          </div>
        )}
        <div className="inputContainer">
          <input 
            type="text" className="input" placeholder='a'
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            required
          />
          <label>Descripción</label>
        </div>
        <button className="submitBtn" type="submit">Ojear Jugador</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddScout;
