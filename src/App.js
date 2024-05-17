import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddPlayer from './components/Player/AddPlayerPage';
import AddTeam from './components/Team/AddTeam';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-team" element={<AddTeam />} />
        <Route path="/add-player" element={<AddPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
