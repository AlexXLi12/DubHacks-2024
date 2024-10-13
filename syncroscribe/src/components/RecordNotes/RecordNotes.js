import React, { useState, useRef } from 'react';
import Recorder from './Recorder/Recorder';

const RecordNotes = ({setCurrentPage}) => {
    return (
        <div className="component">
            <h1>Record Notes</h1>
            <div className="recorded-notes">

            </div>
            <Recorder />
        </div>
    );
};

export default RecordNotes;