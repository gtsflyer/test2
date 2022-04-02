import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar} from 'react-bootstrap';
  
export default function Nav() {
  return (
    <div class="container" style={{ display: 'block', width: 700, padding: 30, align: 'center' }}>
      <h4>Camp Meeting Menu Planner</h4>
      <Navbar>
        <Navbar.Brand href="/">
            Home
        </Navbar.Brand>
        <Navbar.Brand href="/recipeList">
            Recipes
        </Navbar.Brand>
        <Navbar.Brand href="/menuList">
            Menu
        </Navbar.Brand>
        <Navbar.Brand href="/reports">
            Reports
        </Navbar.Brand>
      </Navbar> 
    </div>
  );
}