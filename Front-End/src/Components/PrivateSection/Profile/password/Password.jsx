import React, { memo, useState, useCallback } from "react";
import "./password.css";
import { apiRequiestWithCredentials } from "../../../../utils/ApiCall";

const Password = () => {
  const [message, setMessage] = useState("");
  const [errorMessageField, setErrorMessageField] = useState("");
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
    if(name === errorMessageField){
      setErrorMessageField('');
      setMessage('');
    }
    setResetInfo((prev) => ({...prev,[name]: value}));
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = resetInfo;
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      setErrorMessageField('newPassword')
      return;
    }

    try {
      const data = await apiRequiestWithCredentials(
        "put",
        "/user-manage-password",
        resetInfo
      );
      setResetInfo({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setErrorMessageField('');
      setMessage('');
    } catch (error) {
      console.error(error);
      setMessage( error.response?.data?.errors[0].message);
      setErrorMessageField( error.response?.data?.errors[0].field);
    }
  };

  return (
    <div className="password-manager-section">
      {errorMessageField === "success" && (
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
          {errorMessageField === "oldPassword" && <p className="message">{message}</p>}
          <button className="forgot-password-btn">Forget Password</button>
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

        {errorMessageField === "newPassword" && <p className="message">{message}</p>}

        {/* Submit Button */}
        <button type="submit" className="update-password-btn">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default memo(Password); 
