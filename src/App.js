import "./App.css";
import World from "./features/world";
import API from "./utils/API"


// import "./styles.css";

const apiCall = () => {
  API.allAlgo().then(data => {
    console.log(data);
  })
}

function App() {
  return (
    <div>
      <World />

      

    </div>
  );
}

export default App;
