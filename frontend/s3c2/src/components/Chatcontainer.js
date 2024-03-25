import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatAssistantLogo from './ChatAssistantLogo';

const ChatContainer = () => {
  const [isChatOpen, setChatOpen] = useState(false);

  // This function toggles the visibility of the chat window.
  const handleToggleChat = () => {
    setChatOpen(!isChatOpen); // Toggle the state to show or hide the chat window.
  };

  return (
    <div>
      {/* Render the ChatAssistantLogo if isChatOpen is false */}
      {!isChatOpen && (
        <ChatAssistantLogo onToggleChat={handleToggleChat} />
      )}

      {/* Render the ChatWindow if isChatOpen is true */}
      {isChatOpen && (
        <ChatWindow onClose={handleToggleChat} />
      )}
    </div>
  );
};

export default ChatContainer;