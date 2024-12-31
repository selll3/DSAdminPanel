import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import './App.css';
import './components/Dashboard.css'
import Dashboard from "./components/Dashboard";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar durumunu kontrol et

  return (
    <div className="App">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`dashboard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="dashboard-header">
          <Dashboard />
          
        </div>
      </div>
    </div>
  );
};

export default App;






/*import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
*/