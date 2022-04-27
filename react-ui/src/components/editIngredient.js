import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Select, { createFilter } from "react-select";
import allIngredients from "./ingredientList.json";
import CustomOption from "./customOption";
import CustomMenuList from "./CustomMenuList";
import "./customOptions.css";

export default function EditInventory() {
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
 const params = useParams();
 const navigate = useNavigate();

 const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

 const searchList = allIngredients.map(ingredientItem => {
    return{ 
     value: `${ingredientItem.name},${ingredientItem.quantityType},${ingredientItem.price}`, 
     label: `${ingredientItem.name} in ${ingredientItem.quantityType} (${formatter.format(ingredientItem.price)} per ${ingredientItem.quantityType})`
    }
   }
  );
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/recipes/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/recipeList");
       return;
     }

     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
//  function addFormFields() {
//   let newIngredientList = form.ingredientList.push({ ingredient: "", quantity: "" , quantityType: "", price: ""});
//   updateForm(newIngredientList);
// }

// function removeFormFields(i) {
//   let newIngredientList = [...form.ingredientList];
//   newIngredientList.splice(i, 1);
//   updateForm({ingredientList: newIngredientList})
// }

//  let updateIngredient = (i, e) => {
//   let newIngredientList = [...form.ingredientList];
//   newIngredientList[i][e.target.name] = e.target.value;
//   updateForm({ingredientList: newIngredientList});
// }

let updateSelectbox = () => {
//  let newIngredientList = [...form.ingredientList];
//  newIngredientList[i]["ingredient"] = e.value.split(',')[0];
//  newIngredientList[i]["quantityType"] = e.value.split(',')[1];
//  newIngredientList[i]["price"] = e.value.split(',')[2];
//  updateForm({ingredientList: newIngredientList});
}
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedIngredient = { ...form };

   // This will send a post request to update the data in the database.
   await fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/updateIngredient/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedIngredient),
     headers: {
       'Content-Type': 'application/json'
     },
   })
   .catch(error => {
    window.alert(error);
    return;
  });
 
   navigate("/reports");
 }

 // This following section will display the form that takes input from the user to update the data.
 return (
  <div class="container">
    <div class="row">
      <div class="col">
        <form onSubmit={onSubmit}>
          <h3>Update Ingredient <input
            type="submit"
            value="💾 Save"
            className="btn btn-primary"
            />
          </h3>
          <div className="form-group">
            <label htmlFor="recipeName">Recipe Name</label>
              <Select
                isSearchable="true"
                onChange={(e) => updateSelectbox()}
                options={searchList}
                filterOption={createFilter({ ignoreAccents: false })}
                captureMenuScroll={false}
                classNamePrefix="custom-select"
                components={{ Option: CustomOption, MenuList: CustomMenuList }}
                placeholder={"Select Ingredient..."}
              />
          </div>
          <div className="form-group">
            <label htmlFor="servings">Item Number</label>
            <input
              type="number"
              className="form-control"
              id="servings"
              value={form.servings}
              onChange={(e) => updateForm({ itemNumber: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">amountPerPack</label>
            <input
              type="number"
              className="form-control"
              id="servings"
              value={form.servings}
              onChange={(e) => updateForm({ amountPerPack: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">amount</label>
            <input
              type="number"
              className="form-control"
              id="servings"
              value={form.servings}
              onChange={(e) => updateForm({ amount: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipeName">quantityType</label>
            <input
              type="text"
              className="form-control"
              id="recipeName"
              value={form.recipeName}
              onChange={(e) => updateForm({ quantityType: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipeName">Name</label>
            <input
              type="text"
              className="form-control"
              id="recipeName"
              value={form.recipeName}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">price</label>
            <input
              type="number"
              className="form-control"
              id="servings"
              value={form.servings}
              onChange={(e) => updateForm({ price: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">storageType</label>
            <Select
                    isSearchable="true"
                    onChange={(e) => updateForm({ storageType: e.target.value})}
                    options={searchList}
                    filterOption={createFilter({ ignoreAccents: false })}
                    captureMenuScroll={false}
                    classNamePrefix="custom-select"
                    components={{ Option: CustomOption, MenuList: CustomMenuList }}
                    placeholder={"Select Storage Type..."}
                  />
          </div>
          <div className="form-group">
            <label htmlFor="servings">vendor</label>
            <Select
                    isSearchable="true"
                    onChange={(e) => updateForm({ vendor: e.target.value})}
                    options={searchList}
                    filterOption={createFilter({ ignoreAccents: false })}
                    captureMenuScroll={false}
                    classNamePrefix="custom-select"
                    components={{ Option: CustomOption, MenuList: CustomMenuList }}
                    placeholder={"Select Vendor..."}
                  />
          </div>
          <div className="form-group">
            <label htmlFor="servings">Order Placed</label>
            <Select
                    isSearchable="true"
                    onChange={(e) => updateForm({ orderPlaced: e.target.value})}
                    options={searchList}
                    filterOption={createFilter({ ignoreAccents: false })}
                    captureMenuScroll={false}
                    classNamePrefix="custom-select"
                    components={{ Option: CustomOption, MenuList: CustomMenuList }}
                    placeholder={"Select yes if an order has been placed..."}
                  />
          </div>
          <div className="form-group">
            <label htmlFor="recipeName">Expected Delivery Date</label>
            <input
              type="text"
              className="form-control"
              id="recipeName"
              value={form.recipeName}
              onChange={(e) => updateForm({ expectedDelivery: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">Inventory on hand</label>
            <input
              type="number"
              className="form-control"
              id="servings"
              value={form.servings}
              onChange={(e) => updateForm({ inventoryOnHand: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servings">Delivered</label>
            <Select
                    isSearchable="true"
                    onChange={(e) => updateForm({ isDelivered: e.target.value})}
                    options={searchList}
                    filterOption={createFilter({ ignoreAccents: false })}
                    captureMenuScroll={false}
                    classNamePrefix="custom-select"
                    components={{ Option: CustomOption, MenuList: CustomMenuList }}
                    placeholder={"Select yes is order has been delivered..."}
                  />
          </div>
        </form>
      </div>
    </div>
  </div>
 );
}
