import React, { useState } from 'react';
import Recorder from './Recorder/Recorder';

const HandOff = ({ setCurrentPage, setTranscriptions, transcriptions }) => {
    return (
        <div className="component">
            <h1>Hand Off</h1>
            <div className="transcription-list">
                {transcriptions.map((transcription, index) => (
                    <div key={index} className="transcription">
                        <p>{transcription}</p>
                    </div>
                ))}
            </div>
            <div className="button-container">
                <button onClick={() => setCurrentPage("confirmNotes")}>Back</button>
                <button onClick={() => setCurrentPage("viewNotes")}>Next</button>
            </div>
        </div>
    );
}