import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Nav from './Nav';
import RecipeList from './components/recipeList';
import CreateRecipe from './components/createRecipe';
import EditRecipe from './components/editRecipe';
import MenuList from './components/menuList';
import CreateMenu from './components/createMenu';
import EditMenu from './components/editMenu';
import Reports from './components/reports';
import IngredientList from './components/ingredientList';
import CreateIngredient from './components/createIngredient';
import EditIngredient from './components/editIngredient';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Nav />
      <Routes>
          <Route path='/' element={<App />} />
          <Route path='/recipeList' element={<RecipeList />} />
          <Route path='/createRecipe' element={<CreateRecipe />} />
          <Route path='/editRecipe/:id' element={<EditRecipe />} />
          <Route path='/menuList' element={<MenuList />} />
          <Route path='/createMenu' element={<CreateMenu />} />
          <Route path='/editMenu/:id' element={<EditMenu />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/ingredientList' element={<IngredientList />} />
          <Route path='/createIngredient' element={<CreateIngredient />} />
          <Route path='/editIngredient' element={<EditIngredient />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
