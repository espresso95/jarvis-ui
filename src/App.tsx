import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Agents from './pages/Agents';
import Navbar from './components/Navbar';
import AgentDetail from './pages/AgentDetail';
import AccountPage from './pages/AccountPage';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/:agentId" element={<AgentDetail />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
