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
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
