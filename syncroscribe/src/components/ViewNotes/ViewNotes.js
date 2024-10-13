import React from "react";

const ViewNotes = ({ summary, data }) => {
    return (
        <div className="component">
            <h1>View Notes</h1>
            <div className="notes">
                <h2>Summary</h2>
                <p style={{ whiteSpace: 'pre-line' }}>{summary}</p>
            </div>
        </div>
    );
};

export default ViewNotes;