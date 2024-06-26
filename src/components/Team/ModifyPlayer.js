import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const ModifyPlayer = () => {
  const { playerId } = useParams(); // Obtener el ID del jugador de los parámetros de la URL
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('');

  const positions = [
    'POR', 'DFC', 'LD/CAD', 'LI/CAI', 'MCD', 'MC', 'MI', 'MD', 'MP', 'EI', 'ED', 'SD', 'DC'
  ];

  useEffect(() => {
    // Función para obtener los datos del jugador por su ID
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getPlayerInfo/${playerId}`);
        const playerData = response.data;
        setDescription(playerData.description);
        setPosition(playerData.position);
      } catch (error) {
        console.error('Error al obtener los datos del jugador:', error);
      }
    };

    // Llamar a la función para obtener los datos del jugador al cargar el componente
    fetchPlayerData();
  }, [playerId]); // El efecto se ejecuta nuevamente cuando cambia el ID del jugador

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/updatePlayer/${playerId}`, { description, position });
      toast.success('Jugador modificado correctamente', {
        autoClose: 1500
      });
    } catch (error) {
      toast.error('Error al modificar el jugador', {
        autoClose: 3000,
      });
      console.error('Error al modificar el jugador:', error);
    }
  };

  return (
    <div className="flex-containerAddLeague">
      <h1>Modificar jugador</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputContainerSelect">
          <select
            value={position}
            onChange={e => setPosition(e.target.value)}
            required
          >
            {positions.map(pos => (
              <option key={pos} value={pos} selected={pos === position}>{pos}</option>
            ))}
          </select>
        </div>
        <div className="inputContainer">
          <input 
            type="text" className="input" placeholder='a'
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            required
          />
          <label>Descripción</label>
        </div>
        <button className="submitBtn" type="submit">Modificar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ModifyPlayer;
