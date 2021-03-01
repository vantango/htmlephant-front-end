import React, { useState } from "react";
import store from "../config/store";
import { Link } from "react-router-dom";
import API from "../utils/API";

function LoadGame() {
  // Set initial user state
  const [userState, setUserState] = useState({
    username: "",
    password: "",
    token: "",
    isLoggedIn: false
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
        isLoggedIn: true
      });
      store.dispatch({
        type: "USER_ACTION",
        payload: {
          username: res.data.user.username,
            password: res.data.user.password,
            token: res.data.token,
            isLoggedIn: true
        }
      });
      setLoginState({
        username: "",
        password: ""
      })
    }).catch(err => {
      console.log(`FOOL! Due to your stupidity, ${err}`);
      store.dispatch({
        type: "USER_ACTION",
        payload: {
          username: "",
          password: "",
          token: "",
          isLoggedIn: false
        }
      })
      localStorage.removeItem("token")
    });

  }

  // Render form component
  return (
    <form>
      <label>User:</label>
      <input name="username" type="text" onChange={handleInputChange} />
      <label>Password:</label>
      <input name="password" type="password" onChange={handleInputChange} />
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </form>
  );
}

export default LoadGame;
