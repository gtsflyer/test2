import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
  
export default function Nav() {
  return (
    <div class="container" style={{ display: 'block', width: 700, padding: 30, align: 'center' }}>
      <h4>Camp Meeting Menu Planner</h4>
      <div class="row">
        <a href="/">Home</a>
        <a href="/recipeList">Recipes</a>
        <a href="/menuList">Menu</a>
        <a href="/reports">Reports</a>
      </div> 
    </div>
  );
}