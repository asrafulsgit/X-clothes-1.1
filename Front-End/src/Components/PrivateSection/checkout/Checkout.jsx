import React, { useEffect, useState } from "react";

import Nav from "../../App/Nav/Nav";
import Footer from "../../App/Footer/Footer";
import Header from "../../Products/header/Header";
import { apiRequiestWithCredentials } from "../../../utils/ApiCall";
import ExtraFooter from "../../App/Footer/ExtraFooter";
import { useLocation } from "react-router-dom";
import { divisions } from "../../../allProductDetails/ProductCategories";
import "./checkout.css";

const Checkout = () => {
  const location = useLocation();
  const [carts, setCarts] = useState(location.state);
  const [message, setMessage] = useState("");
  const [errorMessageField, setErrorMessageField] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {}, []);

  const orderSummary = [
    { name: "Items", value: totalItems },
    { name: "Sub Total", value: totalAmount },
    { name: "Taxes", value: taxes },
  ];

  return (
    <div className="checkout-page">
      <Nav />
      <Header param={"/checkout"} name={"checkout"} header={"Checkout"} />
      <div className="checkout-main">
        {loading ? (
          <p>loading...</p>
        ) : (
          <div className="checkout-body">
            <form action="">
              <div className="input-field">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  required
                  value={""}
                  name="name"
                  //     onChange={handleInputChange}
                  placeholder="Asraful Islam"
                />
                {errorMessageField === "name" && (
                  <p className="message">{message}</p>
                )}
              </div>
              {/* mobile field */}
              <div className="mobile-field">
                <div className="input-field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    value={""}
                    required
                    name="phone"
                    //     onChange={handleInputChange}
                    placeholder="+8801825643258"
                  />
                  {errorMessageField === "phone" && (
                    <p className="message">{message}</p>
                  )}
                </div>
                <div className="input-field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    value={""}
                    required
                    name="phone"
                    //     onChange={handleInputChange}
                    placeholder="+8801825643258"
                  />
                  {errorMessageField === "phone" && (
                    <p className="message">{message}</p>
                  )}
                </div>
              </div>
              {/* address field */}
              <div className="address-field">
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={""}
                    //     onChange={handleInputChange}
                    placeholder="example@gmail.com"
                  />
                  {errorMessageField === "email" && (
                    <p className="message">{message}</p>
                  )}
                </div>
                <div className="input-field">
                  <label htmlFor="house">House</label>
                  <input
                    type="text"
                    required
                    value={""}
                    name="house"
                    //     onChange={handleInputChange}
                    placeholder="Asraful House"
                  />
                  {errorMessageField === "house" && (
                    <p className="message">{message}</p>
                  )}
                </div>
                <div className="input-field">
                  <label htmlFor="state">State</label>
                  <select
                    name="state"
                    value={""}
                    required
                    //     onChange={handleInputChange}
                    id="state"
                  >
                    <option value="">Select Option</option>
                    {divisions.map((item, index) => {
                      return (
                        <option value={item.toLowerCase()} key={index}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                  {errorMessageField === "state" && (
                    <p className="message">{message}</p>
                  )}
                </div>
                <div className="input-field">
                  <label htmlFor="zip">Zip Code</label>
                  <input
                    required
                    type="number"
                    name="zip"
                    //     onChange={handleInputChange}
                    value={""}
                    id="zip"
                    placeholder="3900"
                  />
                  {errorMessageField === "zip" && (
                    <p className="message">{message}</p>
                  )}
                </div>
              </div>
            </form>
            <div className="order-summary-table">
              <table>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <h3>Order Summary</h3>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orderSummary.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="order-summary-table-name">
                          {item.name}
                        </td>
                        <td className="order-summary-table-value">
                          {item.value}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="order-submit-row">
                    <td className="order-summary-table-name">Total</td>
                    <td className="order-summary-table-value">2543</td>
                  </tr>
                  <tr className="coupon-code-field">
                    <td colSpan={2}>
                      <input type="text" placeholder="Coupone Code" />
                      <button>Apply</button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <button className="order-submit-btn">
                        Proceed to Checkout
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <ExtraFooter />
      <Footer />
    </div>
  );
};

export default Checkout;
