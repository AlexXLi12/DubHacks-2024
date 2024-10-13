import React, { useState, useRef } from 'react';
import Recorder from './Recorder/Recorder';

const RecordNotes = ({setCurrentPage}) => {
    return (
        <div className="component" style={{ border: 'none' }}>
            <h1>Record Notes</h1>
            <Recorder />
            <div className="button-container">
                <button onClick={() => setCurrentPage("login")}>Back</button>
                <button onClick={() => setCurrentPage("confirmNotes")}>Next</button>
            </div>
        </div>
    );
};

export default RecordNotes;