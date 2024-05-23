import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTeam = () => {
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [foto, setFoto] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Obtener las categorías de la API
    axios.get('/api/leagues')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => console.error('Error al obtener las categorías:', error));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', nombreEquipo);
      formData.append('league_id', categoria);
      formData.append('image', foto);
  
      const response = await axios.post('http://localhost:5000/api/teams', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        toast.success('Equipo creado correctamente', {
          autoClose: 1500,
          onClose: () => resetForm()
        });
        console.log('Equipo creado correctamente:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          autoClose: 3000
        });
      } else {
        toast.error('Error al crear el equipo', {
          autoClose: 3000
        });
      }
      console.error('Error al crear el equipo:', error);
    }
  };

  const resetForm = () => {
    setNombreEquipo('');
    setCategoria('');
    setFoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex-containerAddTeam">
      <h1>Insertar equipo</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input 
            type="text" className="input" placeholder='Nombre del equipo'
            value={nombreEquipo} 
            onChange={e => setNombreEquipo(e.target.value)} 
            required
          />
          <label>Nombre del Equipo:</label>
        </div>
        <div className="inputContainerSelect">
          <select 
            value={categoria} 
            onChange={e => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map(c => (
              <option key={c.id_league} value={c.id_league}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="inputContainerSelect">
          <input 
            type="file" 
            accept="image/*" 
            onChange={e => setFoto(e.target.files[0])} 
            ref={fileInputRef}
            required
          />
        </div>
        <button className="submitBtn" type="submit">Crear Equipo</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddTeam;
