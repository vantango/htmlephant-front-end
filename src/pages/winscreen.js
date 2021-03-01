function Winscreen() {
    return (
      <div className= "game-wrapper">
          <div className="menu-select">
              <label>Wizards and Whiteboards</label>
          <Link to={"/load"}>
              <button id="load-game" className="menu-button"  style={{ color: "white" }}>
              Load Game
              </button>
          </Link>
          <Link to={"/new"}>
              <button id="new-game" className="menu-button" style={{ color: "white" }}>
              New Game
              </button>{" "}
          </Link>
          </div>
      </div>
    );
  }
  
  export default WinScreen;
  