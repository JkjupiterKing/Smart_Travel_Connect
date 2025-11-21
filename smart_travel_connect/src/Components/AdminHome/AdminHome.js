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
        <h2 className="fw-bold mb-3">Welcome</h2>
        <p className="text-muted">
          Manage buses, trains, flights and customer bookings.
        </p>

        <div className="dashboard-cards mt-4">
          <div className="card shadow p-4">
            <h4>Total Buses</h4>
            <p></p>
          </div>

          <div className="card shadow p-4">
            <h4>Total Trains</h4>
            <p></p>
          </div>

          <div className="card shadow p-4">
            <h4>Total Flights</h4>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
