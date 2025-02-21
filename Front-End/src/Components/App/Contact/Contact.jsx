import React from 'react'

import './Contact.css'
const Contact = () => {
  return (
     <div className="contactSection" id="contact">
            <p className="directContactHead">GET IN TOUCH</p>
            <div className="contacts">
                <div className="directContact">
                    <h1><span>Convey Your</span>  Ideas to Us</h1>
                    <p className="directContactDetails">Contact us htmlFor questions,technical assistance, or collaboration opportunities via the contact inhtmlFormation provided.</p>
                    <div className="mobileContact">
                        <p><i className="fa-solid fa-phone mobileIcon"></i>+88018564238</p>
                        <p><i className="fa-regular fa-envelope mobileIcon"></i>procoderfpi@gmail.com</p>
                        <p><i  className="fa-solid fa-location-dot mobileIcon mobileIconLocation"></i>Feni, Bangladesh</p>
                    </div>
                    
                </div>
              <div className="messageContact" >
                    <form >
                        <label htmlFor="name" className="name">Name <br/>
                            <input type="text" name='name' id='name' />
                        </label>
                        <div className="emailOrPhone">
                            <label htmlFor="email" className="email">Email <br/>
                                <input type="email" name="email" id="email"/>
                            </label>
                            <label htmlFor="phone" className="phone">Phone <br/>
                                <input type="number" name="phone" id="phone"/>
                            </label>
                        </div>
                        <label htmlFor="message" className="message">Messange
                            <textarea name="message"  id="message"></textarea>
                        </label>
                        <input type="submit" value="Submit" id="submit"/>
                    </form>
               </div>
            </div>
     </div>
  )
}

export default Contact

