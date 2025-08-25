
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VaultPage from './pages/VaultPage';
import Navbar from './components/Navbar';
import AgentDetail from './pages/AgentDetail';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/vault/:agentId" element={<AgentDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
