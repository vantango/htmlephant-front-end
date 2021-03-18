import React, { useState } from "react";
import store from "../config/store";
import { useHistory, useLocation } from "react-router-dom";
import API from "../utils/API";
import "./loadgame.css"
import { ToastContainer, toast } from 'react-toastify'
import Sound from '../features/sound'
import back_arrow from "./imgs/back_arrow.png"


import 'react-toastify/dist/ReactToastify.css'

function LoadGame() {

  let location = useLocation();
  console.log(location.pathname)
  store.dispatch({
    type: 'CHANGE_LOCATION',
    payload: {
      location: location.pathname
    }
  })

  const wrongLogin = () => {
    toast.error("Wrong Username or Password",
      {
        position: toast.POSITION.TOP_CENTER
      })
  }

  let history = useHistory();
  // Set initial user state
  const [userState, setUserState] = useState({
    character: "",
    username: "",
    password: "",
    token: "",
    isLoggedIn: false,
    level: 0,
    id: "",
    health: 0
  })

  // Set initial login state
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
    character: ""
  })

  // Set new login state with change in input form
  const handleInputChange = e => {
    const { name, value } = e.target;
    setLoginState({
      ...loginState,
      [name]: value
    })
  }

  // Switch player to cat
  const catMe = e => {
    e.preventDefault();
    setLoginState({ ...loginState, character: "Cat" });
    API.playAsCat(loginState.username).then(data => {
      data ? handleSubmit() : console.log("IDIOT")
    }).catch(err => {
      err ? console.log(`FOOL! ${err}`) : console.log("Success!")
    });
  }

  // Switch player to manatee
  const manatMee = e => {
    e.preventDefault();
    setLoginState({ ...loginState, character: "Manatee" });
    API.playAsManatee(loginState.username).then(data => {
      data ? handleSubmit() : console.log("IDIOT")
    }).catch(err => {
      err ? console.log(`FOOL! ${err}`) : console.log("Success!")
    });
  }

  // Send user state to store and set token to local storage on successful login
  const handleSubmit = () => {
    API.login(loginState).then(res => {
      console.log(`Congrats! ${JSON.stringify(res.data)}`)
      localStorage.setItem("token", res.data.token);
      setUserState({
        character: res.data.user.character,
        username: res.data.user.username,
        password: res.data.user.password,
        token: res.data.token,
        level: res.data.user.level,
        id: res.data.user._id,
        isLoggedIn: true,
        encounter: 0,
        question1: false,
        question2: false,
        question3: false,
        health: res.data.user.health
      });
      store.dispatch({
        type: "USER_ACTION",
        payload: {
          ...store.getState().user,
          character: res.data.user.character,
          username: res.data.user.username,
          password: res.data.user.password,
          token: res.data.token,
          level: res.data.user.level,
          id: res.data.user._id,
          isLoggedIn: true,
          health: res.data.user.health
        }
      });
      setLoginState({
        username: "",
        password: "",
        character: "Cat"
      });
      history.push("/game");
    }).catch(err => {
      console.log(`FOOL! Due to your stupidity, ${err}`);
      store.dispatch({
        type: "USER_ACTION",
        payload: {
          character: "",
          username: "",
          password: "",
          token: "",
          level: 1,
          id: "",
          isLoggedIn: false,
          health: 0
        }
      })
      localStorage.removeItem("token");
      // alert("Wrong login information")
      wrongLogin()
      // history.push("/");
    });
  }

  const handleBackButton = () => {
    history.push("/")
  }

  // Render form component
  return (

    <div className="game-wrapper ">
      <Sound />
      <div className="signin-select rpgui-container framed">
      <button onClick={handleBackButton}><img className="back-arrow" src={back_arrow}/></button>
        <h1 style={{ fontSize: '250%' }}>Login</h1>
        <form className="loginInput" autoComplete="off">
          <label>User:
          <input name="username" type="text" placeholder="username" onChange={handleInputChange} />
          </label>
          <label>Password:
          <input name="password" type="password" placeholder="password" onChange={handleInputChange} />
          </label>
          <button id="catBtn" type="submit" value="Cat" className="rpgui-button" onClick={catMe}>Play as Cat</button>
          <button id="manateeBtn" type="submit" value="Manatee" className="rpgui-button" onClick={manatMee}>Play as Manatee</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoadGame;
