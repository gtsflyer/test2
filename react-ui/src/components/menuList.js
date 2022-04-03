import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';

function Menu() {
  const [menus, setMenus] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

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

  const menuPrices = menus.map(menu => {
    var priceArray = menu.recipeList.map(recipe => {
      return recipes.filter(name => name.recipeName === recipe.recipeName).map(recipe2 => {
        var pricePerPlate = recipe2.ingredientList.reduce((ingTotal,ingredient) => ingTotal = ingTotal + (ingredient.quantity * ingredient.price), 0) / recipe2.servings;
        return pricePerPlate * recipe.serving;
      })[0]    
    })
    return priceArray
  });

  return (
    <div class="container">
      <div class="row">
        {menus.length > 0 ? menus.map((menu, index) => (     
          <div class="col">
            <Card style={{ width: '24rem' }}>
              <Card.Img class="mx-auto" variant="top" style={{ width: '12rem' }} src="Menu.png" />
              <Card.Body>
                <Card.Title class="text-center"><h3>{menu.menuDay} {menu.menuMeal}</h3></Card.Title>
                <Card.Text>
                  <ul>
                    {menu.recipeList.map((recipe, index2) => {
                      return <li>Serving {recipe.serving} plates of {recipe.recipeName} ({formatter.format(menuPrices[index][index2])})</li>;
                    })}
                  </ul>
                Total Menu Cost: {
                  formatter.format(menuPrices[index].reduce(function (accumVariable, curValue) {
                    return accumVariable + curValue
                    }, 0))
                }
                </Card.Text>
                <div class="card-footer text-left">
                  <div class="mx-auto p-1 d-inline-block"><Button href={'/editMenu/'+menu._id} class="btn btn-primary">✏️ Edit {menu.menuDay} {menu.menuMeal}</Button></div>
                  <div class="mx-auto p-1 d-inline-block"><Button onClick={e => deleteMenu(e, menu._id)} class="btn btn-primary">⛔ Delete</Button></div>
                </div>
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
