// ChatHeader.js
import React from 'react';
import logo from './logo6.png'; 
import './Styles/kahramaa.css'; // Ensure this is the correct path to your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const ChatHeader = ({ onMinimize }) => {
  return (
    <div className="chat-header">
      <div className="logo-and-text">
        <img src={logo} alt="Chatbot Logo" className="chat-logo" />
        <div>
          <div className="welcome"></div>
          <div className="welcome">Welcome to Salesman 
          <br></br>Probleme Chatbot</div>
        </div>
      </div>
      <div className="contact-and-minimize">
        
        <div className="contact-us-container">
          
          
          <a href="tel:109" className="phone-number">this is an ai specialized in solving and </a>
          <span className="phone-number-plus"> | </span>
          <a href="tel:+97444069999" className="phone-number">explaining salesman probleme using approximation algorithm and ant colonny optimizations ​​</a>
        </div>
        <div className="beta">
          <p>SUPNUM</p>
        </div>
        <button className="minimize-button" onClick={onMinimize}>-</button>
      </div>
    </div>
  );
};

export default ChatHeader;