import "./App.css";
import World from "./features/world";
import API from "./utils/API"
import Game from "./components/Menu/Game"

// import "./styles.css";

const apiCall = () => {
  API.allAlgo().then(data => {
    console.log(data);
  })
}

function App() {
  return (
    <div>
      {/* <World /> */}
      <Game />

      

    </div>
  );
}

export default App;
