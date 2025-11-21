import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const NavbarComponent = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "User";

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
        {/* My Bookings */}
        <button className="btn btn-outline-light nav-btn">
          <i className="bx bx-book-open fs-5 me-1"></i>
          My Bookings
        </button>

        {/* Payments */}
        <button className="btn btn-outline-light nav-btn">
          <i className="bx bx-credit-card fs-5 me-1"></i>
          Payments
        </button>

        {/* Display User Name instead of Profile */}
        <div className="dropdown">
          <button className="btn btn-outline-light profile-btn">
            <i className="bx bx-user-circle fs-4 me-1"></i>
            {userName}
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
