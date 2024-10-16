import React, { useState, useRef } from "react";
import "./Recorder.css";
const Recorder = ({setTranscriptions, transcriptions}) => {
	const [isRecording, setIsRecording] = useState(false);
	const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const config = require("../../../config.json");
    const api_key = config.whisper_api_key;
    const auth_string = "Bearer " + api_key;
    const getTranscription = async (audioBlob) => {
		const body = new FormData();
        body.append("file", audioBlob);
        body.append("prompt", "Nurse narrating notes on patient for next shift");
		body.append("language", "english");
		body.append("response_format", "json");

		fetch("https://api.lemonfox.ai/v1/audio/transcriptions", {
			method: "POST",
			headers: {
				Authorization: auth_string,
			},
			body: body,
		})
			.then((response) => response.json())
			.then((data) => {
                console.log(data);
                setTranscriptions([...transcriptions, data["text"]]);
			})
			.catch((error) => {
				console.error("Error:", error);
            });
	};

	const handleRecordButtonClick = async () => {
		if (isRecording) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		} else {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorderRef.current = new MediaRecorder(stream);
			mediaRecorderRef.current.ondataavailable = (event) => {
				audioChunksRef.current.push(event.data);
			};
			mediaRecorderRef.current.onstop = async () => {
				const audioBlob = new Blob(audioChunksRef.current, {
					type: "audio/wav",
				});
                await getTranscription(audioBlob);
				audioChunksRef.current = [];
			};
			mediaRecorderRef.current.start();
			setIsRecording(true);
		}
	};

	return (
		<div className="component">
            <div className="recorded-notes">
                <h2>Recorded Notes</h2>
                {transcriptions.length === 0 && <div>No notes recorded yet</div>}
                {transcriptions.map((transcription, index) => (
                    <div key={index}>
                        {transcription}
                    </div>
                ))}
            </div>
			<div className="record-new-note">
				<button onClick={handleRecordButtonClick}>
					{isRecording ? "Stop Recording" : "Start Recording"}
				</button>
			</div>
		</div>
	);
};

export default Recorder;
