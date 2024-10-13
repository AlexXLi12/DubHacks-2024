import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import "./components/Login/Login.css";
import RecordNotes from "./components/RecordNotes/RecordNotes";
import "./components/RecordNotes/RecordNotes.css";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const [currentPage, setCurrentPage] = useState("login");
  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUserName(username);
    setCurrentPage("recordNotes");
  };
  if (isLoggedIn) {
    if (currentPage === "recordNotes") {
      return (
        <RecordNotes setCurrentPage={setCurrentPage}/>
      )
    } else if (currentPage === "confirmNotes") {
      return (
        <div>
          <h1>Confirm Notes</h1>
        </div>
      )
    } else if (currentPage === "handOff") {
      return (
        <div>
          <h1>Hand Off</h1>
        </div>
      )
    } else if (currentPage === "viewNotes") {
      return (
        <div>
          <h1>View Notes</h1>
        </div>
      )
    }
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
