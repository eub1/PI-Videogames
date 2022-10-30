import './App.css';
import React from 'react';
import { Route } from "react-router-dom"; // Switch
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
      <h1>Henry Videogames</h1>
      <Route path='/' component={Nav}/>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/videogames' component={VideogameCard} />
      <Route exact path='/pagination' component={Pagination} />
      <Route exact path='/create' component={VideogameCreate} />
      <Route
        path="/videogame/:id"
        render={({ match }) => <VideogameDetail id={match.params.id} />}
      />
    </div>
  );
}

export default App;
