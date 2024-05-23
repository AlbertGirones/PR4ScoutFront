import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddLeague = () => {
  const [leagueName, setLeagueName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/leagues', {
        league: leagueName
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success('Liga creada correctamente', {
        autoClose: 1500, // Duración del pop-up en milisegundos
        onClose: () => navigate('/add-team') // Redirigir al cerrar el pop-up
      });
      console.log('Liga creada correctamente:', response.data);
      setLeagueName(''); // Limpiar el campo de entrada después de la inserción
    } catch (error) {
      toast.error('Error al crear la liga', {
        autoClose: 3000 // Duración del pop-up en milisegundos
      });
      console.error('Error al crear la liga:', error);
    }
  };

  return (
    <div className="flex-containerAddLeague">
      <h1>Insertar liga</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input 
            type="text" className="input" placeholder='Nombre de la liga'
            value={leagueName} 
            onChange={e => setLeagueName(e.target.value)} 
            required
          />
          <label>Liga</label>
        </div>
        <button className="submitBtn" type="submit">Crear Liga</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddLeague;
