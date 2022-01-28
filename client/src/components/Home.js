import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/recepies">
        <button>View recepies</button>
      </Link>
    </div>
  );
}

export default Home;
