import React, { useState } from 'react';
import './Dashboard.css'; // Corrected import statement
import Image1 from "/Users/hannahryu/Documents/my-react-app/src/yay.jpeg"; // Adjust the path to your image
import Image2 from "/Users/hannahryu/Documents/my-react-app/src/Untitled design.jpg"; // Adjust the path to your image
import Image3 from "/Users/hannahryu/Documents/my-react-app/src/image3.png"; // Adjust the path to your image
import Image4 from "/Users/hannahryu/Documents/my-react-app/src/image4.png"; // Adjust the path to your image

const Header = () => (
    <header>
        <div className="search-container">
            <input type="text" placeholder="Search..." className="search-bar" />
            <i className="fas fa-search search-icon"></i>
        </div>
        <div className="user-info">
            <img src={Image1} alt="User" className="user-photo" />
            <div className="user-text">
                <strong>Caitlyn Widjaja</strong>
                <p>Registered Nurse</p>
            </div>
        </div>
    </header>
);

const Sidebar = () => (
    <aside>
        <ul>
        </ul>
    </aside>
);

const ToggleIcon = ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="toggle-icon">
            <div className="toggle-icon-header" onClick={() => setIsOpen(!isOpen)}>
                <h3>{title}</h3>
                {title === "Medication/Allergies" && (
                    <i className="fas fa-exclamation-circle exclamation-icon"></i>
                )}
                {title === "Imaging Reports" && (
                    <i className="fas fa-clock clock-icon"></i>
                )}
                <i className={`fas fa-chevron-${isOpen ? 'down' : 'right'}`}></i>
            </div>
            {isOpen && <div className="toggle-icon-content">Content for {title}</div>}
        </div>
    );
};

const LongitudinalData = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <section className="longitudinal-data">
            <div className="longitudinal-header">
                <h2>Longitudinal Data</h2>
                <i
                    className={`fas fa-chevron-${isOpen ? 'left' : 'right'}`}
                    onClick={() => setIsOpen(!isOpen)}
                ></i>
            </div>
            {isOpen && (
                <>
                    <img src={Image2} alt="Longitudinal Data" className="longitudinal-image" />
                </>
            )}
        </section>
    );
};

const TreatmentPlan = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="treatment-plan">
            <h2>Treatment Plan/Agenda: Diagnostics</h2>
            <p></p>
            <ul>
                <li>Type II Diabetes</li>
                <li>Clinical Obesity</li>
                <li>High Blood Pressure</li>
            </ul>
            <div className="image-thumbnail-container">
                <img src={Image4} alt="Thumbnail" className="image-thumbnail" />
                <i
                    className="fas fa-search image-magnify-icon"
                    onClick={() => setIsModalOpen(true)}
                ></i>
            </div>
            {isModalOpen && (
                <div className="image-modal">
                    <div className="image-modal-content">
                        <span className="image-modal-close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <img src={Image4} alt="Full Size" className="image-fullsize" />
                    </div>
                </div>
            )}
        </section>
    );
};

const MainContent = () => (
    <main>
        <section className="patient-bar">
            <label htmlFor="patient-select">Patient Jane Doe</label>
            <select id="patient-select" className="patient-select">
                {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={`patient${i + 1}`}>{`Patient ${i + 1}`}</option>
                ))}
            </select>
        </section>
        <section className="summary-box">
            <h2>Important Files</h2>
            <div className="summary-content">
                <div className="summary-icon" onClick={() => alert('Genomic Data clicked')}>
                    Genomic Data
                </div>
                <div className="summary-icon" onClick={() => alert('Patient Charts clicked')}>
                    Patient Charts
                </div>
                <div className="summary-icon" onClick={() => alert('Family Health History clicked')}>
                    Family Health History
                </div>
            </div>                
        </section>
        <section className="section">
            <ToggleIcon title="Admission/Discharge Notes" />
            <ToggleIcon title="Imaging Reports" />
            <ToggleIcon title="Code Status" />
            <ToggleIcon title="Medication/Allergies" />
            <ToggleIcon title="Vital Records" />
            <ToggleIcon title="Operation Notes" />
        </section>
        <LongitudinalData />
        <TreatmentPlan />
        <section className="additional-box1">
            <h2>Summary</h2>
            <p>LLM STUFF</p>
        </section>
        <section className="additional-box2">
            <img src={Image3} alt="Additional Content" className="additional-image" />
        </section>
    </main>
);

const Dashboard = () => (
    <div>
        <Header />
        <Sidebar />
        <MainContent />
    </div>
);

export default Dashboard;