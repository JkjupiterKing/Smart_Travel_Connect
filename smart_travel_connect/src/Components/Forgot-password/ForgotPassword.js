import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ForgotPassword.css";

const ForgotPassword = ({ closeModal }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const checkEmailExists = async () => {
    const res = await fetch(
      `http://localhost:8080/api/users/check-email?email=${email}`
    );
    return await res.json();
  };

  const handleSendOTP = async () => {
    setError("");

    if (!email) {
      setError("Please enter your registered email.");
      return;
    }

    const check = await checkEmailExists();
    if (!check.exists) {
      setError("Email not found! Please enter a registered email.");
      return;
    }

    const res = await fetch(`http://localhost:8080/otp/send?email=${email}`, {
      method: "POST",
    });

    if (!res.ok) {
      setError("Error sending OTP. Try again.");
      return;
    }

    alert("OTP sent to your registered email.");
    setStep(2);
  };

  const handleVerifyOTP = async () => {
    setError("");

    if (!otp) {
      setError("Enter the OTP you received.");
      return;
    }

    const res = await fetch(
      `http://localhost:8080/otp/verify?email=${email}&otp=${otp}`,
      { method: "POST" }
    );

    const status = await res.text();

    if (status !== "OTP verified successfully") {
      setError("Invalid or expired OTP.");
      return;
    }

    alert("OTP Verified!");
    setStep(3);
  };

  const handleResetPassword = async () => {
    setError("");

    if (!newPass || !confirmPass) {
      setError("Fill all fields.");
      return;
    }

    if (newPass !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch(
      `http://localhost:8080/api/users/forgot-password?email=${email}&newPassword=${newPass}`,
      { method: "PUT" }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to reset password.");
      return;
    }

    alert("Password reset successful!");
    closeModal();
  };

  return (
    <div className="modal fade show d-block fp-modal-bg">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content fp-card">
          <div className="modal-header border-0">
            <h5 className="modal-title">
              {step === 1 && "Forgot Password"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Reset Password"}
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>

          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            {step === 1 && (
              <>
                <label className="form-label">Enter Registered Email</label>
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button className="btn btn-success" onClick={handleSendOTP}>
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <label className="form-label">Enter OTP</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button className="btn btn-primary" onClick={handleVerifyOTP}>
                  Verify OTP
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <label className="form-label">New Password</label>
                <div className="input-group mb-3">
                  <input
                    type={showPass ? "text" : "password"}
                    className="form-control"
                    placeholder="New Password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                </div>

                <label className="form-label">Confirm Password</label>
                <div className="input-group mb-3">
                  <input
                    type={showPass ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={showPass}
                    onChange={() => setShowPass(!showPass)}
                  />
                  <label className="form-check-label">Show Password</label>
                </div>

                <button
                  className="btn btn-success"
                  onClick={handleResetPassword}
                >
                  Update Password
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
