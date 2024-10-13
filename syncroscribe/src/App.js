import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import "./components/Login/Login.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState("");

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUserName(username);    
  };
  if (isLoggedIn) {
    return (
      <div>
        <h1>Hello admin</h1>
      </div>
    )
  } else {
    return (
			<div className="App">
				<header className="App-header">
					<h1>SyncroScribe</h1>
				</header>
				<Login onLogin={handleLogin} />
			</div>
		);
  }
}

export default App;
