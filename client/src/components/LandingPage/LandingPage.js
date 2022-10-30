import React from 'react';
import {Link} from 'react-router-dom';
// import Logo from '../../../../videogame.png'

export default function LandingPage(){
  return(
    <>
    <h1>Welcome!</h1>
    {/* <img src={image} alt="img not found"/> */}
    <Link to='/home'>
    <button>Ingresar</button>
    </Link>
    </>
  )
}