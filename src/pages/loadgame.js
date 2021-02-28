import React from "react";
import { Link } from "react-router-dom";
function LoadGame() {
  return (
    <form>
      <label>User:</label>
      <input name="userAns" type="text" />
      <input type="submit" value="Submit" />
      <label>Password:</label>
      <input name="userAns" type="text" />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default LoadGame;
