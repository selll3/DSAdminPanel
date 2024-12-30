import React from "react";

const Content = ({ activeMenu }) => {
  return (
    <div className="content">
      <h2>{activeMenu}</h2>
      <p>
        You have selected the <strong>{activeMenu}</strong> menu.
      </p>
    </div>
  );
};

export default Content;
