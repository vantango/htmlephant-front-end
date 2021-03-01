import React from "react";
import { Link } from "react-router-dom";
import "./pages.css"
function LoadGame() {
  return (
      <div className="game-wrapper">
        <div className="signin-select">
            <form>
            <label>User:</label>
            <input name="userAns" type="text" />
            <input type="submit" value="Submit" />
            <label>Password:</label>
            <input name="userAns" type="text" />
            <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
  );
}

export default LoadGame;
