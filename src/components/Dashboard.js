import React from "react";
import "./Dashboard.css"; // CSS dosyasını yine dahil ediyoruz

const Dashboard = ({ user, isSidebarOpen }) => {
  return (
    <div
      className="dashboard"
      style={{
        marginLeft: isSidebarOpen ? "250px" : "0", // Sidebar açıkken 250px, kapalıyken 0px margin-left
        transition: "margin-left 0.3s ease", // Geçiş animasyonu
      }}
    >
      <h2>Demse Admin Paneline Hoş Geldin!, {user.token ? "Admin" : "User"}</h2>
      {/* Dashboard içeriği burada */}
    </div>
  );
};

export default Dashboard;
