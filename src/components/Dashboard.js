import React from "react";
import "./Dashboard.css"; // Dashboard için stil dosyasını dahil edelim

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Demse Admin Panel</h2>
        <p>Bu bir deneme sayfasıdır</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Users</h3>
            <p>120</p>
          </div>
          <div className="stat-card">
            <h3>Orders</h3>
            <p>52</p>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p>$13,450</p>
          </div>
        </div>

        <div className="dashboard-recent-activity">
          <h3>Recent Activity</h3>
          <ul>
            <li>User "John Doe" added a new order.</li>
            <li>User "Jane Smith" updated their profile.</li>
            <li>User "Mark Lee" made a payment of $120.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
