import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import "./components/Login/Login.css";
import RecordNotes from "./components/RecordNotes/RecordNotes";
import "./components/RecordNotes/RecordNotes.css";
import ConfirmNotes from "./components/ConfirmNotes/ConfirmNotes";
import "./components/ConfirmNotes/ConfirmNotes.css";
import HandOff from "./components/HandOff/HandOff";
import "./components/HandOff/HandOff.css";
import ViewNotes from "./components/ViewNotes/ViewNotes";
import "./components/ViewNotes/ViewNotes.css";
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUserName] = useState("");
	const [currentPage, setCurrentPage] = useState("login");
  const [transcriptions, setTranscriptions] = useState([]);
  const [confirmedTranscriptions, setConfirmedTranscriptions] = useState([]);
  const [summary, setSummary] = useState("");
  const [data, setData] = useState([]);

	const handleLogin = (username) => {
		setIsLoggedIn(true);
		setUserName(username);
		setCurrentPage("recordNotes");
	};
	if (isLoggedIn) {
		if (currentPage === "recordNotes") {
			return (
				<RecordNotes
					setCurrentPage={setCurrentPage}
					setTranscriptions={setTranscriptions}
					transcriptions={transcriptions}
				/>
			);
		} else if (currentPage === "confirmNotes") {
			return (
				<ConfirmNotes
					setCurrentPage={setCurrentPage}
					setConfirmedTranscriptions={setConfirmedTranscriptions}
          confirmedTranscriptions={confirmedTranscriptions}
          transcriptions={transcriptions}
				/>
			);
		} else if (currentPage === "handOff") {
			return (
        <HandOff
          setCurrentPage={setCurrentPage}
          setConfirmedTranscriptions={setConfirmedTranscriptions}
          confirmedTranscriptions={confirmedTranscriptions}
          setSummary={setSummary}
				/>
			);
    } else if (currentPage === "viewNotes") {
			return (
        <ViewNotes summary={summary} data={data} />
			);
		} else {
			setIsLoggedIn(false);
		}
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
