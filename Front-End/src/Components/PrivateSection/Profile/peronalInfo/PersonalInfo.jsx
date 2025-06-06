import React, { useEffect, useState } from "react";
import "./personalInfo.css";
import { apiRequiestWithCredentials } from "../../../../utils/ApiCall";
import Spinner from "../../../../utils/loading/Spinner";

const PersonalInfo = () => {
  const [apiLoading, setApiLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [message, setMessage]= useState('')
  const [errorField,setErrorField]= useState('')

  const [personalInfo, setPersonalInfo] = useState({
    avatar : "",
    name: "",
    email: "",
    phone: "",
  });

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
        setApiLoading(false);
      }
  };

  useEffect(() => {
    apiCalling();
  }, []);
  
  const changeAvater = async(e) => {
    setImageLoading(true)
    if(errorField === 'avatar'){
      setMessage('')
      setErrorField('')
    }
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
      setMessage(error.response?.data?.errors[0].message)
      setErrorField(error.response?.data?.errors[0].field)
    }
    setImageLoading(false)
  };
  const handleChange =(e)=>{
    const {name,value} = e.target;
    setPersonalInfo((prev)=> ({...prev,[name] : value}))
  }
  const handleInformationChange =async()=>{
    try {
        const data = await apiRequiestWithCredentials('put','/user/information/update',personalInfo)
        setMessage(data.message)
    } catch (error) {
      console.log(error)
    }
  }
  if(apiLoading){
    return <>
     <div className="personal-info-section-loading">
        <Spinner /> 
      </div>
    </>
  }
  return (
    <div className="personal-info-section">
          <div className="profile-image-field">
            <div className="profile-image">
              {imageLoading ? 
                <div style={{padding: '0 4px'}} className="loadingio-spinner-rolling-nq4q5u6dq7r">
                 <div  className="ldio-x2uulkbinbj ">
                   <div style={{width : '30px',height : '30px'}}></div>
                 </div>
                </div> 
               : <img src={personalInfo.avatar} alt="image" />}
            </div>
            {!imageLoading && 
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
            </form>}
          </div>
            {errorField === 'avatar' && <p className="message" style={{marginTop : '1rem'}}>{message}</p>}
          <div className="information-section">
            <div className="input-field">
              <label htmlFor="name"> Name</label>
              <input type="text" 
              onChange={handleChange} 
              value={personalInfo.name} 
              name="name" />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" 
              disabled
              value={personalInfo.email || ' '} 
              name="email" />
            </div>
            <div className="input-field">
              <label htmlFor="number">Phone</label>
              <input type="number" 
              onChange={handleChange} 
              value={personalInfo.phone} 
              name="phone" />
            </div>
          </div>
          <div className="info-update-btn">
            <button onClick={handleInformationChange}>Save change</button>
          </div>
    </div>
  );
};

export default PersonalInfo;
