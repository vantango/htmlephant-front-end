import React, { useState } from "react";
import store from "../config/store";
import API from "../utils/API";
import { useHistory, useLocation } from "react-router-dom";
import "./newgame.css"
import { ToastContainer, toast } from 'react-toastify'
import Sound from '../features/sound'



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
    isLoggedIn: false
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

    // Switch player to cat
    const catMe = e => {
      e.preventDefault();
      setSignupState({ ...signupState, character: "Cat" });
      API.playAsCat(signupState.username).then(data => {
        data ? console.log(data) : console.log("IDIOT")
      }).catch(err => {
        err ? console.log(`FOOL! ${err}`) : console.log("Success!")
      });
    }
  
    // Switch player to manatee
    const manatMee = e => {
      e.preventDefault();
      setSignupState({ ...signupState, character: "Manatee" });
      API.playAsManatee(signupState.username).then(data => {
        data ? console.log(data) : console.log("IDIOT")
      }).catch(err => {
        err ? console.log(`FOOL! ${err}`) : console.log("Success!")
      });
    }

  const handleSubmit = e => {
    e.preventDefault();
    if (!signupState.username || !signupState.password) {
      console.log("username and password required")
      emptyUsernameOrPassword()
    } else {
      API.signup(signupState).then(res => {
        console.log(`Congrats! ${JSON.stringify(res.data)}`);
        localStorage.setItem("token", res.data.token)
        setUserState({
          character: res.data.user.character,
          username: res.data.user.username,
          password: res.data.user.password,
          token: res.data.token,
          level: res.data.user.level,
          id: res.data.user._id,
          isLoggedIn: true
        });
        store.dispatch({
          type: "USER_ACTION",
          payload: {
            character: res.data.user.character,
            username: res.data.user.username,
            password: res.data.user.password,
            token: res.data.token,
            level: res.data.user.level,
            id: res.data.user._id,
            isLoggedIn: true
          }
        });
        setSignupState({
          username: "",
          password: "",
          character: ""
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
            isLoggedIn: false
          }
        });
        userAlreadyExists()
        localStorage.removeItem("token");
        // history.push("/");
      });
    }
  }

  return (
    <div className="game-wrapper">
      <Sound />
      <div className="signin-select rpgui-container framed">
        <h1 style={{ fontSize: '250%' }}>Signup</h1>
        <form>
          <label>
            User:
          <input name="username" type="text" onChange={handleInputChange} />
          </label>
          <label>
            Password:
          <input name="password" type="password" onChange={handleInputChange} />
          </label>
          <button id="catBtn" type="submit" value="Cat" className="rpgui-button" onClick={catMe}>Play as Cat</button>
          <button id="manateeBtn" type="submit" value="Manatee" className="rpgui-button" onClick={manatMee}>Play as Manatee</button>
          <input type="submit" value="Submit" onClick={handleSubmit} />
          <div className="float:right">
          </div>

        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default NewGame