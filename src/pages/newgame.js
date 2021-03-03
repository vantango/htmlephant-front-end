import React, { useState } from "react";
import store from "../config/store";
import API from "../utils/API";
import { useHistory, useLocation } from "react-router-dom";
import "./pages.css"

function NewGame() {

  let location = useLocation();
  console.log(location.pathname)
  store.dispatch({
      type: 'CHANGE_LOCATION',
      payload: {
          location: location.pathname
      }
  })

  let history = useHistory();
  // Set initial user state
  const [userState, setUserState] = useState({
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
    password: ""
  })

  // Set signup state on input change
  const handleInputChange = e => {
    const { name, value } = e.target;
    setSignupState({
      ...signupState,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    API.signup(signupState).then(res => {
      console.log(`Congrats! ${JSON.stringify(res.data)}`);
      localStorage.setItem("token", res.data.token)
      setUserState({
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
          level: 0,
          id: "",
          isLoggedIn: false
        }
      });
      localStorage.removeItem("token");
      history.push("/");
    });
  }

  return (
    <div className="game-wrapper">
      <div className="signin-select">
        <form>
          <label>
            User:
                    </label>
          <input name="username" type="text" onChange={handleInputChange} />
          <label>
            Password:
                    </label>
          <input name="password" type="password" onChange={handleInputChange} />
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
}

export default NewGame