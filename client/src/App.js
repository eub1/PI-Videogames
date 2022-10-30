import './App.css';
import React from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage'
import Home from './components/Home';
import Nav from './components/Nav';
import Pagination from './components/Pagination'
import VideogameCard from './components/VideogameCard';
import VideogameCreate from './components/VideogameCreate';
import VideogameDetail from './components/VideogameDetail';



function App() {
  return (
    <div className="App">

      <h1>Henry Videogames</h1>

      <Route path='/'>
        <Nav/>
      </Route>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />

      <Route exact path='/videogames' component={VideogameCard} />

      <Route exact path='/pagination' component={Pagination} />

      <Route exact path='/create' component={VideogameCreate} />

      <Route
        path="/videogames/:id"
        render={({ match }) => <VideogameDetail id={match.params.id} />}
      />

    </div>
  );
}

export default App;
