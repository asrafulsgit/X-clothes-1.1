import React from 'react'
import './address.css'
const Address = () => {
  return (
    <div className='manage-address-section'>
      <div className="previous-addresses">
         <table>
              <tbody>
                    <tr> 
                        <td>
                          <h2 className='house-name'>Asraful House</h2>
                          <p className='house-address'>2462 house,master para, feni, bangladesh</p>
                        </td>
                        <td style={{width:'100px'}}><button className='edit-address-btn'>Edit</button></td>
                        <td style={{width:'100px'}}><button className='delete-address-btn'>Delete</button></td>
                    </tr>
              </tbody>
         </table>
      </div>
      <h1 className='new-address-title'>Add New Address</h1>
      <div className="address-section">
                <div className="input-field">
                  <label htmlFor="house">House</label>
                    <input type="text" name='house' placeholder='House Name'  />
                </div>
                <div className="input-field">
                  <label htmlFor="state">State</label>
                      <select name="state" id="state">
                        <option value="feni">Feni</option>
                        <option value="dhaka">dhaka</option>
                      </select>
                </div>
                <div className="input-field">
                  <label htmlFor="zip">Zip Code</label>
                    <select name="zip" id="zip">
                    <option value="3900">aftab bibir hat</option>
                    <option value="1200">Dhaka</option>
                    </select>
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

export default Address
