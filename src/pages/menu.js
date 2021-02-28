import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoadGame from "./loadgame";
import NewGame from "./newgame";

function Menu() {
    return (
        <div className="menuSelect">
        <Link to={"/load"}>
            <button id="load-game" style={{ color: "white" }}>
            Load
            </button>
        </Link>

        <Link to={"/new"}>
            <button id="new-game" style={{ color: "white" }}>
            New
            </button>{" "}
        </Link>
        </div>
  );
}

export default Menu;
