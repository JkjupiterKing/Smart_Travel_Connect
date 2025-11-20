import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const NavbarComponent = ({ onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm fixed-top px-4">
      <a
        className="navbar-brand d-flex align-items-center brand-hover"
        href="/"
      >
        <img
          src="/Smart_Travel_Connect_logo.png"
          alt="logo"
          className="navbar-logo me-2"
        />
        <span className="fw-bold logo-text">Smart Travel Connect</span>
      </a>

      <div className="ms-auto d-flex align-items-center gap-3">
        {/* Profile Dropdown */}
        <div className="dropdown">
          <button className="btn btn-outline-light  profile-btn">
            <i className="bx bx-user-circle fs-4 me-1"></i>
            Profile
          </button>
        </div>

        {/* Logout */}
        <button className="btn logout-btn" onClick={onLogout}>
          <i className="bx bx-log-out-circle fs-5 me-1"></i> Logout
        </button>
      </div>
    </nav>
  );
};

export default NavbarComponent;
