const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the recipes.
recordRoutes.route("/recipes").get(function (req, res) {
  let db_connect = dbo.getDb("kitchen");
  db_connect
    .collection("recipes")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a list of all the menus.
recordRoutes.route("/menus").get(function (req, res) {
    let db_connect = dbo.getDb("kitchen");
    db_connect
      .collection("menus")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

// This section will help you get a single recipe by id
recordRoutes.route("/recipes/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("recipes")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
  });

// This section will help you get a single menu by id
recordRoutes.route("/menus/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("menus")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new recipe.
recordRoutes.route("/recipes/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    recipeName: req.body.recipeName,
    ingredientList: req.body.ingredientList,
    servings: req.body.servings,
  };
  db_connect.collection("recipes").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});



// This section will help you create a new menu.
recordRoutes.route("/menus/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        menuDay: req.body.menuDay,
        menuMeal: req.body.menuMeal,
        recipeList: req.body.recipeList,
    };
    db_connect.collection("menus").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

// This section will help you update a recipe by id.
recordRoutes.route("/updateRecipe/:id").post(function (req, response) {
    console.log("trying to update:");
    console.log(req);
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
      $set: {
        recipeName: req.body.recipeName,
        ingredientList: req.body.ingredientList,
        servings: req.body.servings,
      },
    };
    db_connect
      .collection("recipes")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 recipe updated");
        response.json(res);
      });
  });

// This section will help you update a menu by id.
recordRoutes.route("/updateMenu/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
        menuDay: req.body.menuDay,
        menuMeal: req.body.menuMeal,
        recipeList: req.body.recipeList,
    },
  };
  db_connect
    .collection("menus")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 menu updated");
      response.json(res);
    });
});

// This section will help you delete a recipe
recordRoutes.route("/deleteRecipe/:id").delete((req, response) => {
  console.log("trying to delete:");
  console.log(req);
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("recipes").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 recipe deleted");
    response.json(obj);
  });
});

// This section will help you delete a menu
recordRoutes.route("/deleteMenu/:id").delete((req, response) => {
    console.log("trying to delete:");
    console.log(req);
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("menus").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 menu deleted");
      response.json(obj);
    });
  });

module.exports = recordRoutes;