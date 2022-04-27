import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Form } from 'react-bootstrap';
import Select, { createFilter } from "react-select";
import CustomOption from "./customOption";
import CustomMenuList from "./CustomMenuList";
import "./customOptions.css";
 
export default function EditRecipe() {
  const [allIngredients, setIngredients] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getIngredients() {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/ingredients/`);

    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
    }

    const ingredientList = await response.json();
    if (ingredientList.length <= 0) {
    }
    setIngredients(ingredientList);
    }

    getIngredients();

    return;
}, [allIngredients.length]);

 const [form, setForm] = useState({
  recipeName: "",
  ingredientList: [{ ingredient: "", quantity: "", quantityType: "", price: ""}],
  servings: 0,
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
 
 function addFormFields() {
  let newIngredientList = form.ingredientList.push({ ingredient: "", quantity: "" , quantityType: "", price: ""});
  updateForm(newIngredientList);
}

function removeFormFields(i) {
  let newIngredientList = [...form.ingredientList];
  newIngredientList.splice(i, 1);
  updateForm({ingredientList: newIngredientList})
}

 let updateIngredient = (i, e) => {
  let newIngredientList = [...form.ingredientList];
  newIngredientList[i][e.target.name] = e.target.value;
  updateForm({ingredientList: newIngredientList});
}

let updateSelectbox = (i, e) => {
 let newIngredientList = [...form.ingredientList];
 newIngredientList[i]["ingredient"] = e.value.split(',')[0];
 newIngredientList[i]["quantityType"] = e.value.split(',')[1];
 newIngredientList[i]["price"] = e.value.split(',')[2];
 updateForm({ingredientList: newIngredientList});
}
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedRecipe = { ...form };

   // This will send a post request to update the data in the database.
   await fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/updateRecipe/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedRecipe),
     headers: {
       'Content-Type': 'application/json'
     },
   })
   .catch(error => {
    window.alert(error);
    return;
  });
 
   navigate("/recipeList");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
  <div class="container">
      <div class="row">
        <div class="col">
        <form onSubmit={onSubmit}>
  <h3>Update Recipe <input
        type="submit"
        value="💾 Save"
        className="btn btn-primary"
      /></h3>
    <div className="form-group">
      <label htmlFor="recipeName">Recipe Name</label>
      <input
        type="text"
        className="form-control"
        id="recipeName"
        value={form.recipeName}
        onChange={(e) => updateForm({ recipeName: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label htmlFor="servings">Number of people served</label>
      <input
        type="number"
        className="form-control"
        id="servings"
        value={form.servings}
        onChange={(e) => updateForm({ servings: e.target.value })}
      />
    </div>
    {form.ingredientList.map((ingredient, index) => (
     <div className="form-group" key={index}>
     <Form>
       <label htmlFor="ingredient">Select Ingredient #{index+1}
       {
           index ? 
           <input
             type="button"
             value="⛔ Remove Ingredient"
             className="btn btn-primary"
             onClick={() => removeFormFields(index)}
           />
           : null
         }</label>
       <Select
              isSearchable="true"
              onChange={(e) => updateSelectbox(index, e)}
              options={searchList}
              filterOption={createFilter({ ignoreAccents: false })}
              captureMenuScroll={false}
              classNamePrefix="custom-select"
              components={{ Option: CustomOption, MenuList: CustomMenuList }}
              placeholder={form.ingredientList[index].ingredient ? `${form.ingredientList[index].ingredient} in ${form.ingredientList[index].quantityType} (${formatter.format(form.ingredientList[index].price)} per ${form.ingredientList[index].quantityType})` : "Select Ingredient..."}
            />
         <label htmlFor="quantity" className="form-check-label">Input Quantity</label>
         <input
           type="number"
           className="form-control"
           name="quantity"
           value={ingredient.quantity}
           onChange={(e) => updateIngredient(index, e)}
         />
       </Form>
     </div>
    ))}
    <div className="form-group" style={{
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    color: '#AAAAAA',
    padding: 10,
  }}>
      <input
        type="button"
        value="Add Additional Ingredient"
        className="btn btn-primary"
        onClick={() => addFormFields()}
      />
    </div>
  </form>
  </div>
      </div>
    </div>
 );
}
