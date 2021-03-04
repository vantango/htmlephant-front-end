import React from "react";
import store from "../config/store";
import API from "../utils/API";
import { useHistory, useLocation } from "react-router-dom";
import "./winscreen.css";
import Sound from '../features/sound'
import bass_clef_black from "./imgs/bass_clef_black.png"
import bass_clef_blue from "./imgs/bass_clef_blue.png"


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
        <h1 style={{ fontSize: '250%'}}> Congratulations!</h1>
        <h2>
          Nice work! Snaps to you, and good luck on the next challenge!
        </h2>
        <div className="music-plug">
      <a href={link} target="blank"><img className="bass-clef" src={bass_clef_black} alt="Link to music by Tyler Baldwin" /></a>
      </div>
        <button id="submitBtn" type="submit" value="Save Game" className="rpgui-button" onClick={handleSubmit} >Submit</button>
      </div>
     
    </div>
  );
}

export default WinScreen;
