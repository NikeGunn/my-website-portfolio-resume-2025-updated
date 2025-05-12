'use client';

import React, { useState, useEffect, useRef } from 'react';
import HackerTypingEffect from '../HackerTypingEffect';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentBotText, setCurrentBotText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const textareaRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const shouldScrollRef = useRef(false); // Changed to false by default

  // API endpoint
  const API_URL = 'https://personal-ai-model-built-in-scikit-learn.onrender.com/chat/';

  useEffect(() => {
    // Add initial greeting on first load, but don't auto-scroll
    if (messages.length === 0) {
      const greeting = "Hello! I'm Nikhil Bhagat's AI assistant. How can I help you today?";
      setTimeout(() => {
        // Add greeting without forcing scroll
        setCurrentBotText(greeting);
        setIsTypingComplete(false);
        setMessages([{ text: '', isUser: false, isTyping: true }]);
      }, 800);
    }

    // Don't auto-focus the chat input on page load
    // This prevents the browser from scrolling to the chat

    // Mark initial render complete after component mounts
    setInitialRender(false);
  }, []);

  useEffect(() => {
    // Auto-resize textarea based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    // Only scroll within the chat container, not the page
    // And only when user has interacted with the chat
    if (shouldScrollRef.current && messagesEndRef.current && chatMessagesRef.current) {
      // Use scrollIntoView with options that prevent page scrolling
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [messages, initialRender]);

  // Check if user has scrolled up and is reading previous messages
  const handleScroll = () => {
    if (!chatMessagesRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current;
    const isCloseToBottom = scrollHeight - scrollTop - clientHeight < 100;

    // Only auto-scroll if we're already near the bottom
    shouldScrollRef.current = isCloseToBottom;
  };

  // Only enable auto-scrolling when user interacts with the chat
  const handleChatInteraction = () => {
    shouldScrollRef.current = true;
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current && chatMessagesRef.current) {
      // Use scrollIntoView with options that prevent page scrolling
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  };

  const addUserMessage = (message) => {
    shouldScrollRef.current = true; // Always scroll for user messages
    setMessages(prevMessages => [
      ...prevMessages,
      { text: message, isUser: true }
    ]);
  };

  const addBotMessage = (message) => {
    // Set the current text to be typed and mark typing as incomplete
    setCurrentBotText(message);
    setIsTypingComplete(false);

    // Add empty message that will be filled by the typing effect
    setMessages(prevMessages => [
      ...prevMessages,
      { text: '', isUser: false, isTyping: true }
    ]);
  };

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
    setIsTyping(false);

    // Update the last message with the complete text
    setMessages(prevMessages => {
      const newMessages = [...prevMessages];
      // Find the last bot message and update it
      for (let i = newMessages.length - 1; i >= 0; i--) {
        if (!newMessages[i].isUser) {
          newMessages[i] = {
            ...newMessages[i],
            text: currentBotText,
            isTyping: false
          };
          break;
        }
      }
      return newMessages;
    });
  };

  const handleSend = async () => {
    // Enable auto-scrolling when sending a message
    handleChatInteraction();

    const message = inputValue.trim();

    if (message) {
      addUserMessage(message);
      setInputValue('');
      setIsTyping(true);

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question: message })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Short delay to make the typing indicator visible
        setTimeout(() => {
          // Instead of immediately showing the message, we'll use the typing effect
          addBotMessage(data.answer);
        }, 800);

      } catch (error) {
        console.error('Error:', error);
        setIsTyping(false);

        // Add error message
        setTimeout(() => {
          addBotMessage("Sorry, I couldn't process your request. Please try again later.");
        }, 500);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else {
      // Enable auto-scrolling when typing
      handleChatInteraction();
    }
  };

  return (
    <div
      className="embedded-chat-container"
      // Enable auto-scrolling on click anywhere in the chat
      onClick={handleChatInteraction}
    >
      <div className="chat-header">
        <div className="avatar">
          <img
            src="https://github.com/NikeGunn/imagess/blob/main/nikhil.png?raw=true"
            alt="Nikhil Bhagat"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="header-info">
          <div className="header-title">Chat with Nikhil Bhagat</div>
          <div className="header-status">
            <div className="status-indicator"></div>
            Online
          </div>
        </div>
      </div>

      <div
        className="chat-messages"
        id="chat-messages"
        ref={chatMessagesRef}
        onScroll={handleScroll}
      >
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
              {!message.isUser && <div className="bot-icon">
                <img
                  src="https://github.com/NikeGunn/imagess/blob/main/nikhil.png?raw=true"
                  alt="Nikhil Bhagat"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>}
              <div className="message-content">
                {message.isUser ? (
                  message.text
                ) : message.isTyping ? (
                  // Only apply the typing effect to the latest bot message
                  index === messages.length - 1 && !isTypingComplete ? (
                    <HackerTypingEffect
                      text={currentBotText}
                      speed={2.5}
                      onComplete={handleTypingComplete}
                      className="hacker-text-style"
                    />
                  ) : (
                    message.text
                  )
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))}

          {isTyping && !currentBotText && (
            <div className="message bot-message typing-indicator active">
              <div className="bot-icon">
                <img
                  src="https://github.com/NikeGunn/imagess/blob/main/nikhil.png?raw=true"
                  alt="Nikhil Bhagat"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="message-content">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            ref={(el) => {
              chatInputRef.current = el;
              textareaRef.current = el;
            }}
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            rows="1"
            autoComplete="off"
          ></textarea>
          <button
            className="send-button"
            onClick={handleSend}
            disabled={inputValue.trim() === ''}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;