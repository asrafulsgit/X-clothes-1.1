import React, { useState } from "react";
import './expenses.css'
const Expenses = () => {
  const [message, setMessage] = useState("");
  const expensesDetails = {
    type: "",
    amount: "",
    description: "",
  };
  const [expenses, setExpenses] = useState(expensesDetails);
  const handleChange = (e) => {
      const {name,value}=e.target;
      setExpenses({...expenses,[name] : value})
  };
  const handleSubmitExpenses = () => {
   
  };
  const expensesTypes = [
      "product_cost",
      "shipping",
      "salary",
      "rent",
      "marketing",
      "payment_gateway_fee",
      "return_loss",
      "packaging",
      "inventory_storage",
      "others",
    ];
  return (
    <div className="add-expenses-page">
        <h1 className="product-added-message">{message}</h1>
        <form
          onSubmit={handleSubmitExpenses}
          method="post"
          action="/admin/add-expenses"
        >
            <div className="form-item">
              <label htmlFor="brand">Type</label>
              <select
                onChange={handleChange}
                value={expenses.type}
                className="categories-input"
                name="type"
                id="type"
                required
              >
                <option value="" disabled>
                  Select Option
                </option>
                {expensesTypes &&
                  expensesTypes.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-item">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                name="amount"
                onChange={handleChange}
                value={expenses.amount}
                id="amount"
                required
              />
            </div>
            <div className="form-item">
              <label htmlFor="description">Description</label>
              <textarea name="description" rows={5} required value={expenses.description} onChange={handleChange} id="description"></textarea>
             
            </div>
          <button type="submit" className="product-add-btn">
            Add Expenses
          </button>
        </form>
    </div>
  );
};

export default Expenses;
