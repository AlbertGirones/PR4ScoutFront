import React, { useEffect, useState } from 'react';
import axios from 'axios';
import editarLogo from "../../img/pencil-svgrepo-com.svg";
import eliminarLogo from "../../img/trash-bin-minimalistic-2-svgrepo-com.svg";
import { useParams, Link } from 'react-router-dom';
import { parse, isToday, isAfter } from 'date-fns';

const AddMatchScreen = () => {
  const { teamId } = useParams();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  const fetchMatches = () => {
    axios.get(`/api/getMatchesOfClub/${teamId}`)
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
      });
  };

  const handleDeleteMatch = (matchId) => {
    axios.delete(`/api/deleteMatch/${matchId}`)
      .then(response => {
        console.log('Partido eliminado con éxito');
        fetchMatches();
      })
      .catch(error => {
        console.error('Error al eliminar el partido:', error);
      });
  };

  return (
    <>
      <div className='msgMatchFrame'>
        <h1>Calendario de partidos</h1>
        <Link to={`/MatchScreen/AddMatch/${teamId}`}>
          <button className='buttonAdd'>Agregar partidos</button>
        </Link>
      </div>
      <table className='tableMatches'>
        <thead className='headTableMatches'>
          <tr>
            <th>Jornada</th>
            <th colSpan={3}>Local</th>
            <th colSpan={2}>Visitante</th>
            <th>Día</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {matches.map((match, index) => (
          <tr key={match.id_match} className={index % 2 === 0 ? 'par' : 'impar'}>
            <td>{match.journey}</td>
            <td className='td-with-image'><img src={match.local_team_image} alt="Escudo local" /></td>
            <td>{match.local_team}</td>
            <td>-</td>
            <td className='td-with-image'><img src={match.visitor_team_image} alt="Escudo visitante" /></td>
            <td>{match.visitor_team}</td>
            <td>{match.day}</td>
            <td>{match.hour}</td>
            <td>
              {match.result != null ? (
                <div>{match.result}</div>
              ) : (
                isToday(parse(match.day, 'dd/MM/yyyy', new Date())) ? (
                  <Link to={`/AnalyzePlayer/SetPlayer/${match.id_match}`} className='applyStats'>Analizar</Link>
                ) : (
                  isAfter(parse(match.day, 'dd/MM/yyyy', new Date()), new Date()) ? (
                    <div className='accionMenu'>
                      <Link to={`/MatchScreen/ModifyMatch/${teamId}/${match.id_match}`} className="modify"><img className="logoEditar" src={editarLogo} alt="Editar partido" /></Link>
                      <Link to="#" className="delete" onClick={() => handleDeleteMatch(match.id_match)}><img className="logoDelete" src={eliminarLogo} alt="Eliminar partido" /></Link>
                    </div>
                  ) : (
                    <div>NO RESULTADO</div>
                  )
                )
              )}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default AddMatchScreen;
