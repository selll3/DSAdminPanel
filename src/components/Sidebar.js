import React from "react";
import './Sidebar.css'; // Sidebar için stil dosyasını dahil edelim

const Sidebar = ({ isOpen, onSidebarToggle }) => { // onSidebarToggle burada props olarak geliyor
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>Demse Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li className="menu-item">Ana Sayfa</li>
        <li className="menu-item">Tablo Düzenlemeleri</li>
        <li className="menu-item">Teklif Ver</li>
        <li className="menu-item">Logout</li>
      </ul>
      {/* Sidebar'ı açıp kapatmak için buton */}
      <button className="sidebar-toggle" onClick={onSidebarToggle}>
        {isOpen ? 'Gizle' : 'Göster'}
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