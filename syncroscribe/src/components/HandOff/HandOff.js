import React from "react";
import Recorder from "../RecordNotes/Recorder/Recorder";

const HandOff = ({
	setCurrentPage,
	setConfirmedTranscriptions,
	confirmedTranscriptions,
	setSummary,
}) => {
	const config = require("../../config.json");
	const run = async (input) => {
		const messages = [
			{
				role: "system",
				content:
					"Briefly summarize the following narration of a nurse about a patient for the next shift. " +
                    "Only focus on the important information, nuanced information. " +
                    "Do not include an introduction. Use backslash n for line breaks."
			},
			{
				role: "user",
				content: input,
			},
		];
		const response = await fetch("/proxy", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ messages: messages, temperature: 0.1 }),
		});
		const result = await response.json();
		setSummary(result.result.response);
	};

	const handleNextClick = async () => {
		const confirmedTranscriptionsString = confirmedTranscriptions.join(". ");
		await run(confirmedTranscriptionsString);
		console.log("setting current page to viewNotes");
		setCurrentPage("dashBoard");
	};

	return (
		<div className="component">
			<h1>Hand Off</h1>
			<div className="Recorder">
				<Recorder
					setTranscriptions={setConfirmedTranscriptions}
					transcriptions={confirmedTranscriptions}
				/>
			</div>
			<div className="button-container">
				<button onClick={() => setCurrentPage("confirmNotes")}>Back</button>
				<button onClick={() => handleNextClick()}>Next</button>
			</div>
		</div>
	);
};

export default HandOff;
