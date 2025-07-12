<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReWearLanding from './Landing'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ReWearLanding />
    </>
  )
}

export default App
=======

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
>>>>>>> 82fa54d7e80b6588bc5335f8d399651bc30db21f
