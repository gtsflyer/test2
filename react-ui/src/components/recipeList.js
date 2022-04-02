import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/recipes/`);

    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
    }

    const recipes = await response.json();
    if (recipes.length <= 0) {
        //alert("No Recipes Found");
    }
    setRecipes(recipes);
    }

    getRecipes();
    
    return;
}, [recipes.length]);

// This function will handle the submission.
async function deleteRecipe(e, id) {
  e.preventDefault();

  const response = await fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/deleteRecipe/${id}`, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: null
  });

  if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
  }

  window.location.reload(true);
};

  return (
    <>
      <div class="container">
        <div class="row">
          {recipes.length > 0 ? recipes.map(recipe => (     
            <div class="col">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" style={{ width: '12rem' }} src="Recipe.png" />
                <Card.Body>
                  <Card.Title>{recipe.recipeName} <Button onClick={e => deleteRecipe(e, recipe._id)} class="btn btn-primary">⛔ Delete</Button></Card.Title>
                  <Card.Text>
                    <ul>
                      {recipe.ingredientList.map(ingredient => {
                        return <li>{ingredient.quantity} {ingredient.quantityType} of {ingredient.ingredient} </li>;
                      })}
                    </ul>
                    Serves: {recipe.servings}<br />
                    <a href={'/editRecipe/'+recipe._id} class="btn btn-primary">✏️ Edit {recipe.recipeName}</a><br />
                  </Card.Text>
                  Total recipe cost: {recipe.ingredientList.reduce((ingTotal,ingredient) => ingTotal = ingTotal + (ingredient.quantity * ingredient.price),0)}
                </Card.Body>
              </Card>
            </div>
          ))
          : 
          <center>Please create a recipe</center>
          }
        </div>
        <div class="row">
          <div class="col">
            <Button href="/createRecipe">➕ Add a new Recipe</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipes;
