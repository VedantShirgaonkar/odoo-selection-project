
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReWearLanding from './Landing';
import ReWearAuth from './LoginSignup';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<ReWearAuth />} />
        <Route path="/landing" element={<ReWearLanding />} />
      </Routes>
    </Router>
  );
}

export default App;
