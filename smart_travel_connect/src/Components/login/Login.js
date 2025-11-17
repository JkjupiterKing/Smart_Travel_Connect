import React, { useEffect, useState } from "react";
import "./Login.css";
import "boxicons/css/boxicons.min.css";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const CLIENT_ID =
  "275752115354-db8g0ivduartice875j1ug8uv05g2396.apps.googleusercontent.com";

const Login = () => {
  const [mode, setMode] = useState("");

  // Auto-switch animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMode("sign-in");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    setMode((prev) => (prev === "sign-in" ? "sign-up" : "sign-in"));
  };

  // Google login handler
  const handleGoogleLoginSuccess = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);

      const user = {
        email: decoded.email,
        username: decoded.name,
        googleId: decoded.sub,
      };

      const res = await fetch("http://localhost:8080/users/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok || !data.user) {
        throw new Error(data.message || "Google login failed");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Google login error:", err);
      alert("Google login failed.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div id="container" className={`container ${mode}`}>
        {/* FORM SECTION */}
        <div className="row">
          {/* SIGN UP */}
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <div className="form sign-up">
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input type="text" placeholder="Username" />
                </div>

                <div className="input-group">
                  <i className="bx bx-mail-send"></i>
                  <input type="email" placeholder="Email" />
                </div>

                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input type="password" placeholder="Password" />
                </div>

                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input type="password" placeholder="Confirm password" />
                </div>

                <button>Sign up</button>

                <p>
                  <span>Already have an account? </span>
                  <b onClick={toggle} className="pointer">
                    Sign in here
                  </b>
                </p>
              </div>
            </div>
          </div>

          {/* SIGN IN */}
          <div className="col align-items-center flex-col sign-in">
            <div className="form-wrapper align-items-center">
              <div className="form sign-in">
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input type="text" placeholder="Username" />
                </div>

                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input type="password" placeholder="Password" />
                </div>

                <button>Sign in</button>

                <div className="google-btn-wrapper">
                  <div className="google-btn-container">
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={() => alert("Google login failed")}
                    />
                  </div>
                </div>

                <p>
                  <b>Forgot password?</b>
                </p>

                <p>
                  <span>Don't have an account? </span>
                  <b onClick={toggle} className="pointer">
                    Sign up here
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="row content-row">
          {/* SIGN IN CONTENT */}
          <div className="col align-items-center flex-col">
            <div className="text sign-in">
              {mode === "sign-in" && (
                <img
                  src="/Smart_Travel_Connect_logo.png"
                  alt="Smart Travel Connect Logo"
                  className="welcome-logo"
                />
              )}
            </div>
            <div className="img sign-in"></div>
          </div>

          {/* SIGN UP CONTENT */}
          <div className="col align-items-center flex-col">
            <div className="text sign-up">
              {mode === "sign-up" && (
                <>
                  <h3 className="tagline">One App. Every Journey.</h3>
                  <p className="tagline-sub">
                    Your smart way to book trains, buses, and flights—all in one
                    place.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
