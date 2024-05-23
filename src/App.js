import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddPlayer from './components/Player/AddPlayerPage';
import AddTeam from './components/Team/AddTeamPage';
import AddLeague from './components/League/AddLeaguePage';
import AddMatchScreen from './components/Match/AddMatchScreenPage';
import AddMatch from './components/Match/AddMatchPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';
import ProtectedRoute from './components/ProtectedRoute';
// import Matches from './components/Matches/MatchesPage';


function App() {
  return (

    <Router>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/add-team" element={<AddTeam />} />
              <Route path="/add-player" element={<AddPlayer />} />
              <Route path="/add-league" element={<AddLeague />} />
              <Route path="/addMatchScreen/:teamId" element={<AddMatchScreen />} />
              <Route path="/addMatchScreen/AddMatch/:teamId" element={<AddMatch />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
