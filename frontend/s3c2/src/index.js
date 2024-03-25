import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './components/pages/landing'; // Import LandingPage component


const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWrapper = () => {
    const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);

    const toggleChatWindow = () => setIsChatWindowOpen(!isChatWindowOpen);

    return (
        <>
           
            <LandingPage onLogoClick={toggleChatWindow} />
            {isChatWindowOpen && <ChatWindow onClose={() => setIsChatWindowOpen(false)} />}
        </>
    );
};

root.render(
  <>

    <LandingPage />
  </>
);
