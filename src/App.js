import React from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar"; // Sidebar'ı dahil ettik
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="dashboard-container">
        <Sidebar /> {/* Sidebar'ı burada ekliyoruz */}
        <Dashboard /> {/* Dashboard sayfasını direkt render ediyoruz */}
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