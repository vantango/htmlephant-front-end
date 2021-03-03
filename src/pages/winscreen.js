import React from "react";
import store from "../config/store";
import API from "../utils/API";
import { useHistory, useLocation } from "react-router-dom";
import "./winscreen.css";

function WinScreen() {

  let location = useLocation();
  console.log(location.pathname)
  store.dispatch({
      type: 'CHANGE_LOCATION',
      payload: {
          location: location.pathname
      }
  })

  let history = useHistory()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = store.getState().user.id;
    const token = store.getState().user.token;
    API.levelUp(id, token).then((res) => {
      store.dispatch({
        type: "USER_ACTION",
        payload: {
          ...store.getState().user,
          key: 0,
          level: store.getState().user.level + 1,
          question1: false,
          question2: false,
          question3: false,
          encounter: 0
        },
      });
    });

    store.dispatch({
      type: "SHOW_MODAL",
      payload: {
        show: false
      }
    })

    history.push("/game");
  };
  return (
    <div className="game-wrapper">
      <div className="menu-select rpgui-container framed">
        <label>Wizards and Whiteboards</label>
        <h1> Congratulations!</h1>
        <h2>
          Nice work! Snaps to you, and good luck on the next challenge!
        </h2>
        <button id="submitBtn" type="submit" value="Save Game" className="rpgui-button" onClick={handleSubmit} >Submit</button>
      </div>
    </div>
  );
}

export default WinScreen;
