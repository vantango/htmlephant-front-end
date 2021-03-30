import React from "react";
import store from "../config/store";
import API from "../utils/API";
import { useHistory, useLocation } from "react-router-dom";
import "./pages.css";
import "./endscreen.css";
import Sound from "../features/sound";
import bass_clef_black from "./imgs/bass_clef_black.png"
import bass_clef_blue from "./imgs/bass_clef_blue.png"

function Endscreen() {
  let history = useHistory();

  let location = useLocation();
  store.dispatch({
    type: "CHANGE_LOCATION",
    payload: {
      location: location.pathname,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = store.getState().user.id;
    const token = store.getState().user.token;
    API.level1(id, token)
      .then((res) => {
        store.dispatch({
          type: "USER_ACTION",
          payload: {
            ...store.getState().user,
            keys: 0,
            level: 1,
            question1: false,
            question2: false,
            question3: false,
            encounter: 0,
            health: 3
          },
        });
      })
      .catch((err) => {
        err ? console.log(`Due to your idiocy, ${err}`) : console.log("Success!");
      });
    store.dispatch({
      type: "SHOW_MODAL",
      payload: {
        show: false,
      },
    });
    history.push("/game");
  };

  const handleExit = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    store.dispatch({
      type: "USER_ACTION",
      payload: {
        ...store.getState().user,
        name: "",
        password: "",
        key: 0,
        token: "",
        level: 1,
        id: "",
        isLoggedIn: false,
        encounter: 0,
        question1: false,
        question2: false,
        question3: false,
      },
    });
    history.push("/");
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
        <label>Wizards and Whiteboards</label>
        <h1 id="congrats" style={{ fontSize: "250%" }}> Congratulations!</h1>
        <h2 id="nice">
          Hey, nice job! Just think, three months ago you'd never even see an
          HTML tag, and just look at you now! Go forth and always be coding.
        </h2>
        <div className="stupid">
          <div className="music-plug">
            <a href={link} target="blank">
              <img
                className="bass-clef" id="bass-clef"
                src={bass_clef_black}
                alt="Link to music by Tyler Baldwin"
              />
            </a>
          </div>
          <div className="buttons">
            <button
              type="submit"
              className="rpgui-button"
              value="New Game"
              onClick={handleSubmit}
            >
              New Game
            </button>
            <button
              type="submit"
              className="rpgui-button"
              value="Exit"
              onClick={handleExit}
            >
              Exit
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Endscreen;
