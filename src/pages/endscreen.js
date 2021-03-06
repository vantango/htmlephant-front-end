import React from "react";
import store from "../config/store";
import API from "../utils/API";
import { useHistory, useLocation } from "react-router-dom";
import "./pages.css";
import Sound from "../features/sound";
import bass_clef_black from "./imgs/bass_clef_black.png"
import bass_clef_blue from "./imgs/bass_clef_blue.png"

function Endscreen() {
  let history = useHistory();

  let location = useLocation();
  console.log(location.pathname);
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
    console.log(`ID: ${id}`);
    console.log("===================================");
    console.log(`Token: ${token}`);
    console.log("===================================");
    API.resetLevel(id, token)
      .then((res) => {
        console.log(`Here's what we get back: ${JSON.stringify(res)}`);
        console.log("===================================");
        store.dispatch({
          type: "USER_ACTION",
          payload: {
            ...store.getState().user,
            key: 0,
            level: 1,
            question1: false,
            question2: false,
            question3: false,
            encounter: 0,
          },
        });
      })
      .catch((err) => {
        err
          ? console.log(`Due to your idiocy, ${err}`)
          : console.log("Success!");
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
        <h1 style={{ fontSize: "250%" }}> Congratulations!</h1>
        <h2>
          Hey, nice job! Just think, three months ago you'd never even see an
          HTML tag, and just look at you now! As a prize for completing the
          final challenge, I present you with the ultimate gift: A joe.joe email
          address. Go forth and always be coding.
        </h2>
        <div className="music-plug">
        <a href={link} target="blank">
          <img
            className="bass-clef"
            src={bass_clef_black}
            alt="Link to music by Tyler Baldwin"
          />
        </a>
      </div>
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
  );
}

export default Endscreen;
