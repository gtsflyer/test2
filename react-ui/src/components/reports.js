import React, { useEffect, useState } from "react";
import allIngredients from "./ingredientList.json";
import Select, { createFilter } from "react-select";
import CsvDownload from 'react-json-to-csv'
import 'bootstrap/dist/css/bootstrap.css';
  
export default function Reports() {
  const [menus, setMenus] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [displayedReport, setDisplayedReport] = useState([]);

  const dollarFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 0
  })

  // These methods will update the state properties.
 function updateSelectedReport(value) {
   return setDisplayedReport(eval(value));
  }

  const reportSelectionList = [
    {"value": "allOrders", "label": "All items in the order with combined quantity based on menus"},
    {"value": "breakfastOrders", "label": "Order list for Breakfast"},
    {"value": "lunchOrders", "label": "Order list for Lunch"},
    {"value": "dinnerOrders", "label": "Order list for Dinner"},
    {"value": "tuesdayOrders", "label": "Order list for Tuesday"},
    {"value": "wednesdayOrders", "label": "Order list for Wednesday"},
    {"value": "thursdayOrders", "label": "Order list for Thursday"},
    {"value": "fridayOrders", "label": "Order list for Friday"},
    {"value": "saturdayOrders", "label": "Order list for Saturday"},
    {"value": "sundayOrders", "label": "Order list for Sunday"},

    {"value": "usFoodsOrders", "label": "Order list for US Foods"},
    {"value": "schencksOrders", "label": "Order list for Schencks"},
    {"value": "groceryOrders", "label": "Order list for Grocery Store"},

    {"value": "shelfStableOrders", "label": "Order list for Shelf Stable Items"},
    {"value": "refrigeratedOrders", "label": "Order list for Refrigerated Items"},
    {"value": "frozenOrders", "label": "Order list for Frozen Items"}    
  ];

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

//for each menu item, get the list of recipies.
//for each recipe in the menu get each ingredient and per serving quantity.
//multiply the per serving quantity by the menu servings

var orderReport = []
menus.map(menu => {
  menu.recipeList.map(menuRecipe => {
    recipes.filter(name => name.recipeName === menuRecipe.recipeName).map(recipe2 => {
      recipe2.ingredientList.map(ingredient => {
        allIngredients.filter(ingredientDetails => ingredientDetails.name === ingredient.ingredient).map(filteredIngredient => {
          var reportEntry = 
            {
              "itemNumber" : filteredIngredient.itemNumber,
              "name" : filteredIngredient.name,
              "menuDay" : menu.menuDay,
              "menuMeal" : menu.menuMeal,
              "amountNeeded" : (ingredient.quantity / recipe2.servings) * menuRecipe.serving,
              "minimumOrder" : filteredIngredient.amount * filteredIngredient.amountPerPack,
              "quantityType" : ingredient.quantityType,
              "price" : filteredIngredient.price,
              "vendor" : filteredIngredient.vendor,
              "storageType" : filteredIngredient.storageType
            };
            orderReport = orderReport.concat([reportEntry]);
          });
        });
      });
    });
  });

  var allOrders = [];
  orderReport.reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      allOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var breakfastOrders = [];
  orderReport.filter(order => order.menuMeal === "Breakfast")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      breakfastOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var lunchOrders = [];
  orderReport.filter(order => order.menuMeal === "Lunch")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      lunchOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var dinnerOrders = [];
  orderReport.filter(order => order.menuMeal === "Dinner")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      dinnerOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var tuesdayOrders = [];
  orderReport.filter(order => order.menuDay === "Tuesday")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      tuesdayOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var wednesdayOrders = [];
  orderReport.filter(order => order.menuDay === "Wednesday")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      wednesdayOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});
  
  var thursdayOrders = [];
  orderReport.filter(order => order.menuDay === "Thursday")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      thursdayOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var fridayOrders = [];
  orderReport.filter(order => order.menuDay === "Friday")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      fridayOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var saturdayOrders = [];
  orderReport.filter(order => order.menuDay === "Saturday")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      saturdayOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var sundayOrders = [];
  orderReport.filter(order => order.menuDay === "Sunday")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      sundayOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var usFoodsOrders = [];
  orderReport.filter(order => order.vendor === "US Foods")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      usFoodsOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var schencksOrders = [];
  orderReport.filter(order => order.vendor === "Schenk's")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      schencksOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var groceryOrders = [];
  orderReport.filter(order => order.vendor === "Grocery")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      groceryOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});
  
  var shelfStableOrders = [];
  orderReport.filter(order => order.storageType === "Shelf Stable")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      shelfStableOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var refrigeratedOrders = [];
  orderReport.filter(order => order.storageType === "Refrigerator")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      refrigeratedOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  var frozenOrders = [];
  orderReport.filter(order => order.storageType === "Frozen")
  .reduce(function(res, value) {
    if (!res[value.name]) {
      res[value.name] = { 
        itemNumber: value.itemNumber,
        name: value.name,
        menuDay: value.menuDay,
        menuMeal: value.menuMeal,
        amountNeeded: 0,
        minimumOrder: value.minimumOrder,
        quantityType: value.quantityType,
        price: value.price,
        vendor: value.vendor,
        storageType: value.storageType
      };
      frozenOrders.push(res[value.name])
    }
    res[value.name].amountNeeded += value.amountNeeded;
    return res;
  }, {});

  return (
    <div class="container" style={{ display: 'block', width: '100%', padding: 30, align: 'center' }}>
      <CsvDownload 
        data={allIngredients}
        filename={`completeInventory.csv`}
        style={{ //pass other props, like styles
          display:"inline-block",
          fontSize:"15px",
          fontWeight:"bold",
          padding:"6px 24px",
          textDecoration:"none",
          textShadow:"0px 1px 0px #9b14b3"
          }}
      >
        Download All Ingredients ⬇️
      </CsvDownload>
      <br></br><br></br>
      <Select
        placeholder={"Choose a Report"}
        name="reportSelector"
        onChange={(e) => updateSelectedReport(e.value)}
        classNamePrefix="custom-select"
        options={reportSelectionList}
      >
      </Select>
      <br></br>
        <CsvDownload 
          data={displayedReport}
          filename={`campmeetingReport${Date.now()}.csv`}
          style={{ //pass other props, like styles
            display:"inline-block",
            fontSize:"15px",
            fontWeight:"bold",
            padding:"6px 24px",
            textDecoration:"none",
            textShadow:"0px 1px 0px #9b14b3"
            }}
        >
          Download Report ⬇️
        </CsvDownload>
      <br></br>
      <br></br>
      <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Menu Day</th>
          <th>Menu Meal</th>
          <th>Amount Needed</th>
          <th>Minimum Order Quantity</th>
          <th>Quantity Type</th>
          <th>Price</th>
        </tr>
        {displayedReport.map(function(item, key) {
          return (
            <tr key = {key}>
              <td>{item.name}</td>
              <td>{item.menuDay}</td>
              <td>{item.menuMeal}</td>
              <td>{formatter.format(item.amountNeeded)}</td>
              <td>{item.minimumOrder}</td>
              <td>{item.quantityType}</td>
              <td>{dollarFormatter.format(item.price)}</td>
            </tr>
          )
        })}</tbody>
       </table>
    </div>
  );
}