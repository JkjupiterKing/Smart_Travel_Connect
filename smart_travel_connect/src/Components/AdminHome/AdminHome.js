import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./AdminHome.css";

const AdminHome = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="admin-layout">
      <Sidebar onLogout={handleLogout} />

      <div className="admin-content">
        <h2 className="fw-bold mb-3">Welcome Admin</h2>
        <p className="text-muted">
          Manage buses, trains, flights and user operations from the dashboard.
        </p>

        <div className="dashboard-cards mt-4">
          <div className="card shadow p-4">
            <h4>Bus Management</h4>
            <p>Manage and add bus services.</p>
          </div>

          <div className="card shadow p-4">
            <h4>Train Management</h4>
            <p>Manage and add train services.</p>
          </div>

          <div className="card shadow p-4">
            <h4>Flight Management</h4>
            <p>Manage and add flight services.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
