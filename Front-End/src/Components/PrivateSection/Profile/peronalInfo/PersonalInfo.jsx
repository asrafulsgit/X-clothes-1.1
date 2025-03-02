import React, { useEffect, useState } from "react";
import "./personalInfo.css";
import { apiRequiestWithCredentials } from "../../../../utils/ApiCall";
const PersonalInfo = () => {
  const [apiLoading, setApiLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    avatar : "",
    name: "",
    email: "",
    phone: "",
  });
  
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
  
  const changeAvater = async(e) => {
    setImageLoading(true)
    const file = e.target.files[0];
    if(!file) return;
    const formData = new FormData();
    formData.append('avatar',file)
    try {
    const data =  await apiRequiestWithCredentials('put','/user-avater',formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      setPersonalInfo({...personalInfo,avatar : data.avatar})
    setImageLoading(false)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="personal-info-section">
      {apiLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="profile-image-field">
            <div className="profile-image">
              <img src={personalInfo.avatar} alt="image" />
            </div>
            <form encType="multipart/form-data" className="profile-image-edit">
              <input
                type="file"
                onChange={changeAvater}
                id="fileInput"
                className="hidden"
              />
              <label htmlFor="fileInput" className="custom-file-label">
                <i className="fa-solid fa-pen-to-square"></i>
              </label>
            </form>
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
