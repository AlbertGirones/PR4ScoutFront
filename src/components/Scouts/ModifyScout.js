import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const ModifyScout = () => {
  const { scoutId } = useParams(); // Obtener el ID del jugador de los parámetros de la URL
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Función para obtener los datos del jugador por su ID
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getScoutModifyInfo/${scoutId}`);
        const playerData = response.data;
        setDescription(playerData.description);
      } catch (error) {
        console.error('Error al obtener los datos del jugador:', error);
      }
    };

    // Llamar a la función para obtener los datos del jugador al cargar el componente
    fetchPlayerData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // El efecto se ejecuta nuevamente cuando cambia el ID del jugador

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/updateScout/${scoutId}`, { description });
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

export default ModifyScout;
