import React, { useState } from "react";
import store from "../config/store";
import { useHistory, useLocation } from "react-router-dom";
import API from "../utils/API";
import "./pages.css"
import { ToastContainer, toast } from 'react-toastify'

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
    username: "",
    password: "",
    token: "",
    isLoggedIn: false,
    level: 0,
    id: "",
  })

  // Set initial login state
  const [loginState, setLoginState] = useState({
    username: "",
    password: ""
  })

  // Set new login state with change in input form
  const handleInputChange = e => {
    const { name, value } = e.target;
    setLoginState({
      ...loginState,
      [name]: value
    })
  }

  // Send user state to store and set token to local storage on successful login
  const handleSubmit = e => {
    e.preventDefault();
    API.login(loginState).then(res => {
      console.log(`Congrats! ${JSON.stringify(res.data)}`)
      localStorage.setItem("token", res.data.token);
      setUserState({
        username: res.data.user.username,
        password: res.data.user.password,
        token: res.data.token,
        level: res.data.user.level,
        id: res.data.user._id,
        isLoggedIn: true,
        encounter: 0,
        question1: false,
        question2: false,
        question3: false
      });
      store.dispatch({
        type: "USER_ACTION",
        payload: {
          ...store.getState().user,
          username: res.data.user.username,
          password: res.data.user.password,
          token: res.data.token,
          level: res.data.user.level,
          id: res.data.user._id,
          isLoggedIn: true
        }
      });
      setLoginState({
        username: "",
        password: ""
      });
      history.push("/game");
    }).catch(err => {
      console.log(`FOOL! Due to your stupidity, ${err}`);
      store.dispatch({
        type: "USER_ACTION",
        payload: {
          username: "",
          password: "",
          token: "",
          level: 1,
          id: "",
          isLoggedIn: false
        }
      })
      localStorage.removeItem("token");
      // alert("Wrong login information")
      wrongLogin()
      // history.push("/");
    });
  }



  // Render form component
  return (

    <div className="game-wrapper">
      <div className="signin-select">
        <form>
          <label>User:</label>
          <input name="username" type="text" onChange={handleInputChange} />
          <label>Password:</label>
          <input name="password" type="password" onChange={handleInputChange} />
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoadGame;
