import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const ModifyMatch = () => {
  const { teamId, matchId } = useParams();
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/getMatch/${matchId}`)
      .then(response => {
        const matchData = response.data;
        setSelectedDate(matchData.day);
        setSelectedTime(matchData.hour);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [teamId, matchId]);
  

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedMatch = {
        day: selectedDate,
        time: selectedTime,
      };

      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(`http://localhost:5000/api/updateMatch/${matchId}`, updatedMatch);
      toast.success('Partido modificado correctamente', {
        autoClose: 1500
      });
    } catch (error) {
      toast.error('Error al modificar el jugador', {
        autoClose: 3000,
      });
      console.error('Error al modificar el jugador:', error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-containerAddPLayer">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="matchDate">Seleccione la fecha del partido:</label>
          <input type="date" id="matchDate" value={selectedDate} onChange={handleDateChange} />
        </div>

        <div>
          <label htmlFor="matchTime">Seleccione la hora del partido:</label>
          <input type="time" id="matchTime" value={selectedTime} onChange={handleTimeChange} />
        </div>

        <button type="submit">Guardar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ModifyMatch;