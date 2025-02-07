
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css"; // Stil dosyası

const Sidebar = ({ isOpen, onSidebarToggle }) => {
  const navigate = useNavigate(); // useNavigate hook'unu kullanıyoruz

  const handleLogout = () => {
    // Çıkış yapma işlemi: Token'ı sil
    localStorage.removeItem("authToken"); // Token'ı sil

    // Diğer çıkış işlemleri (eğer gerekiyorsa) burada yapılabilir

    // Giriş sayfasına yönlendir
    navigate("/login");
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2>Demse Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li className="menu-item" onClick={() => navigate("/dashboard")}>Ana Sayfa</li> 
        <li className="menu-item" onClick={() => navigate("/table-editor")}>Tablo Düzenlemeleri</li> {/*  Yönlendirme eklendi */}
        <li className="menu-item" onClick={() => navigate("/teklif-ver")}>Teklif Ver</li>
        <li className="menu-item" onClick={() => navigate("/musteri-olustur")}>Müşteri Oluştur</li>
        <li className="menu-item" onClick={handleLogout}>
          Çıkış Yap
        </li>
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