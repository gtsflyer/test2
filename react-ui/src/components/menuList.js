import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, Button } from 'react-bootstrap';

function Menu() {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  // This method fetches the records from the database.
  useEffect(() => {
    async function getMenus() {
    alert(process.env.REACT_APP_BASE_URL_LOCAL);
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

    const data = await response.json( );

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
