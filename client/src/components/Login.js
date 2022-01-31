import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // for sessions in frontend
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const getCookie = async () => {
      console.log("login runnng");
      const cookie = await axios.get("http://localhost:3001/login");
      console.log(cookie.data);
      setIsLoggedIn(cookie.data.isLoggedIn);
    };

    getCookie();
  }, [setIsLoggedIn]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      console.log(data?.data);
      history.push("/");
    } catch (err) {
      // console.log(err.response.data.message);
      alert(err.response.data.message);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>login</button>
      </form>
    </div>
  );
}

export default Login;
