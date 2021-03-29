import React, { useState } from "react";
import store from "../config/store";
import API from "../utils/API";
import { useHistory, useLocation } from "react-router-dom";
import "./newgame.css"
import { ToastContainer, toast } from 'react-toastify'
import Sound from '../features/sound'
import back_arrow from "./imgs/back_arrow.png"


function NewGame() {

  let location = useLocation();
  console.log(location.pathname)
  store.dispatch({
    type: 'CHANGE_LOCATION',
    payload: {
      location: location.pathname
    }
  })

  const userAlreadyExists = () => {
    toast.error("User already exists",
      {
        position: toast.POSITION.TOP_CENTER
      })
  }

  const emptyUsernameOrPassword = () => {
    toast.error("Username and Password are required",
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
    level: 0,
    id: "",
    isLoggedIn: false,
    health: 0,
    keys: 0
  });

  // Set initial signup state
  const [signupState, setSignupState] = useState({
    username: "",
    password: "",
    character: ""
  })

  // Set signup state on input change
  const handleInputChange = e => {
    const { name, value } = e.target;
    setSignupState({
      ...signupState,
      [name]: value
    })
  }


  const handleCatSubmit = e => {
    e.preventDefault();
    if (!signupState.username || !signupState.password) {
      console.log("username and password required")
      emptyUsernameOrPassword()
    } else {
      console.log(JSON.stringify(signupState, null, 2))
      API.signup({
        username: signupState.username,
        password: signupState.password,
        character: "Cat"
      }).then(res => {
        console.log(`Congrats! ${JSON.stringify(res.data)}`);
        localStorage.setItem("token", res.data.token)
        setUserState({
          character: res.data.user.character,
          username: res.data.user.username,
          password: res.data.user.password,
          token: res.data.token,
          level: res.data.user.level,
          id: res.data.user._id,
          isLoggedIn: true,
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
            health: res.data.user.health,
            keys: res.data.user.keys
          }
        });
        setSignupState({
          username: "",
          password: "",
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
            level: 0,
            id: "",
            isLoggedIn: false,
            health: 0,
            keys: 0
          }
        });
        userAlreadyExists()
        localStorage.removeItem("token");
        // history.push("/");
      });
    }
  }

  const handleManateeSubmit = e => {
    e.preventDefault();
    if (!signupState.username || !signupState.password) {
      console.log("username and password required")
      emptyUsernameOrPassword()
    } else {
      console.log(JSON.stringify(signupState, null, 2))
      API.signup({
        username: signupState.username,
        password: signupState.password,
        character: "Manatee"
      }).then(res => {
        console.log(`Congrats! ${JSON.stringify(res.data)}`);
        localStorage.setItem("token", res.data.token)
        setUserState({
          character: res.data.user.character,
          username: res.data.user.username,
          password: res.data.user.password,
          token: res.data.token,
          level: res.data.user.level,
          id: res.data.user._id,
          isLoggedIn: true,
          health: res.data.user.health,
          keys: res.data.user.keys
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
            health: res.data.user.health,
            keys: res.data.user.keys
          }
        });
        setSignupState({
          username: "",
          password: "",
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
            level: 0,
            health: 0,
            id: "",
            isLoggedIn: false,
            keys: 0
          }
        });
        userAlreadyExists()
        localStorage.removeItem("token");
        // history.push("/");
      });
    }
  }

  const handleBackButton = () => {
    history.push("/")
  }

  return (
    <div className="game-wrapper">
      <Sound />
      <div className="signin-select rpgui-container framed">
        <button onClick={handleBackButton}><img className="back-arrow" src={back_arrow}/></button>
        <h1 style={{ fontSize: '250%' }}>Signup</h1>
        <form className="signupInput">
          <label>
            User:
          <input name="username" type="text" onChange={handleInputChange} />
          </label>
          <label>
            Password:
          <input name="password" type="password" onChange={handleInputChange} />
          </label>
          <button className="rpgui-button" type="submit" id="cat" name="character" value="Cat" onClick={handleCatSubmit}>Play as Cat</button>
          <button className="rpgui-button" type="submit" id="manatee" name="character" value="Manatee" onClick={handleManateeSubmit}>Play as Manatee</button>

        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default NewGame