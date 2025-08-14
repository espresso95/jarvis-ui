import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
/**
 * Main application component.
 *
 * The previous implementation attempted to dynamically import the page
 * components and displayed a loading screen while doing so. Since the
 * components are already statically imported, this extra step was
 * unnecessary and could cause the UI to briefly show a loading overlay
 * on every page refresh. The loading logic has been removed so the
 * application renders immediately.
 */
import Navbar from './components/Navbar';
import Home from './app/page';
import Bots from './app/bots/page';
import OneMinuteChart from './app/chart/page';
import { DevAuthStatus } from './components/DevAuthStatus';

function App() {
  // The application renders directly without a loading screen.

  return (
    <>
      {/* Main App */}
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'black', // Change background to black
          color: 'text.primary',
        }}
      >
        <Navbar />
        <Container
          sx={{ p: 4, mt: '64px' /* Add margin to accommodate fixed navbar */ }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Bots />} />
            <Route path="/chart" element={<OneMinuteChart />} />
          </Routes>
        </Container>
      </Box>
      
      {/* Development authentication status */}
      <DevAuthStatus />
    </>
  );
}

export default App;
