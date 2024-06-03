import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddMatch = () => {
  const { teamId } = useParams();
  const [leagueId, setLeagueId] = useState(null);
  const [localTeams, setLocalTeams] = useState([]);
  const [visitorTeams, setVisitorTeams] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedJourney, setSelectedJourney] = useState('');
  const [selectedLocalTeam, setSelectedLocalTeam] = useState('');
  const [selectedVisitorTeam, setSelectedVisitorTeam] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/getLeagueOfClub/${teamId}`)
      .then(response => {
        const fetchedLeagueId = response.data;
        setLeagueId(fetchedLeagueId);
  
        if (fetchedLeagueId) {
          axios.get(`/api/getLocalTeams/${teamId}/${fetchedLeagueId}`)
            .then(localResponse => {
              console.log('Local teams fetched:', localResponse.data);
              setLocalTeams(localResponse.data);
            })
            .catch(error => {
              setError(error.message);
            });
  
          axios.get(`/api/getVisitorTeams/${teamId}/${fetchedLeagueId}`)
            .then(visitorResponse => {
              console.log('Visitor teams fetched:', visitorResponse.data);
              setVisitorTeams(visitorResponse.data);
            })
            .catch(error => {
              console.error('Error fetching visitor teams:', error);
              setError(error.message);
            });
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, [teamId]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleJourneyChange = (event) => {
    setSelectedJourney(event.target.value);
  };

  const handleLocalTeamChange = (event) => {
    setSelectedLocalTeam(event.target.value);
  };

  const handleVisitorTeamChange = (event) => {
    setSelectedVisitorTeam(event.target.value);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let localTeamToSend = null;
      let visitorTeamToSend = null;

      // Determinar qué equipo se jugará como local y cuál como visitante
      if (selectedOption === 'local') {
        localTeamToSend = teamId;
        visitorTeamToSend = selectedVisitorTeam;
      } else if (selectedOption === 'visitante') {
        localTeamToSend = selectedLocalTeam;
        visitorTeamToSend = teamId;
      }
  
      // Crear un objeto FormData y añadir los datos del formulario
      const formData = new FormData();
      formData.append('leagueId', leagueId);
      formData.append('localeTeam', localTeamToSend);
      formData.append('visitantTeam', visitorTeamToSend);
      formData.append('day', selectedDate);
      formData.append('time', selectedTime);
      formData.append('journey', selectedJourney);
      // Enviar la solicitud POST al servidor
      const response = await axios.post('http://localhost:5000/api/addMatch', formData);
      if (response.status === 200) {
        toast.success('Partido creado correctamente', {
          autoClose: 1500,
          onClose: () => navigate(`/MatchScreen/${teamId}`)
        });
        console.log('Partido creado correctamente:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          autoClose: 3000
        });
      } else {
        toast.error('Error al crear el partido', {
          autoClose: 3000
        });
      }
      console.error('Error al crear el partido:', error);
    }
  };
  

  if (error) {
    if (error.response && error.response.status === 404) {
      toast.error('Ya tienes todos los partidos programados', {
        autoClose: 3000
      });
    } else {
      toast.error('Error: ' + error.message, {
        autoClose: 3000
      });
    }
    return <h1 className='msgErrorAddMatch'>Tu equipo tiene todos los partidos programados</h1>;
  }

  return (
    <div className="flex-containerAddPLayer">
      <h1>Insertar partido</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="matchJourney">Seleccione la jornada del partido:</label>
          <input type="number" id="matchJourney" value={selectedJourney} onChange={handleJourneyChange} min="1" max="50" />
        </div>
        <div>
          <label htmlFor="matchDate">Seleccione la fecha del partido:</label>
          <input type="date" id="matchDate" value={selectedDate} onChange={handleDateChange} />
        </div>

        <div>
          <label htmlFor="matchTime">Seleccione la hora del partido:</label>
          <input type="time" id="matchTime" value={selectedTime} onChange={handleTimeChange} />
        </div>

        <div>
          <label htmlFor="matchType">Seleccione si jugará de local o visitante:</label>
          <select id="matchType" value={selectedOption} onChange={handleOptionChange}>
            <option value="">Seleccione una opción</option>
            <option value="local">Local</option>
            <option value="visitante">Visitante</option>
          </select>
        </div>

        {selectedOption === 'visitante' && (
          <div>
            <label htmlFor="localTeams">Seleccione el equipo rival:</label>
            <select id="localTeams" value={selectedLocalTeam} onChange={handleLocalTeamChange}>
              <option>Selecciona un equipo</option>
              {localTeams.map(team => (
                <option key={team.id} value={team.id}>{team.equipo_local}</option>
              ))}
            </select>
          </div>
        )}

        {selectedOption === 'local' && (
          <div>
            <label htmlFor="visitorTeams">Seleccione el equipo local:</label>
            <select id="visitorTeams" value={selectedVisitorTeam} onChange={handleVisitorTeamChange}>
              <option>Selecciona un equipo</option>
              {visitorTeams.map(team => (
                <option key={team.id} value={team.id}>{team.equipo_visitante}</option>
              ))}
            </select>
          </div>

        )}

        {selectedOption === 'visitante' && (
          <button type="submit" disabled={!selectedLocalTeam}>Guardar</button>
        )}

        {selectedOption === 'local' && (
          <button type="submit" disabled={!selectedVisitorTeam}>Guardar</button>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddMatch;

