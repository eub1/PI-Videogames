import React from 'react';
import {Link} from 'react-router-dom';
import s from "./LandingPage.module.css";
// import Logo from '../../../../videogame.png'

export default function LandingPage(){
  return(
    <div className={s.background_Landing}>
    <h1>Welcome!</h1>
    <h3>This is my SPA proyect, using PostgresSQL, Node JS, Express, React-Redux and JavaScript</h3>
    <Link to='/home'>
    <button id={s.button_Landing}>Begin...</button>
    </Link>
    </div>
  )
};