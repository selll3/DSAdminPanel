import React, { useState } from "react";
import Login from "./components/Login"; // Login sayfası bileşeni
import Sidebar from "./components/Sidebar"; // Sidebar bileşeni
import "./App.css"; // Global CSS dosyanız

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Kullanıcı oturum durumu

  const handleLogin = (status) => {
    setIsAuthenticated(status); // Oturum durumunu güncelle
  };

  return (
    <div className="app">
      {/* Kullanıcı oturum açmamışsa Login sayfası gösterilir */}
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        // Oturum açılmışsa Sidebar ve içerik gösterilir
        <div className="dashboard">
          <Sidebar />
          <div className="content">
            <h1>Admin Panel</h1>
            <p>Hoş geldiniz! Lütfen sol menüden bir seçenek seçin.</p>
          </div>
        </div>
      )}
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