import React, { ChangeEvent, KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import '../app/globals.css';

interface InputAreaProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    handleKeyPress: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
    sendPrompt: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({ prompt, setPrompt, handleKeyPress, sendPrompt }) => {
    return (
        <div className="input-group">
            <textarea
                id="prompt"
                placeholder="Enter your prompt"
                value={prompt}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
            ></textarea>
            <button onClick={sendPrompt}>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    );
};

export default InputArea;
