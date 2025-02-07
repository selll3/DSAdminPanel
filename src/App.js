import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import TableEditor from "./components/TableEditor";
import TeklifVer from "./components/TeklifVer";
import MusteriOlustur from "./components/MusteriOlustur";

const App = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }

    // Tarayıcı geçmişini sıfırla (geri gitmeyi engelle)
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  const onLogin = (isLoggedIn) => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      setUser({ token });

      // Kullanıcı giriş yaptığında geçmişi temizle
      window.history.pushState(null, "", window.location.href);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    setUser(null);

    // Çıkış yapınca geçmişi temizle ve login sayfasına yönlendir
    window.history.pushState(null, "", "/login");
    window.location.reload();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />

        <Route
          path="/dashboard"
          element={
            user ? (
              <div className="dashboard-container">
                <Sidebar isOpen={isSidebarOpen} onSidebarToggle={toggleSidebar} onLogout={onLogout} />
                <Dashboard user={user} isSidebarOpen={isSidebarOpen} />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/table-editor"
          element={
            user ? (
              <div className="dashboard-container">
                <Sidebar isOpen={isSidebarOpen} onSidebarToggle={toggleSidebar} onLogout={onLogout} />
                <TableEditor isSidebarOpen={isSidebarOpen} />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/teklif-ver"
          element={
            user ? (
              <div className="dashboard-container">
                <Sidebar isOpen={isSidebarOpen} onSidebarToggle={toggleSidebar} onLogout={onLogout} />
                <TeklifVer isSidebarOpen={isSidebarOpen} />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/musteri-olustur"
          element={
            user ? (
              <div className="dashboard-container">
                <Sidebar isOpen={isSidebarOpen} onSidebarToggle={toggleSidebar} onLogout={onLogout} />
                <MusteriOlustur isSidebarOpen={isSidebarOpen} />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
