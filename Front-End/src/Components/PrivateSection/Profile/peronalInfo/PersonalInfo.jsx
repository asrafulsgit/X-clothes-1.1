import React, { useEffect, useState } from "react";
import "./personalInfo.css";
import profile from "../../../../assets/profile.jpg";
import { apiRequiestWithCredentials } from "../../../../utils/ApiCall";
const PersonalInfo = () => {
  const [apiLoading, setApiLoading] = useState(true);
  const [personalInfo, setPersonalInfo] = useState({
    avater : '',
    name : '',
    email : '',
    phone : ''
  });
  console.log(personalInfo);
  useEffect(() => {
    const apiCalling = async () => {
      try {
        const data = await apiRequiestWithCredentials(
          "get",
          "/user-personal-information"
        );
        setPersonalInfo(data.userInfo);
        setApiLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    apiCalling();
  }, []);
  return (
    <div className="personal-info-section">
      {apiLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="profile-image-field">
            <div className="profile-image">
              <img src={personalInfo.avater} alt="image" />
            </div>
            <button className="profile-image-edit">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
          <div className="information-section">
            <div className="input-field">
              <label htmlFor="name"> Name</label>
              <input type="text" value={personalInfo.name} name="name" />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" value={personalInfo.email} name="email" />
            </div>
            <div className="input-field">
              <label htmlFor="number">Phone</label>
              <input type="number" value={personalInfo.phone} name="number" />
            </div>
          </div>
          <div className="info-update-btn">
            <button>Save change</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalInfo;
