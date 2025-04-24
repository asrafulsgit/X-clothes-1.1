import React, { useState } from "react";
import {
  bangladeshUpazila,
  divisions,
} from "../../../../allProductDetails/ProductCategories";
import { apiRequiestWithCredentials } from "../../../../utils/ApiCall";

const AddAddress = ({ newAddress }) => {
  const [address, setAddress] = useState({});
  const [upazilas,setUpazilas]= useState([])
  const [message, setMessage] = useState("");
  const [errorMessageField, setErrorMessageField] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === errorMessageField) {
      setMessage("");
      setErrorMessageField("");
    }
    if(name === 'zila'){
          const selectedZila = bangladeshUpazila.find(item => item.zila.toLowerCase() === value);
          setUpazilas(selectedZila.upazilas)
    }
    setAddress({ ...address, [name]: value });
  };
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const data = await apiRequiestWithCredentials(
        "post",
        "/user-new-address",
        address
      );
      newAddress(data.newAddress);
      setAddress({});
      setMessage("");
      setErrorMessageField("");
    } catch (error) {
      console.log(error);
      setMessage(
        error.response?.data?.errors[0].message || "Something went wrong"
      );
      setErrorMessageField(error.response?.data?.errors[0].field || "");
    }
  };

  return (
    <div className="address-section">
      <form action="" onSubmit={handleAddAddress}>
        <div className="input-field">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            required
            value={address.name || ""}
            name="name"
            onChange={handleInputChange}
            placeholder="Asraful House"
          />
        </div>
        {errorMessageField === "name" && <p className="message">{message}</p>}
        <div className="address-field">
          <div className="input-field">
            <label htmlFor="zila">Zila</label>
            <select
              name="zila"
              value={address.zila || ""}
              required
              onChange={handleInputChange}
              id="zila"
            >
              <option value="">Select Option</option>
              {bangladeshUpazila.map((item, index) => {
                const { zila } = item;
                return (
                  <option value={zila.toLowerCase()} key={index}>
                    {zila}
                  </option>
                );
              })}
            </select>
            {errorMessageField === "shippingAddress.zila" && (
              <p className="message">{message}</p>
            )}
          </div>
            {errorMessageField === "zila" && <p className="message">{message}</p>}
          <div className="input-field">
            <label htmlFor="upazila">Upazila</label>
            <select
              name="upazila"
              value={address.upazila || ""}
              required
              onChange={handleInputChange}
              id="upazila"
            >
              <option value="">Select Option</option>

              {address.zila &&
                upazilas.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
            </select>
            {errorMessageField === "shippingAddress.upazila" && (
              <p className="message">{message}</p>
            )}
          </div>
          {errorMessageField === "upazila" && <p className="message">{message}</p>}
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={address.email || ""}
            onChange={handleInputChange}
            placeholder="example@gmail.com"
          />
        </div>
        {errorMessageField === "email" && <p className="message">{message}</p>}
        <div className="input-field">
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            value={address.phone || ""}
            required
            name="phone"
            onChange={handleInputChange}
            placeholder="+8801825643258"
          />
        </div>
        {errorMessageField === "phone" && <p className="message">{message}</p>}
        <div className="info-update-btn">
          <button type="submit">Save change</button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
