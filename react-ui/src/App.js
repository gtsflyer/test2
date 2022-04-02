import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

function App() {
  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Edit Recipes</Card.Title>
              <Card.Text>
                Use available items to create a recipe.
                <a href="/recipeList" class="stretched-link"></a>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
    
  );
}

export default App;
