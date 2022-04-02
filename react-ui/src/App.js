import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

function App() {
  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card" style={{ width: '18rem' }}>
            <div class="card-img" variant="top" style={{ width: '12rem' }} src="Recipe.png" />
            <div class="card-body">
              <div class="card-title">Edit Recipes</div>
              <div class="card-text">
                Use available items to create a recipe.
                <a href="/recipeList" class="stretched-link"></a>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card" style={{ width: '18rem' }}>
            <div class="card-img" variant="top" style={{ width: '18rem' }} src="Menu.png" />
            <div class="card-body">
              <div class="card-title"e>Edit Menu</div>
              <div class="card-text">
                Select specific recipe to be served for meals.
                <a href="/menuList" class="stretched-link"></a>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card" style={{ width: '18rem' }}>
            <div class="card-img" variant="top" style={{ width: '15rem' }} src="Reports.jpg" />
            <div class="card-body">
              <div class="card-title">Run Reports</div>
              <div class="card-text">
                Create and print useful reports.
                <a href="/reports" class="stretched-link"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
