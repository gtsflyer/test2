import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Nav from './Nav';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import RecipeList from './components/recipeList';
import CreateRecipe from './components/createRecipe';
import EditRecipe from './components/editRecipe';
import MenuList from './components/menuList';
import CreateMenu from './components/createMenu';
import EditMenu from './components/editMenu';
import Reports from './components/reports';

import reportWebVitals from './reportWebVitals';

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
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
