import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import World from "./features/world";
import API from "./utils/API"
import Menu from "./pages/menu"


// import "./styles.css";

const apiCall = () => {
  API.allAlgo().then(data => {
    console.log(data);
  })
}

function App() {
 
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route exact path={["/game"]}>
            <World />
          </Route>
          <Route exact path= {["/", "/menu"]}>
            <Menu />
          </Route>
          {/* <Route> */}
            {/* <NoMatch /> */}
          {/* </Route> */}
        </Switch>
      </div>
    </Router>
  );
  
}

export default App;
