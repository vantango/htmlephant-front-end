import React, { useState } from "react";
import store from "../config/store";
import API from "../utils/API";

function NewGame() {
  // Set initial user state
  const [userState, setUserState] = useState({
    username: "",
    password: "",
    token: "",
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

  const handleSubmit = e=>{
    e.preventDefault();
    API.signup(signupState).then(res=>{
      console.log(`Congrats! ${JSON.stringify(res.data)}`);
      localStorage.setItem("token",res.data.token)
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
      setSignupState({
        username: "",
        password:"",
      });
    }).catch(err=>{
      console.log(`FOOL! Due to your stupidity, ${err}`);
      store.dispatch({
        type: "USER_ACTION",
        payload: {
          username: "",
          password: "",
          token: "",
          isLoggedIn: false
        }
      });
      localStorage.removeItem("token")
    })
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
            <input name="password" type="password" onChange={handleInputChange}/>
            <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
        </div>
    </div>
  );
}

export default NewGame