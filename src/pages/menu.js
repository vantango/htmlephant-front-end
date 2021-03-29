import React, { useState } from "react";
import { Link } from "react-router-dom";

import Sound from '../features/sound'

import "./menu.css";
import { useLocation } from "react-router-dom";
import store from "../config/store";



function Menu() {

  let location = useLocation();
  store.dispatch({
      type: 'CHANGE_LOCATION',
      payload: {
          location: location.pathname
      }
  })

  return (
    <div className= "game-wrapper">
        <Sound />

        <div className="menu-select rpgui-container framed">
            <h1 style={{ fontSize: '250%' }}>Wizards and Whiteboards</h1>
        <Link to={"/load"}>
            <button id="load-game" className="menu-button rpgui-button"  style={{ color: "white" }}>
            Load Game
            </button>
        </Link>
        <Link to={"/new"}>
            <button id="new-game" className="menu-button rpgui-button" style={{ color: "white" }}>
            New Game
            </button>{" "}
        </Link>
        </div>
    </div>
  );
}

export default Menu;
