import React from 'react';
import {Link} from 'react-router-dom';
// import Logo from '../../../../videogame.png'

export default function LandingPage(){
  return(
    <>
    <h1>Welcome!</h1>
    <Link to='/home'>
    <button>Ingresar</button>
    </Link>
    </>
  )
}