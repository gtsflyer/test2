import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [allIngredients, setIngredients] = useState([]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

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

  async function updateAllPrices(e){
    e.preventDefault();

    recipes.map(recipe => {
      recipe.ingredientList.map(recipeIngredient => {
        allIngredients.filter(ingredientDetails => ingredientDetails.name === recipeIngredient.ingredient).map(filteredIngredient => {
          recipeIngredient.price = filteredIngredient.price;
        })
      })

      // This will send a post request to update the data in the database.
      fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/updateRecipe/${recipe._id}`, {
        method: "POST",
        body: JSON.stringify(recipe),
        headers: {
          'Content-Type': 'application/json'
        },
      }).catch(error => {
        window.alert(error);
      })

      window.location.reload(true);
      // alert(JSON.stringify(recipe))
    })
  };

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
              <Card style={{ width: '24rem' }}>
                <Card.Img class="mx-auto" variant="top" style={{ width: '12rem' }} src="Recipe.png" />
                <Card.Body>
                  <Card.Title class="text-center"><h3>{recipe.recipeName}</h3></Card.Title>
                  <Card.Text>
                    <ul>
                      {recipe.ingredientList.map(ingredient => {
                        return <li>{ingredient.quantity} {ingredient.quantityType} of {ingredient.ingredient} </li>;
                      })}
                    </ul>
                    Serves: {recipe.servings}<br />
                    Recipe Cost Per Serving: {formatter.format(recipe.ingredientList.reduce((ingTotal,ingredient) => ingTotal = ingTotal + (ingredient.quantity * ingredient.price),0) / recipe.servings)}
                  </Card.Text>
                  <div class="card-footer text-left">
                  <div class="mx-auto p-1 d-inline-block"><Button href={'/editRecipe/'+recipe._id} class="btn btn-primary">✏️ Edit {recipe.recipeName}</Button></div>
                  <div class="mx-auto p-1 d-inline-block"><Button onClick={e => deleteRecipe(e, recipe._id)} class="btn btn-primary">⛔ Delete</Button></div>
                </div>
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
            <br></br><br></br>
            <Button onClick={updateAllPrices}>Update all prices</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipes;
