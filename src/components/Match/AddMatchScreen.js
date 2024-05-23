import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const AddMatchScreen = () => {
  const { teamId } = useParams();
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/getMatchesOfClub/${teamId}`)
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
        setError(error.message);
      });
  }, [teamId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <>
    <div className='msgMatchFrame'>
      <h1>Calendari de partits</h1>
      <Link to={`/addMatchScreen/AddMatch/${teamId}`}>
        <button className='buttonAdd'>Afegir partits</button>
      </Link>
    </div>
    <table className='tableMatches'>
      <thead className='headTableMatches'>
        <tr>
          <th>Journey</th>
          <th colSpan={3}>Local Team</th>
          <th colSpan={2}>Visitor Team</th>
          <th>Day</th>
          <th>Hour</th>
          <th>League</th>
          <th>Resultat</th>
        </tr>
      </thead>
      <tbody>
        {matches.map(match => (
          <tr key={match.id_match}>
            <td>{match.journey}</td>
            <td className='td-with-image'><img src={match.local_team_image} alt="Escudo local" /></td>
            <td>{match.local_team}</td>
            <td>-</td>
            <td className='td-with-image'><img src={match.visitor_team_image} alt="Escudo visitante" /></td>
            <td>{match.visitor_team}</td>
            <td>{match.day}</td>
            <td>{match.hour}</td>
            <td>{match.league}</td>
            <td>{match.result != null ? match.result : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table></>
  );
};

export default AddMatchScreen;
