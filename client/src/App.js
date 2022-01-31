import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./components/Login";
import Recepies from "./components/Recepies";
import Signup from "./components/Signup";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  // useEffect(() => {
  //   const getCookie = async () => {
  //     const cookie = await axios.get("http://localhost:3001/login");
  //     console.log(cookie);
  //   };
  //   getCookie();
  // }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route exact path="/login">
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/recepies">
            {isLoggedIn ? <Recepies /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
