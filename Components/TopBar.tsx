import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBars } from '@fortawesome/free-solid-svg-icons';
import '../app/globals.css';

interface TopBarProps {
    darkMode: boolean;
    toggleMode: () => void;
    toggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ darkMode, toggleMode, toggleSidebar }) => {
    return (
        <div className="top-bar">
            <button className="toggle-sidebar" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} className='icon' />
            </button>
            <div className="top-bar-title">GPT Chat</div>
            <button className="toggle-mode" onClick={toggleMode}>
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className='icon' />
            </button>
        </div>
    );
};

export default TopBar;
