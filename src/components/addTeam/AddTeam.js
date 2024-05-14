import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTeam = () => {
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [foto, setFoto] = useState(null);

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
    console.log('Nombre del equipo:', nombreEquipo);
    console.log('ID de la categoría seleccionada:', categoria);
    console.log('Imagen:', foto);

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
      
      console.log('Equipo creado correctamente:', response.data);
      // Aquí podrías mostrar algún mensaje de éxito al usuario
    } catch (error) {
      console.error('Error al crear el equipo:', error);
      // Aquí podrías mostrar algún mensaje de error al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del Equipo:
        <input 
          type="text" 
          value={nombreEquipo} 
          onChange={e => setNombreEquipo(e.target.value)} 
          required
        />
      </label>
      <br />
      <label>
        Categoría:
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
      </label>
      <br />
      <label>
        Foto:
        <input 
          type="file" 
          accept="image/*" 
          onChange={e => setFoto(e.target.files[0])} 
        />
      </label>
      <br />
      <button type="submit">Crear Equipo</button>
    </form>
  );
};

export default AddTeam;
