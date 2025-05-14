'use client';

import React, { useState, useEffect, useRef } from 'react';
import HackerTypingEffect from '../HackerTypingEffect';
import MarkdownTypingEffect from './MarkdownTypingEffect';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkBreaks from 'remark-breaks';
import CopyButton from './CopyButton';
import 'highlight.js/styles/github-dark.css';
import 'highlight.js/styles/atom-one-dark.css'; // A better style for code

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentBotText, setCurrentBotText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const [sessionId, setSessionId] = useState(null); // Add state for session ID
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const textareaRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const shouldScrollRef = useRef(false); // Changed to false by default

  // API endpoint from environment variable - fallback is just a placeholder
  // The actual URL will only be set in the .env file, not in the code
  const API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || '/api/chat';

  // Load session ID from localStorage on component mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chat_session_id');
    if (savedSessionId) {
      setSessionId(savedSessionId);
    }
  }, []);

  useEffect(() => {
    // Add initial greeting on first load, but don't auto-scroll
    if (messages.length === 0) {
      const greeting = "Hello! I'm Hauba Nikhil Bhagat's AI assistant. How can I help you today?";
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

  // Save session ID to localStorage whenever it changes
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('chat_session_id', sessionId);
    }
  }, [sessionId]);

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
        // Create request body with question and session ID if available
        const requestBody = {
          question: message
        };

        // Add session ID to request if we have one
        if (sessionId) {
          requestBody.session_id = sessionId;
        }

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Store the session ID from the response
        if (data.session_id) {
          setSessionId(data.session_id);
        }

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

  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match && match[1] ? match[1] : '';

    // Improved approach to extract code content properly
    const getCodeContent = () => {
      // First try to get the raw text content for better preservation of formatting
      if (typeof children === 'string') {
        return children;
      }

      // For handling React element children arrays
      if (Array.isArray(children)) {
        // Map through and collect all text content while preserving line breaks
        return React.Children.toArray(children)
          .map(child => {
            if (typeof child === 'string') return child;
            // Handle React elements that might contain strings
            if (child?.props?.children) {
              if (typeof child.props.children === 'string') {
                return child.props.children;
              }
              // Recursively handle deeper nested elements
              if (Array.isArray(child.props.children)) {
                return child.props.children.map(c =>
                  typeof c === 'string' ? c : ''
                ).join('');
              }
            }
            return '';
          })
          .join('');
      }

      // Fallback for other scenarios
      return String(children || '');
    };

    const codeContent = getCodeContent();

    return !inline ? (
      <div className="code-block-container" data-language={language}>
        <div className="code-block-header">
          <span className="code-language">{language}</span>
          <CopyButton textToCopy={codeContent} />
        </div>
        <pre className="code-block">
          <code
            className={className}
            {...props}
          >
            {children}
          </code>
        </pre>
      </div>
    ) : (
      <code className="inline-code" {...props}>
        {children}
      </code>
    );
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
            src="https://github.com/NikeGunn/imagess/blob/main/Hauba__5_-removebg-preview.png?raw=true"
            alt="Nikhil Bhagat"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="header-info">
          <div className="header-title">Chat with Hauba</div>
          <div className="header-status">
            <div className="status-indicator"></div>
            {sessionId ? 'Active Conversation' : 'Online'}
          </div>
        </div>
        {sessionId && (
          <button
            onClick={() => {
              setSessionId(null);
              localStorage.removeItem('chat_session_id');
              setMessages([]);
              setTimeout(() => {
                const greeting = "Hello! I'm Hauba Nikhil Bhagat's AI assistant. How can I help you today?";
                setCurrentBotText(greeting);
                setIsTypingComplete(false);
                setMessages([{ text: '', isUser: false, isTyping: true }]);
              }, 300);
            }}
            className="reset-button"
            title="Reset conversation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
          </button>
        )}
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
                  src="https://github.com/NikeGunn/imagess/blob/main/Hauba__5_-removebg-preview.png?raw=true"
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
                    <div className="markdown-content">
                      <MarkdownTypingEffect
                        text={currentBotText}
                        speed={2.5}
                        onComplete={handleTypingComplete}
                        className="hacker-text-style"
                        components={{
                          pre: ({ node, ...props }) => (
                            <div style={{ position: 'relative' }} {...props} />
                          ),
                          code: CodeBlock,
                          ul: ({ node, ...props }) => (
                            <ul className="markdown-list" {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="markdown-list" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="markdown-list-item" {...props} />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="markdown-paragraph" {...props} />
                          )
                        }}
                      />
                    </div>
                  ) : (
                    message.text
                  )
                ) : (
                  <div className="markdown-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      rehypePlugins={[rehypeRaw, rehypeHighlight]}
                      components={{
                        pre: ({ node, ...props }) => (
                          <div style={{ position: 'relative' }} {...props} />
                        ),
                        code: CodeBlock,
                        ul: ({ node, ...props }) => (
                          <ul className="markdown-list" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol className="markdown-list" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="markdown-list-item" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="markdown-paragraph" {...props} />
                        )
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
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