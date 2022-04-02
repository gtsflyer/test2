import React from "react";
import { useNavigate } from "react-router";
import { Form, Card } from 'react-bootstrap';
 
export default function Main() {
 
 
 // This following section will display the form that takes input from the user to update the data.
 return (
  <div class="container">
  <div class="row">
    <div class="col">
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    </div>
  </div>
  </div>
 );
}