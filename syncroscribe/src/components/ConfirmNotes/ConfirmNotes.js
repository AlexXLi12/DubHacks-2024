import React, { useState } from 'react';
import "./ConfirmNotes.css";

const ConfirmNotes = ({ setCurrentPage, setTranscriptions, transcriptions }) => {
    const [confirmedTranscriptions, setConfirmedTranscriptions] = useState([]);
    const [confirmationStatus, setConfirmationStatus] = useState(transcriptions.map(() => 0));

    const handleConfirmClick = (index) => {
        const newStatus = [...confirmationStatus];
        newStatus[index] = 1;
        setConfirmationStatus(newStatus);
        setConfirmedTranscriptions([...confirmedTranscriptions, transcriptions[index]]);
    };

    const handleUnconfirmClick = (index) => {
        const newStatus = [...confirmationStatus];
        newStatus[index] = 0;
        setConfirmationStatus(newStatus);
        setConfirmedTranscriptions(confirmedTranscriptions.filter((_, i) => i !== index));
    };

    const handleNextClick = () => {
        setTranscriptions(confirmedTranscriptions);
        setCurrentPage("handOff");
    }

    return (
        <div className="component">
            <h1>Confirm Notes</h1>
            <div className="transcription-list">
                {transcriptions.map((transcription, index) => (
                    <div key={index} className="transcription">
                        <p>{transcription}</p>
                        {confirmationStatus[index] == 1 ? (
                            <button onClick={() =>
                            {
                                handleUnconfirmClick(index);
                            }
                            }>Unconfirm</button>
                        ) : (
                            <button onClick={() => {
                                handleConfirmClick(index);
                            }}>Confirm</button>
                        )}
                    </div>
                ))}
            </div>
            <div className="additional-notes">
                <h2>Additional Notes</h2>
                <textarea 
                    placeholder="Add additional notes here..." 
                    rows="4" 
                    cols="50" 
                    onChange={(e) => setConfirmedTranscriptions([...confirmedTranscriptions, e.target.value])}>
                </textarea>
            </div>
            <div className="button-container">
                <button onClick={() => setCurrentPage("recordNotes")}>Back</button>
                <button onClick={() => handleNextClick()}>Confirm</button>
            </div>
        </div>
    );
};

export default ConfirmNotes;