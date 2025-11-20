import React from "react";
import "./Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = ({ onLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header text-center py-4">
        <img
          src="/Smart_Travel_Connect_logo.png"
          alt="logo"
          className="sidebar-logo mb-2"
        />
        <h5 className="text-white fw-bold">Smart-Travel-Connect</h5>
      </div>

      <ul className="list-unstyled sidebar-menu px-3">
        <li className="sidebar-item">
          <a href="/adminhome" className="sidebar-link">
            <i className="bx bx-home fs-4 me-2"></i> Home
          </a>
        </li>

        <li className="sidebar-item">
          <a href="/admin/bus" className="sidebar-link">
            <i className="bx bx-bus fs-4 me-2"></i> Bus Management
          </a>
        </li>

        <li className="sidebar-item">
          <a href="/admin/train" className="sidebar-link">
            <i className="bx bx-train fs-4 me-2"></i> Train Management
          </a>
        </li>

        <li className="sidebar-item">
          <a href="/admin/flight" className="sidebar-link">
            <i className="bx bxs-plane fs-4 me-2"></i>
            Flight Management
          </a>
        </li>

        <li className="sidebar-item mt-4">
          <button className="sidebar-link logout-btn w-100" onClick={onLogout}>
            <i className="bx bx-log-out fs-4 me-2"></i> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
