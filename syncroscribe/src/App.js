import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import "./components/Login/Login.css";
import RecordNotes from "./components/RecordNotes/RecordNotes";
import "./components/RecordNotes/RecordNotes.css";
import ConfirmNotes from "./components/ConfirmNotes/ConfirmNotes";
import "./components/ConfirmNotes/ConfirmNotes.css";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const [currentPage, setCurrentPage] = useState("login");
  const [transcriptions, setTranscriptions] = useState([]);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUserName(username);
    setCurrentPage("recordNotes");
  };
  if (isLoggedIn) {
    if (currentPage === "recordNotes") {
      return (
        <RecordNotes setCurrentPage={setCurrentPage}
          setTranscriptions={setTranscriptions}
          transcriptions={transcriptions} />
      )
    } else if (currentPage === "confirmNotes") {
      return (
        <ConfirmNotes setCurrentPage={setCurrentPage}
          setTranscriptions={setTranscriptions}
          transcriptions={transcriptions} />
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
    } else {
      setIsLoggedIn(false);
    }
  } else {
    return (
			<div className="App">
				<header className="App-header">
					<h1>SyncroScribe</h1>
				</header>
				<Login onLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} />
			</div>
		);
  }
}

export default App;
