import React from 'react'
import {HashRouter, Route, NavLink} from 'react-router-dom';
import './App.css';
import FeaturedProducts from './FeaturedProducts';
import Product from './Product';
function App() {
  return(
    <div>
      <HashRouter>
        <div>
          <Route exact path="/home" component={FeaturedProducts}/>
          <Route exact path='/product/:id' component = {Product}/>
        </div>
      </HashRouter>
    </div>
  )
}

export default App;
