

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReWearLanding from './Landing';
import ReWearAuth from './LoginSignup';
import ItemListing from './AddItem';
import ReWearDashboard from './UserDashboard';
import { AuthProvider } from './AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<ReWearAuth />} />
          <Route path="/landing" element={<ReWearLanding />} />
          <Route path="/add-item" element={<ItemListing />} />
          <Route path="/dashboard" element={<ReWearDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
