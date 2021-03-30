import React from "react";
import store from "../config/store";
import API from "../utils/API";
import { useHistory, useLocation } from "react-router-dom";
import "./winscreen.css";
import Sound from '../features/sound'
import bass_clef_black from "./imgs/bass_clef_black.png"


function WinScreen() {

  let location = useLocation();
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
          keys: 0,
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

  const handleHome = () => {
    history.push("/")
  }

  let links = [
    "https://instagram.com/mutemusic64?igshid=ybongwu1z9kh",
    "https://youtube.com/channel/UCWmvXyNvEgJneHaQLco6a3Q",
    "https://mutemusic64.bandcamp.com/album/h-xan"
  ]

  var randomSite = Math.random() * links.length;
  randomSite = parseInt(randomSite, 10);
  let link = links[randomSite];

  return (
    <div className="game-wrapper">
      <Sound />
      <div className="menu-select rpgui-container framed">
        <h1>Wizards and Whiteboards</h1>
        <h1 style={{ fontSize: '250%' }} id="congrats"> Congratulations!</h1>
        <h2 id="nice">
          Nice work! Snaps to you, and good luck on the next challenge!
        </h2>
        <div className="stupid">
          <div className="music-plug">
            <a href={link} target="blank"><img className="bass-clef" id="bass-clef" src={bass_clef_black} alt="Link to music by Tyler Baldwin" /></a>
          </div>
          <div className="win-buttons">
            <button id="submitBtn" type="submit" value="Save Game" className="rpgui-button" onClick={handleSubmit} >Next Level</button>
            <button id="submitBtn" type="submit" value="Save Game" className="rpgui-button" onClick={handleHome} >Go Home</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default WinScreen;
