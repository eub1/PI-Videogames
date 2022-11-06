import './App.css';
import React from 'react';
import { Route, Switch } from "react-router-dom"; // Switch -> se va a mover solo dentro de lo que envuelve el switch, para no ir a una ruta que no existe y quedarse en el error, vuelve a la ultima en la que estuvo
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import Pagination from './components/Pagination/Pagination'
import VideogameCard from './components/VideogameCard/VideogameCard';
import VideogameCreate from './components/VideogameCreate/VideogameCreate';
import VideogameDetail from './components/VideogameDetail/VideogameDetail';



function App() {
  return (
    <div className="App">
      <Route path='/' component={Nav}/>
      <Route exact path='/' component={LandingPage} />
      <Switch>
      <Route exact path='/home' component={Home} />
      <Route exact path='/videogames' component={VideogameCard} />
      <Route exact path='/pagination' component={Pagination} />
      <Route exact path='/create' component={VideogameCreate} />
      <Route
        exact path="/videogame/:id"
        render={({ match }) => <VideogameDetail id={match.params.id} />}
      />
      </Switch>
    </div>
  );
}

export default App;
