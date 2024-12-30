import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <div className="dashboard-container">
      <Sidebar setActiveMenu={setActiveMenu} />
      <Content activeMenu={activeMenu} />
    </div>
  );
};

export default Dashboard;
