import React from 'react'
import './personalInfo.css'
import profile from '../../../../assets/profile.jpg'
const PersonalInfo = () => {
  return (
    <div className='personal-info-section'>
          <div className="profile-image-field">
              <div className="profile-image">
                  <img src={profile} alt="image" />
              </div>
              <button className="profile-image-edit">
                  <i className="fa-solid fa-pen-to-square"></i>
              </button>
          </div>
          <div className="information-section">
                <div className="input-field">
                  <label htmlFor="name">Name</label>
                    <input type="text" name='name'  />
                </div>
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                    <input type="email" name='email' />
                </div>
                <div className="input-field">
                  <label htmlFor="number">Phone</label>
                    <input type="number" name='number' />
                </div>
          </div>
          <div className="info-update-btn">
            <button>Save change</button>
          </div>
    </div>
  )
}

export default PersonalInfo
