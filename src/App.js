import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Dùng HashRouter
import LoginForm from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

const App = () => {
  const [userId, setUserId] = useState(null); // Quản lý userId trong App component

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm setUserId={setUserId} />} />  {/* Truyền setUserId vào Login */}
        <Route path="/dashboard" element={<Dashboard userId={userId} />} />  {/* Truyền userId vào Dashboard */}
      </Routes>
    </Router>
  );
};

export default App;
