import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddPlayer from './components/Player/AddPlayerPage';
import AddTeam from './components/Team/AddTeam';
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
              {/* <Route path="/team-matches/:clubId" render={(props) => <Matches {...props} />} /> */}
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
