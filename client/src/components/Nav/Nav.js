import React from 'react';
import {Link} from 'react-router-dom';
// import Logo from '../../../../videogame.png'

const Nav = () => {
  return(
    <>
    <h1>Este es el Nav</h1>
    <Link to='/home'>Home</Link>
    </>
  )
}

export default Nav;