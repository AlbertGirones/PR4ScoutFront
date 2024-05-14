// import Header from './Header';
// import Body from './Body';
// import './AddTeam.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTeam = () => {
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

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
      // Aquí puedes manejar la lógica para subir la imagen al backend
      const formData = new FormData();
      formData.append('name', nombreEquipo);
      formData.append('category', categoria);
      formData.append('image', /* Aquí va la imagen */);

      await axios.post('/api/teams', formData);
      alert('Equipo creado correctamente');
    } catch (error) {
      console.error('Error al crear el equipo:', error);
      alert('Error al crear el equipo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del Equipo:
        <input type="text" value={nombreEquipo} onChange={e => setNombreEquipo(e.target.value)} />
      </label>
      <label>
        Categoría:
        <select value={categoria} onChange={e => setCategoria(e.target.value)}>
          <option value="">Selecciona una categoría</option>
          {categorias.map(c => (
            <option key={c.id_league} value={c.name}>{c.name}</option>
          ))}
        </select>
      </label>
      <label>
        Foto:
        <input type="file" accept="image/*" />
      </label>
      <button type="submit">Crear Equipo</button>
    </form>
  );
};

export default AddTeam;