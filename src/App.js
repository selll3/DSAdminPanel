import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; // Dashboard'ı dahil ediyoruz
import Sidebar from "./components/Sidebar"; // Sidebar'ı dahil ediyoruz
import TableEditor from "./components/TableEditor"; //  Yeni eklenen bileşen
import TeklifVer from "./components/TeklifVer";
import MusteriOlustur from "./components/MusteriOlustur";


const App = () => {
  const [user, setUser] = useState(null); // Kullanıcı bilgisini tutan state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar'ın açık mı kapalı mı olduğunu kontrol eder

  useEffect(() => {
    const token = localStorage.getItem("token"); // Token'ı kontrol et
    if (token) {
      setUser({ token }); // Token varsa user state'ini güncelle
    }
  }, []);

  const onLogin = (isLoggedIn) => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      setUser({ token }); // Kullanıcıyı login olarak ayarlıyoruz
    }
  };

  // Sidebar'ı açma/kapatma işlevi
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} /> {/* Giriş yaptıktan sonra Dashboard'a yönlendireceğiz */}
        
        {/* Dashboard route'ı */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <div className="dashboard-container">
                <Sidebar isOpen={isSidebarOpen} onSidebarToggle={toggleSidebar} /> {/* Sidebar'a isOpen ve onSidebarToggle prop'ları geçiyoruz */}
                <Dashboard user={user} isSidebarOpen={isSidebarOpen} /> {/* Dashboard bileşenine isSidebarOpen prop'unu geçiyoruz */}
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
                <Sidebar isOpen={isSidebarOpen} onSidebarToggle={toggleSidebar} />
                <TableEditor isSidebarOpen={isSidebarOpen} /> {/* <-- Prop'u ekledik */}
                
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
        <Sidebar isOpen={isSidebarOpen} onSidebarToggle={toggleSidebar} />
        <TeklifVer isSidebarOpen={isSidebarOpen} /> {/* <-- Burada geçtik */}
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
        <Sidebar isOpen={isSidebarOpen} onSidebarToggle={toggleSidebar} />
        <MusteriOlustur isSidebarOpen={isSidebarOpen} /> {/* <-- Burada geçtik */}
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
