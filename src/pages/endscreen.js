import React from "react";
import store from "../config/store";
import API from "../utils/API";
import { useHistory, useLocation } from "react-router-dom";
import "./pages.css";

function Endscreen() {
    let history = useHistory();

    let location = useLocation();
  console.log(location.pathname)
  store.dispatch({
      type: 'CHANGE_LOCATION',
      payload: {
          location: location.pathname
      }
  })

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = store.getState().user.id;
        const token = store.getState().user.token;
        console.log(`ID: ${id}`);
        console.log("===================================")
        console.log(`Token: ${token}`)
        console.log("===================================")
        API.levelDown(id, token).then((res) => {
            console.log(`Here's what we get back: ${JSON.stringify(res)}`)
            console.log("===================================")
            store.dispatch({
                type: "USER_ACTION",
                payload: {
                    ...store.getState().user,
                    key: 0,
                    level: 1,
                    question1: false,
                    question2: false,
                    question3: false,
                    encounter: 0
                },
            });
        }).catch(err => {
            err ? console.log(`Due to your idiocy, ${err}`) : console.log("Success!")
        })
        history.push("/");
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
                question3: false
            }
        });
        history.push("/")
    }


    return (
        <div className="game-wrapper">
            <div className="menu-select">
                <label>Wizards and Whiteboards</label>
                <h1> Congratulations!</h1>
                <h2>
                    Hey, nice job! Just think, three months ago you'd never even see an HTML tag, and just look at you now! As a prize for completing the final challenge, I present you with the ultimate gift: A joe.joe email address. Go forth and always be coding.
        </h2>
                <input type="submit" value="New Game" onClick={handleSubmit} />
                <input type="submit" value="Exit" onClick={handleExit} />
            </div>
        </div>
    )

}

export default Endscreen