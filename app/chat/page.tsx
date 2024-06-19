'use client';
import { useState, useEffect, KeyboardEvent } from 'react';
import Sidebar from '../../Components/SideBar';
import ChatMessages from '../../Components/ChatMessages';
import InputArea from '../../Components/InputText';
import TopBar from '../../Components/TopBar';
import '../globals.css';
import { v4 as uuidv4 } from 'uuid';

interface Message {
    role: string;
    content: string;
}

interface Chat {
    id: string;
    messages: Message[];
}

export default function ChatHome() {
    const [prompt, setPrompt] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentChat, setCurrentChat] = useState<Message[]>([]);
    const [chatId, setChatId] = useState<string>(uuidv4());
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [sidebarHidden, setSidebarHidden] = useState<boolean>(false);
    const [chatHistory, setChatHistory] = useState<Chat[]>([]);

    useEffect(() => {
        loadChatHistory();
    }, []);

    const toggleMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    const toggleSidebar = () => {
        setSidebarHidden(!sidebarHidden);
    };

    const startNewChat = () => {
        setCurrentChat([]);
        setMessages([]);
        setChatId(uuidv4());
    };

    const sendPrompt = async () => {
        if (!prompt) return;

        const newMessages = [...messages, { role: 'user', content: prompt }];
        setMessages(newMessages);
        setCurrentChat([...currentChat, { role: 'user', content: prompt }]);

        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, chatId })
        });
        const result = await response.json();
        console.log(result);
        setMessages([...newMessages, { role: 'bot', content: result.text }]);
        setCurrentChat([...currentChat, { role: 'bot', content: result.text }]);
        setPrompt('');
        setTimeout(() => {
            saveChatHistory();
        }, 2000);
    };

    const loadChatHistory = async () => {
        const response = await fetch('/api/history');
        const history = await response.json();
        setChatHistory(history);
    };

    const saveChatHistory = async () => {
        await fetch('/api/addChat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatId, messages: currentChat })
        });
        loadChatHistory();
    };

    const loadChat = (chat: Chat) => {
        setCurrentChat(chat.messages);
        setMessages(chat.messages);
        setChatId(chat.id);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendPrompt();
        }
    };

    return (
        <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
            <TopBar darkMode={darkMode} toggleMode={toggleMode} toggleSidebar={toggleSidebar} />
            <div className="flex h-full">
                <Sidebar
                    sidebarHidden={sidebarHidden}
                    toggleSidebar={toggleSidebar}
                    startNewChat={startNewChat}
                    chatHistory={chatHistory}
                    loadChat={loadChat}
                />
                <div className={`chat-content ${sidebarHidden ? 'full-width' : ''}`} id="chatContent">
                    <ChatMessages messages={messages} />
                    <InputArea
                        prompt={prompt}
                        setPrompt={setPrompt}
                        handleKeyPress={handleKeyPress}
                        sendPrompt={sendPrompt}
                    />
                </div>
            </div>
        </div>
    );
}
