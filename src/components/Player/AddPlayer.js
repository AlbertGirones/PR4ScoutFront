import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPlayer = () => {
  const [federationNumber, setFederationNumber] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState('');
  const [teams, setTeams] = useState([]);
  const [position, setPosition] = useState('');
  const [image, setImage] = useState(null);

  const positions = [
    'POR', 'DFC', 'LD/CAD', 'LI/CAI', 'MCD', 'MC', 'MI', 'MD', 'MP', 'EI', 'ED', 'SD', 'DC'
  ];

  useEffect(() => {
    axios.get('/api/teams')
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => console.error('Error al obtener los equipos:', error));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('federationNumber', federationNumber);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('team', team);
      formData.append('position', position);
      formData.append('image', image);
      console.log(formData);
      const response = await axios.post('http://localhost:5000/api/players', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Jugador creado correctamente:', response.data);
    } catch (error) {
      console.error('Error al crear el jugador:', error);
    }
  };

  return (
    <div class="flex-containerAddPLayer">
      <h1>Insertar jugador</h1>
      <form onSubmit={handleSubmit}>
        <div class="inputContainer">
          <input 
            type="text" class="input" placeholder='a'
            value={federationNumber} 
            onChange={e => setFederationNumber(e.target.value)} 
            required
          />
          <label>Número de Federación</label>
        </div>
        <div class="inputContainer">
          <input 
            type="text" class="input" placeholder='a'
            value={name} 
            onChange={e => setName(e.target.value)} 
            required
          />
          <label>Nombre</label>
        </div>
        <div class="inputContainer">
          <input 
            type="text" class="input" placeholder='a'
            value={name} 
            onChange={e => setName(e.target.value)} 
            required
          />
          <label>Nombre</label>
        </div>
        <div>
          <label>
            Descripción:
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              required
            />
          </label>
        </div>
        <div>
          <label>
            Equipo:
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
          </label>
        </div>
        <div>
          <label>
            Posicion:
            <select
              value={position}
              onChange={e => setPosition(e.target.value)}
              required
            >
              <option value="">Selecciona una posicion</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Imagen:
            <input 
              type="file" 
              accept="image/*" 
              onChange={e => setImage(e.target.files[0])} 
              required
            />
          </label>
        </div>
        <button class="submitBtn" type="submit">Crear Jugador</button>
      </form>
    </div>
    
  );
};

export default AddPlayer;
