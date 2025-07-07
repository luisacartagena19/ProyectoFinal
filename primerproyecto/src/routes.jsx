
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './features/landing/Landing'; 
import LoginForm from './features/auth/components/loginForm'; 
import Dashboard from './features/dashboard/components/dashboard'; 
import { useAuth } from './features/auth/hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={< Landing />} /> 
        <Route path="/login" element={<LoginForm />} /> 
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
