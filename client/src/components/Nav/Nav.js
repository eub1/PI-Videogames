import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar";
import s from './Nav.module.css'
// import Logo from '../../../../videogame.png'

const Nav = () => {
  return(
    <div className={s.nav_main}>
    <Link to='/home'> <button>Home</button> </Link>
    <SearchBar/>
    <Link to='/create'><button>Create New Videogame</button>  </Link>
    </div>
  )
}

export default Nav;