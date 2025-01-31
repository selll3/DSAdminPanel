
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css"; // Stil dosyası

const Sidebar = ({ isOpen, onSidebarToggle }) => {
  const navigate = useNavigate(); // useNavigate hook'unu kullanıyoruz

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2>Demse Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li className="menu-item" onClick={() => navigate("/dashboard")}>Ana Sayfa</li> 
        <li className="menu-item" onClick={() => navigate("/table-editor")}>Tablo Düzenlemeleri</li> {/*  Yönlendirme eklendi */}
        <li className="menu-item">Teklif Ver</li>
        <li className="menu-item">Logout</li>
      </ul>
      <button className="sidebar-toggle" onClick={onSidebarToggle}>
        {isOpen ? "Gizle" : "Göster"}
      </button>
    </div>
  );
};

export default Sidebar;










/*import React from "react";

const Sidebar = ({ setActiveMenu }) => {
  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li onClick={() => setActiveMenu("Home")}>Home</li>
        <li onClick={() => setActiveMenu("Users")}>Users</li>
        <li onClick={() => setActiveMenu("Settings")}>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
*/