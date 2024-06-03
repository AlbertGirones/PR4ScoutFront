import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from 'react-modal';
import HomePage from './components/HomePage';


import AddTeam from './components/Team/AddTeamPage';
import AddLeague from './components/League/AddLeaguePage';

import AddMatchScreen from './components/Match/AddMatchScreenPage';
import AddMatch from './components/Match/AddMatchPage';
import ModifyMatch from './components/Match/ModifyMatchPage';

import MyTeamScreen from './components/Team/MyTeamScreenPage';
import AddPlayer from './components/Player/AddPlayerPage';
import ModifyPlayer from './components/Team/ModifyPlayerPage';
import InfoPlayer from './components/Player/InfoPlayerPage';
import InfoInMatchPlayer from './components/Player/InfoInMatchPlayerPage';

import ScoutScreen from './components/Scouts/ScoutScreenPage';
import AddScout from './components/Scouts/AddScoutPage';

import SetPlayerOfAnalyze from './components/Match/Analyze/SetPlayerPage';
import SetStatsOfAnalyze from './components/Match/Analyze/SetStatsPage';
import SummaryOfAnalyze from './components/Match/Analyze/SummaryPage';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';

import ProtectedRoute from './components/ProtectedRoute';
// import Matches from './components/Matches/MatchesPage';


function App() {

  Modal.setAppElement('#root');

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

              {/* MATCH SCREEN */}

              <Route path="/MatchScreen/:teamId" element={<AddMatchScreen />} />
              <Route path="/MatchScreen/AddMatch/:teamId" element={<AddMatch />} />
              <Route path="/MatchScreen/ModifyMatch/:teamId" element={<ModifyMatch />} />

              {/* TEAM SCREEN */}

              <Route path="/MyTeamScreen/:teamId" element={<MyTeamScreen />} />
              <Route path="/MyTeamScreen/AddPlayer/:teamId" element={<AddPlayer />} />
              <Route path="/MyTeamScreen/ModifyPlayer/:teamId" element={<ModifyPlayer />} />
              <Route path="/viewGeneralPlayer/:teamId/:playerId" element={<InfoPlayer />} />
              <Route path="/viewMatchOfPlayer/:playerId/:matchId" element={<InfoInMatchPlayer />} />

              {/* SCOUT SCREEN */}

              <Route path="/ScoutScreen/:teamId" element={<ScoutScreen />} />
              <Route path="/ScoutScreen/AddScout/:teamId" element={<AddScout />} />
              {/* <Route path="/ScoutScreen/ModifyScout/:teamId" element={<ModifyPlayer />} />
              <Route path="/ScoutScreen/viewGeneralPlayer/:teamId/:playerId" element={<InfoPlayer />} />
              <Route path="/ScoutScreen/viewMatchOfPlayer/:playerId/:matchId" element={<InfoInMatchPlayer />} /> */}

              {/* ANALYZE PLAYER */}
              
              <Route path="/AnalyzePlayer/SetPlayer/:matchId" element={<SetPlayerOfAnalyze />} />
              <Route path="/AnalyzePlayer/SetStats/:matchId/:playerId" element={<SetStatsOfAnalyze />} />
              <Route path="/AnalyzePlayer/Summary/:matchId/:playerId/:minPlayed" element={<SummaryOfAnalyze />} />

          </Route>
      </Routes>
    </Router>
  );
}

export default App;
