import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Form } from 'react-bootstrap';
 
export default function EditMenu() {
 const [recipes, setRecipes] = useState([]);

 // This method fetches the records from the database.
 useEffect(() => {
  async function getRecipes() {
  const response = await fetch("/recipes/");

  if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
  }

  const recipes = await response.json();
  if (recipes.length <= 0) {
      alert("No Recipes Found. You can't create a menu with out first creating some recipes!");
      navigate("/recipes");
  }
  setRecipes(recipes);
  }

  getRecipes();

  return;
}, [recipes.length]);

 const [form, setForm] = useState({
   menuDay: "",
   menuMeal: "",
   recipeList: [{ recipeName: "", serving : ""}]
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`/menus/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/menus");
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
  let newRecipeList = form.recipeList.push({ recipeName: "", serving : ""});
  updateForm(newRecipeList);
  }

  function removeFormFields(i) {
  let newRecipeList = [...form.recipeList];
  newRecipeList.splice(i, 1);
  updateForm({recipeList: newRecipeList})
  }

  let updateRecipe = (i, e) => {
  let newRecipeList = [...form.recipeList];
  newRecipeList[i][e.target.name] = e.target.value;
  updateForm({recipeList: newRecipeList});
  }
  
 async function onSubmit(e) {
   e.preventDefault();
   const editedMenu = { ...form };
 
   // This will send a post request to update the data in the database.
   await fetch(`/updateMenu/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedMenu),
     headers: {
       'Content-Type': 'application/json'
     },
   })
   .catch(error => {
    window.alert(error);
    return;
  });
 
   navigate("/menus");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
  <div class="container">
  <div class="row">
    <div class="col">
    <form onSubmit={onSubmit}>
  <h3>Edit Menu <input
        type="submit"
        value="💾 Save"
        className="btn btn-primary"
      /></h3>
  <div className="form-group">
      <label htmlFor="menuDay">Menu Day</label>
      <Form.Control as="select" placeholder="test" name="menuDay" value={form.menuDay} onChange={(e) => updateForm({ menuDay: e.target.value })}>
          <option disabled selected value> -- select a date -- </option>
          <option value="Tuesday">Tuesday, June 28th</option>
          <option value="Wednesday">Wednesday, June 29th</option>
          <option value="Thursday">Thursday, June 30th</option>
          <option value="Friday">Friday, July 1st</option>
          <option value="Saturday">Saturday, July 2nd</option>
          <option value="Sunday">Sunday, July 3rd</option>
      </Form.Control>
  </div>
  <div className="form-group">
      <label htmlFor="menuMeal">Menu Meal</label>
      <Form.Control as="select" placeholder="test" name="menuMeal" value={form.menuMeal} onChange={(e) => updateForm({ menuMeal: e.target.value })}>
          <option disabled selected value> -- select a meal -- </option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
      </Form.Control>
  </div>
  {form.recipeList.map((recipe, index) => (
      <div className="form-group" key={index}>
      <label htmlFor="recipe">Select Recipe #{index+1}{
           index ? 
           <input
             type="button"
             value="⛔ Remove Recipe"
             className="btn btn-primary"
             onClick={() => removeFormFields(index)}
           />
           : null
         }</label>

      <Form.Control as="select" placeholder="test" name="recipeName" value={form.recipeList[index].recipeName} onChange={(e) => updateRecipe(index, e)}>
          <option disabled selected value> -- select a recipe -- </option>
          {recipes.map(recipeItem => {
              return <option value={recipeItem.recipeName}>{recipeItem.recipeName}</option>;
          })}
          </Form.Control>
          <label htmlFor="serving" className="form-check-label">Input planned servings</label>
          <input
          type="number"
          className="form-control"
          name="serving"
          value={recipe.serving}
          onChange={(e) => updateRecipe(index, e)}
          />
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
      value="Additional Recipe"
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