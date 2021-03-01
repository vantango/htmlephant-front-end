import React, { useState } from "react";
import store from "../config/store";
import API from "../utils/API";
import "./pages.css";

function WinScreen() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = store.getState().user._id;
    const token = store.getState().user.token;
    API.levelUp(id, token).then((res) => {
      store.dispatch({
        type: "USER_ACTION",
        payload: {
          ...store.getState().user,
          key: 0,
          level: store.getState().user.level + 1,
        },
      });
    });
  };
  return (
    <div className="game-wrapper">
      <div className="menu-select">
        <label>Wizards and Whiteboards</label>
        <h1> Congratulations!</h1>
        <h2>
        Despite your idiocy, you have conquered all my challenges. You live to walk another day, and for the love of god, don't waste it.
        </h2>
        <input type="submit" value="Save Game" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default WinScreen;
