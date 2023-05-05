import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Select, { createFilter } from "react-select";
import { Button } from 'react-bootstrap';
import CustomOption from "./customOption";
import CustomMenuList from "./CustomMenuList";
import "./customOptions.css";

function Ingredients() {
  const navigate = useNavigate();
  const [ingredientList, setIngredients] = useState([]);

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
}, [ingredientList.length]);

// This function will handle the submission.
  async function deleteIngredient(e, id) {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/deleteIngredient/${id}`, {
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

  async function resetAllIngredients(e){
    e.preventDefault();

    ingredientList.map(ingredientListItem => {
      ingredientListItem.orderPlaced = "";
      ingredientListItem.expectedDelivery = "";
      ingredientListItem.inventoryOnHand = "";
      ingredientListItem.isDelivered = "No";

      // This will send a post request to update the data in the database.
      fetch(`${process.env.REACT_APP_BASE_URL_LOCAL}/updateIngredient/${ingredientListItem._id}`, {
        method: "POST",
        body: JSON.stringify(ingredientListItem),
        headers: {
          'Content-Type': 'application/json'
        },
      }).catch(error => {
        window.alert(error);
      })
    })
  };

  const ingredientSearchList = ingredientList.map(ingredientListItem => {
    return{ 
        value: `${ingredientListItem._id}`,
        label: `${ingredientListItem.name}` 
    }
});

let updateSelectbox = (value) => {
  navigate(`/editIngredient/${value}`);
 }

  return (
    <div class="container">
      <div class="row">
        {ingredientList.length > 0 ? 
        <div className="form-group">
          <label htmlFor="servings">Select an ingredient to update</label>
          <Select
            isSearchable="true"
            onChange={(e) => updateSelectbox(e.value)}
            options={ingredientSearchList}
            filterOption={createFilter({ ignoreAccents: false })}
            captureMenuScroll={false}
            classNamePrefix="custom-select"
            components={{ Option: CustomOption, MenuList: CustomMenuList }}
            placeholder={"Select Ingredient..."}
          />
        </div>
        :
        <center>Please create an ingredient</center>
        }
      </div>
        <div class="row">
          <div class="col">
            <label htmlFor="servings">&nbsp;</label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div className="form-group">
              <Button href="/createIngredient">➕ Create a New Ingredient</Button>
              <Button onClick={resetAllIngredients}>Reset all ingredients</Button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Ingredients;
