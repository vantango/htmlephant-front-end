import "./App.css";
import React from 'react';
import { useLocation, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import World from "./features/world";
import API from "./utils/API"
import Menu from "./pages/menu"
import LoadGame from "./pages/loadgame"
import NewGame from "./pages/newgame"
import Game from "./pages/game"
import WinScreen from "./pages/winscreen"
import Endscreen from "./pages/endscreen"
// import "./styles.css";
import store from "./config/store";


function App() {

    // let location = useLocation();
    // console.log(location.pathname)
    // React.useEffect(() => {
    //   console.log(location.pathname)
    //   store.dispatch({
    //     type: 'CHANGE_LOCATION',
    //     payload: {
    //       location: location.pathname
    //     }
    //   })
    // }, [location])

  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route exact path={["/", "/menu"]}>
            <Menu />
          </Route>
          <Route exact path={["/game"]}>
            <Game />
          </Route>
          <Route exact path={["/load"]}>
            <LoadGame />
          </Route>
          <Route exact path={["/new"]}>
            <NewGame />
          </Route>
          <Route exact path={["/winscreen"]}>
            <WinScreen />
          </Route>
          <Route exact path={["/endscreen"]}>
            <Endscreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );

}

export default App;
