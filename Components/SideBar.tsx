import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../app/globals.css';

interface SidebarProps {
    sidebarHidden: boolean;
    toggleSidebar: () => void;
    startNewChat: () => void;
    chatHistory: any[];
    loadChat: (chat: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarHidden, toggleSidebar, startNewChat, chatHistory, loadChat }) => {
    return (
        <div className={`sidebar ${sidebarHidden ? 'hidden' : ''}`} id="sidebar">
            {/* <button className="toggle-sidebar" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faTimes} />
            </button> */}
            <div className="logo">GPT API</div>
            <div className="new-chat" onClick={startNewChat}>
                <FontAwesomeIcon icon={faPlus} /> New Chat
            </div>
            <ul className="history" id="history">
                {chatHistory.map((chat, index) => (
                    <li key={index} onClick={() => loadChat(chat)}>
                        {chat.messages?.length > 0 ? chat.messages[0].content.slice(0, 25) : 'No messages'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
