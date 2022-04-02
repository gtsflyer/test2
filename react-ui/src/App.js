import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

function App() {
  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" style={{ width: '12rem' }} src="Recipe.png" />
            <Card.Body>
              <Card.Title>Edit Recipes</Card.Title>
              <Card.Text>
                Use available items to create a recipe.
                <a href="/recipeList" class="stretched-link"></a>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div class="col">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" style={{ width: '18rem' }} src="Menu.png" />
            <Card.Body>
              <Card.Title>Edit Menu</Card.Title>
              <Card.Text>
                Select specific recipe to be served for meals.
                <a href="/menuList" class="stretched-link"></a>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div class="col">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" style={{ width: '15rem' }} src="Reports.jpg" />
            <Card.Body>
              <Card.Title>Run Reports</Card.Title>
              <Card.Text>
                Create and print useful reports.
                <a href="/reports" class="stretched-link"></a>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
    
  );
}

export default App;
