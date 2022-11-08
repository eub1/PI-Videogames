import React from 'react';
import {Link} from 'react-router-dom';
import s from "./LandingPage.module.css";
// import Logo from '../../../../videogame.png'

export default function LandingPage(){
  return(
    <div className={s.background_Landing}>
    <h1>Welcome!</h1>
    {/* <img src={image} alt="img not found"/> */}
    <Link to='/home'>
    <button id={s.button_Landing}>Begin...</button>
    </Link>
    </div>
  )
};