import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import NotesPage from './components/NotesPage';
import RegisterUserForm from './components/register';

const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(parseInt(localStorage.getItem('userId') || 'null'));

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId ? parseInt(storedUserId) : null);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogin = (userId: number) => {
    localStorage.setItem('userId', userId.toString());
    setUserId(userId);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterUserForm />} />
        <Route
          path="/notes"
          element={userId ? <NotesPage userId={userId} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
