import axios from "axios";
import React, { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:3001/signup", {
        email,
        password,
        name,
      });
      console.log(data.data);
    } catch (err) {
      alert(err.response.data.message);
    }
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={signup}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
