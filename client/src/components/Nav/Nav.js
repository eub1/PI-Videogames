import React from 'react';
import {Link} from 'react-router-dom';
import s from './nav.module.css'
// import Logo from '../../../../videogame.png'

const Nav = () => {
  return(
    <div className={s.nav_main}>
    <h1>Este es el Nav</h1>
    <Link to='/home'>Home</Link>
    </div>
  )
}

export default Nav;