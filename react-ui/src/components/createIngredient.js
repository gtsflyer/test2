import React, { useState } from "react";
import { useNavigate } from "react-router";
import Select, { createFilter } from "react-select";
import CustomOption from "./customOption";
import CustomMenuList from "./CustomMenuList";
import "./customOptions.css";

export default function CreateIngredient() {
 const [form, setForm] = useState({
  itemNumber: "",
  amountPerPack: "",
  amount: "",
  quantityType: "",
  name: "",
  price: "",
  storageType: "",
  vendor: "",
  orderPlaced: "",
  expectedDelivery: "",
  inventoryOnHand: "",
  isDelivered: ""

 });
 const navigate = useNavigate();

  const storageTypeList = [
    {"value": "Refrigerator", "label": "Refrigerator"},
    {"value": "Shelf Stable", "label": "Shelf Stable"},
    {"value": "Frozen", "label": "Frozen"},
  ];

  const vendorList = [
    {"value": "Grocery", "label": "Grocery"},
    {"value": "Schenk's", "label": "Schenk's"},
    {"value": "US Foods", "label": "US Foods"}
  ];

  const yesNoOptions = [
    {"value": "yes", "label": "Yes"},
    {"value": "no", "label": "No"}
  ];
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const newIngredient = { ...form };

   // This will send a post request to update the data in the database.
   await fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/ingredients/add`, {
     method: "POST",
     body: JSON.stringify(newIngredient),
     headers: {
       'Content-Type': 'application/json'
     },
   })
   .catch(error => {
    window.alert(error);
    return;
  });
 
   setForm({ 
      itemNumber: "",
      amountPerPack: "",
      amount: "",
      quantityType: "",
      name: "",
      price: "",
      storageType: "",
      vendor: "",
      orderPlaced: "",
      expectedDelivery: "",
      inventoryOnHand: "",
      isDelivered: ""
   });
   navigate("/");
 }

 // This following section will display the form that takes input from the user to update the data.
 return (
  <div class="container">
    <div class="row">
      <div class="col">
        <form onSubmit={onSubmit}>
          <h3>Create Ingredient <input
            type="submit"
            value="💾 Save"
            className="btn btn-primary"
            />
          </h3>
          <div className="form-group">
            <label htmlFor="servings">Item Number</label>
            <input
              type="number"
              className="form-control"
              id="servings"
              value={form.itemNumber}
              onChange={(e) => updateForm({ itemNumber: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">amountPerPack</label>
            <input
              type="number"
              className="form-control"
              id="servings"
              value={form.amountPerPack}
              onChange={(e) => updateForm({ amountPerPack: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">amount</label>
            <input
              type="number"
              className="form-control"
              id="servings"
              value={form.amount}
              onChange={(e) => updateForm({ amount: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipeName">quantityType</label>
            <input
              type="text"
              className="form-control"
              id="recipeName"
              value={form.quantityType}
              onChange={(e) => updateForm({ quantityType: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipeName">Name</label>
            <input
              type="text"
              className="form-control"
              id="recipeName"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">price</label>
            <input
              type="number"
              className="form-control"
              id="servings"
              value={form.price}
              onChange={(e) => updateForm({ price: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">storageType</label>
            <Select
                    isSearchable="true"
                    onChange={(e) => updateForm({ storageType: e.value})}
                    options={storageTypeList}
                    filterOption={createFilter({ ignoreAccents: false })}
                    captureMenuScroll={false}
                    classNamePrefix="custom-select"
                    components={{ Option: CustomOption, MenuList: CustomMenuList }}
                    placeholder={form.storageType ? form.storageType : "Select Storage Type..."}
                  />
          </div>
          <div className="form-group">
            <label htmlFor="servings">vendor</label>
            <Select
                    isSearchable="true"
                    onChange={(e) => updateForm({ vendor: e.value})}
                    options={vendorList}
                    filterOption={createFilter({ ignoreAccents: false })}
                    captureMenuScroll={false}
                    classNamePrefix="custom-select"
                    components={{ Option: CustomOption, MenuList: CustomMenuList }}
                    placeholder={form.vendor ? form.vendor : "Select Vendor..."}
                  />
          </div>
          <div className="form-group">
            <label htmlFor="servings">Order Placed</label>
            <Select
                    isSearchable="true"
                    onChange={(e) => updateForm({ orderPlaced: e.value})}
                    options={yesNoOptions}
                    filterOption={createFilter({ ignoreAccents: false })}
                    captureMenuScroll={false}
                    classNamePrefix="custom-select"
                    components={{ Option: CustomOption, MenuList: CustomMenuList }}
                    placeholder={form.orderPlaced ? form.orderPlaced : "Select yes if an order has been placed..."}
                  />
          </div>
          <div className="form-group">
            <label htmlFor="recipeName">Expected Delivery Date</label>
            <input
              type="text"
              className="form-control"
              id="recipeName"
              value={form.expectedDelivery}
              onChange={(e) => updateForm({ expectedDelivery: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">Inventory on hand</label>
            <input
              type="number"
              className="form-control"
              id="servings"
              value={form.inventoryOnHand}
              onChange={(e) => updateForm({ inventoryOnHand: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">Delivered</label>
            <Select
                    isSearchable="true"
                    onChange={(e) => updateForm({ isDelivered: e.value})}
                    options={yesNoOptions}
                    filterOption={createFilter({ ignoreAccents: false })}
                    captureMenuScroll={false}
                    classNamePrefix="custom-select"
                    components={{ Option: CustomOption, MenuList: CustomMenuList }}
                    placeholder={form.isDelivered ? form.isDelivered : "Select yes is order has been delivered..."}
                  />
          </div>
        </form>
      </div>
    </div>
  </div>
 );
}
