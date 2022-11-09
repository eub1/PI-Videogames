import React from 'react';
import {Link} from 'react-router-dom';
import s from "./LandingPage.module.css";
// import Logo from '../../../../videogame.png'

export default function LandingPage(){
  return(
    <div className={s.background_Landing}>
    
    <Link to='/home'>
    <button id={s.button_Landing}>Begin...</button>
    </Link>
    <div className={s.landing_message}>
    <h3>Welcome!</h3>
    <h3>This is my SPA proyect, using PostgresSQL, Node JS, Express, React-Redux and JavaScript</h3>
    </div>
    </div>
  )
};