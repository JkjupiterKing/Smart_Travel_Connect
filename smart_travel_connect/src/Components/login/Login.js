import React, { useEffect, useState } from "react";
import "./Login.css";
import "boxicons/css/boxicons.min.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const CLIENT_ID =
  "275752115354-db8g0ivduartice875j1ug8uv05g2396.apps.googleusercontent.com";

const Login = () => {
  const [mode, setMode] = useState("sign-in");

  // SIGNUP FIELD STATES
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    pass: "",
    cpass: "",
  });

  // LOGIN FIELD STATES
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // SIGNUP INPUT CHANGE HANDLER
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // LOGIN INPUT CHANGE HANDLER
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // INITIAL ANIMATION
  useEffect(() => {
    const timer = setTimeout(() => setMode("sign-in"), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    setMode((prev) => (prev === "sign-in" ? "sign-up" : "sign-in"));
  };

  // GOOGLE LOGIN HANDLER
  const handleGoogleLoginSuccess = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);

      const googleUser = {
        name: decoded.name,
        email: decoded.email,
      };

      const res = await fetch("http://localhost:8080/api/users/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleUser),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || "Google login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/home";
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed.");
    }
  };

  // SIGN-UP HANDLER
  const handleSignup = async () => {
    const { username, email, pass, cpass } = signupData;

    // VALIDATION
    if (!username || !email || !pass || !cpass) {
      alert("All fields are required!");
      return;
    }

    const usernameRegex = /^[A-Za-z0-9 .]{3,}$/;
    if (!usernameRegex.test(username)) {
      alert(
        "Invalid Name:\n\n• Minimum 3 characters\n• Only letters, numbers, spaces, and dots allowed"
      );
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    const passwordRules =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRules.test(pass)) {
      alert(
        "Password must contain:\n\n• Minimum 8 characters\n• At least 1 uppercase letter\n• At least 1 lowercase letter\n• At least 1 number\n• At least 1 special character"
      );
      return;
    }

    if (pass !== cpass) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      name: username,
      email: email,
      passwordHash: pass,
    };

    try {
      const res = await fetch("http://localhost:8080/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Signup successful!");

      // CLEAR FIELDS
      setSignupData({
        username: "",
        email: "",
        pass: "",
        cpass: "",
      });

      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/home";
    } catch (err) {
      alert("Error connecting to server!");
      console.error(err);
    }
  };

  // NORMAL LOGIN HANDLER
  const handleLogin = async () => {
    const { email, password } = loginData;

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/users/login?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/home";
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div id="container" className={`login-container ${mode}`}>
        <div className="login-row">
          {/* SIGN UP */}
          <div className="login-col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <div className="form sign-up">
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={signupData.username}
                    onChange={handleSignupChange}
                  />
                </div>

                <div className="input-group">
                  <i className="bx bx-mail-send"></i>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                  />
                </div>

                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    name="pass"
                    type="password"
                    placeholder="Password"
                    value={signupData.pass}
                    onChange={handleSignupChange}
                  />
                </div>

                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    name="cpass"
                    type="password"
                    placeholder="Confirm password"
                    value={signupData.cpass}
                    onChange={handleSignupChange}
                  />
                </div>

                <button onClick={handleSignup}>Sign up</button>

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
          <div className="login-col align-items-center flex-col sign-in">
            <div className="form-wrapper align-items-center">
              <div className="form sign-in">
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>

                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>

                <button onClick={handleLogin}>Sign in</button>

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
        <div className="login-row content-row">
          <div className="login-col align-items-center flex-col">
            <div className="text sign-in">
              {mode === "sign-in" && (
                <img
                  src="/Smart_Travel_Connect_logo.png"
                  alt="Smart Travel Connect Logo"
                  className="welcome-logo"
                />
              )}
            </div>
          </div>

          <div className="login-col align-items-center flex-col">
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
