import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import './Styles/kahramaa.css';

const ChatWindow = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const webChatContainerRef = useRef(null);

    function scrollToBottom() {
        const chatContainer = webChatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = () => {
        if (!inputText.trim()) return;

        const newMessage = { id: messages.length + 1, text: inputText, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputText('');
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        handleSubmit();

        try {
            const response = await fetch('http://127.0.0.1:8081/ask/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({question: inputText }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const botResponse = { id: messages.length + 2, text: data.response, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Optionally, handle errors by displaying a message in the UI
        }
    };

    return (
        <div className="chat-window">
            <ChatHeader onMinimize={onClose} />
            
            <div ref={webChatContainerRef} className="webchat-container">
                {messages.map((message) => (
                    <div key={message.id} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
                        <div className="chat-message">{message.text}</div>
                    </div>
                ))}
            </div>
            <div className="chat-input-container" style={{ padding: '10px' }}>
                <input
                    value={inputText}
                    onChange={handleChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="chat-input"
                    style={{ width: 'calc(100% - 100px)', marginRight: '10px' }}
                />
                <button onClick={handleSendMessage} style={{ width: '90px' }}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;