import React, { memo, useState, useCallback } from "react";
import "./password.css";
import { apiRequiestWithCredentials } from "../../../../utils/ApiCall";

const Password = () => {
  const [message, setMessage] = useState("");
  const [messageField, setMessageField] = useState("");
  const [resetInfo, setResetInfo] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = useCallback((field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setResetInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage("");
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = resetInfo;

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const data = await apiRequiestWithCredentials(
        "put",
        "/user-manage-password",
        resetInfo
      );
      setMessageField(data.field);
      setMessage(data.message);
      setResetInfo({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="password-manager-section">
      {messageField === "success" && (
        <p className="message success-message">{message}</p>
      )}
      <form onSubmit={handleResetPassword}>
        <div className="input-field">
          <label htmlFor="oldPassword">Old Password</label>
          <div className="inputs">
            <input
              type={showPassword.oldPassword ? "text" : "password"}
              name="oldPassword"
              onChange={handleChange}
              value={resetInfo.oldPassword}
              placeholder="Enter old password"
            />
            {resetInfo.oldPassword.length > 0 && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility("oldPassword")}
                className="seePassword-btn"
              >
                <i
                  className={`fa-solid fa-eye${
                    showPassword.oldPassword ? "" : "-slash"
                  }`}
                ></i>
              </button>
            )}
          </div>
          {messageField === "oldPassword" && <p className="message">{message}</p>}
        </div>

        <div className="input-field">
          <label htmlFor="newPassword">New Password</label>
          <div className="inputs">
            <input
              type={showPassword.newPassword ? "text" : "password"}
              name="newPassword"
              onChange={handleChange}
              value={resetInfo.newPassword}
              placeholder="Enter new password"
            />
            {resetInfo.newPassword.length > 0 && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility("newPassword")}
                className="seePassword-btn"
              >
                <i
                  className={`fa-solid fa-eye${
                    showPassword.newPassword ? "" : "-slash"
                  }`}
                ></i>
              </button>
            )}
          </div>
        </div>

        <div className="input-field">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <div className="inputs">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleChange}
              value={resetInfo.confirmPassword}
              placeholder="Confirm new password"
            />
            {resetInfo.confirmPassword.length > 0 && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="seePassword-btn"
              >
                <i
                  className={`fa-solid fa-eye${
                    showPassword.confirmPassword ? "" : "-slash"
                  }`}
                ></i>
              </button>
            )}
          </div>
        </div>

        {messageField === "newPassword" && <p className="message">{message}</p>}

        {/* Submit Button */}
        <button type="submit" className="update-password-btn">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default memo(Password); 
