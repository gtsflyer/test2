import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';

function Menu() {
  const [menus, setMenus] = useState([]);
  const [recipes, setRecipes] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getMenus() {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/menus/`);

    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
    }

    const menus = await response.json();
    if (menus.length <= 0) {
        //alert("No Menus Found");
    }
    setMenus(menus);
    }

    getMenus();

    return;
}, [menus.length]);

// This method fetches the records from the database.
useEffect(() => {
  async function getRecipes() {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/recipes/`);

  if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
  }

  const recipes = await response.json();
  setRecipes(recipes);
  }

  getRecipes();

  return;
}, [recipes.length]);

// This function will handle the submission.
  async function deleteMenu(e, id) {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/deleteMenu/${id}`, {
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
    <div class="container">
      <div class="row">
        {menus.length > 0 ? menus.map(menu => (     
          <div class="col">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" style={{ width: '12rem' }} src="Menu.png" />
              <Card.Body>
                <Card.Title>{menu.menuDay} {menu.menuMeal} <Button onClick={e => deleteMenu(e, menu._id)} class="btn btn-primary">⛔ Delete</Button></Card.Title>
                <Card.Text>
                  <ul>
                    {menu.recipeList.map(recipe => {
                      return <li>Serving {recipe.serving} plates of {recipe.recipeName}</li>;
                    })}
                  </ul>
                  <a href={'/editMenu/'+menu._id} class="btn btn-primary">✏️ Edit {menu.menuDay} {menu.menuMeal}</a>
                </Card.Text>
                Menu Cost Per Plate: {JSON.stringify(
                  menu.recipeList.map(recipe => {
                    recipes.filter(recipeName => recipeName === recipe.recipeName)
        
                    //.ingredientList.reduce((ingTotal,ingredient) => ingTotal = ingTotal + (ingredient.quantity * ingredient.price), 0)
                  }))
                }

                Total Menu Cost: {
                }
              </Card.Body>
            </Card>
          </div>
        ))
        :
        <center>Please create a menu</center>
        }
      </div>
        <div class="row">
          <div class="col">
            <Button href="/createMenu">➕ Add a new Menu</Button>
          </div>
        </div>
    </div>
  );
}

export default Menu;
