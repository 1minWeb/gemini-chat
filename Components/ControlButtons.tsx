import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

interface ControlButtonsProps {
    toggleMode: () => void;
    darkMode: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ toggleMode, darkMode }) => {
    return (
        <div>
            <button className={'toggle-mode'} onClick={toggleMode}>{" "}
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} id="modeIcon" className='icon' />
            </button>
        </div>
    );
};

export default ControlButtons;
