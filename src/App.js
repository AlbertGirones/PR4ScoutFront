import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddTeam from './components/addTeam/AddTeam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-team" element={<AddTeam />} />
      </Routes>
    </Router>
  );
}

export default App;
