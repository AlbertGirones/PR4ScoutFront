import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPlayer = () => {
  const [federationNumber, setFederationNumber] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState('');
  const [teams, setTeams] = useState([]);
  const [position, setPosition] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

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
      const response = await axios.post('http://localhost:5000/api/players', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
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
    setFederationNumber('');
    setName('');
    setDescription('');
    setTeam('');
    setPosition('');
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex-containerAddPLayer">
      <h1>Insertar jugador</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input 
            type="text" className="input" placeholder='a'
            value={federationNumber} 
            onChange={e => setFederationNumber(e.target.value)} 
            required
          />
          <label>Número de Federación</label>
        </div>
        <div className="inputContainer">
          <input 
            type="text" className="input" placeholder='a'
            value={name} 
            onChange={e => setName(e.target.value)} 
            required
          />
          <label>Nombre</label>
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
        <div className="inputContainerSelect">
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
        </div>
        <div className="inputContainerSelect">
          <input 
            type="file" 
            accept="image/*" 
            onChange={e => setImage(e.target.files[0])}
            ref={fileInputRef}
            required
          />
        </div>
        <button className="submitBtn" type="submit">Crear Jugador</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddPlayer;
