import React from "react";


const Content = () => {
  return (
    <div className="content">
      <h1>Welcome to the Admin Dashboard</h1>
      <p>
        Here you can manage all the administrative tasks, such as user management,
        view reports, and much more.
      </p>

      {/* Bu kısma dinamik bileşenler veya veriler ekleyebilirsiniz */}
      <div className="content-section">
        <h2>Section Title</h2>
        <p>This section can contain additional information, graphs, or controls.</p>
      </div>

      <div className="content-section">
        <h2>Recent Activity</h2>
        <p>Details about recent activities or reports can go here.</p>
      </div>
    </div>
  );
};

export default Content;
