'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } from 'react';
import MarkdownTypingEffect from './MarkdownTypingEffect';
import ThinkingEffect from './ThinkingEffect';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkBreaks from 'remark-breaks';
import CopyButton from './CopyButton';
import { debounce } from 'lodash'; // We'll use lodash's debounce function
// Only import one highlight.js style, not both
import 'highlight.js/styles/atom-one-dark.css';

// Create optimized, memoized CodeBlock component outside the main component
const CodeBlock = React.memo(({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match && match[1] ? match[1] : '';

  // Improved approach to extract code content efficiently
  const codeContent = useMemo(() => {
    // For simple string children
    if (typeof children === 'string') return children;

    // For React element arrays, efficiently extract text content
    if (Array.isArray(children)) {
      return React.Children.toArray(children)
        .map(child => {
          if (typeof child === 'string') return child;
          // Handle direct React elements with string children
          if (child?.props?.children) {
            return typeof child.props.children === 'string'
              ? child.props.children
              : '';
          }
          return '';
        })
        .join('');
    }

    // Fallback
    return String(children || '');
  }, [children]);

  return !inline ? (
    <div className="code-block-container" data-language={language}>
      <div className="code-block-header">
        <span className="code-language">{language}</span>
        <CopyButton textToCopy={codeContent} />
      </div>
      <pre className="code-block">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  ) : (
    <code className="inline-code" {...props}>
      {children}
    </code>
  );
});

// Add display name for debugging
CodeBlock.displayName = 'CodeBlock';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [currentBotText, setCurrentBotText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [textareaHeight, setTextareaHeight] = useState('auto');

  // Refs
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const textareaRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const shouldScrollRef = useRef(false);

  // API endpoint
  const API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || '/api/chat';

  // Memoize markdown plugins to prevent unnecessary re-creation
  const remarkPlugins = useMemo(() => [remarkGfm, remarkBreaks], []);
  const rehypePlugins = useMemo(() => [rehypeRaw, rehypeHighlight], []);

  // Memoize markdown component configs
  const markdownComponents = useMemo(() => ({
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
  }), []);

  // Load session ID
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chat_session_id');
    if (savedSessionId) {
      setSessionId(savedSessionId);
    }
  }, []);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = "Hello! I'm Hauba Nikhil Bhagat's AI assistant. How can I help you today?";
      setTimeout(() => {
        setCurrentBotText(greeting);
        setIsTypingComplete(false);
        setMessages([{ text: '', isUser: false, isTyping: true }]);
      }, 800);
    }
    setInitialRender(false);
  }, [messages.length]);

  // Save session ID
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('chat_session_id', sessionId);
    }
  }, [sessionId]);

  // Create a debounced input change handler
  const debouncedInputHandler = useMemo(() =>
    debounce((value) => {
      setInputValue(value);
    }, 50), // Increase debounce time from 10ms to 50ms for better performance
  []);

  // Create a separate memoized handler for auto-resizing using RAF for better performance
  const autoResizeTextarea = useCallback(() => {
    if (!textareaRef.current) return;

    // Use requestAnimationFrame for smoother resize operations
    requestAnimationFrame(() => {
      // Store current scroll position of the textarea itself
      const scrollPos = textareaRef.current.scrollTop;
      const cursorPosition = textareaRef.current.selectionStart;

      // Reset height temporarily to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';

      // Calculate new height but cap it at max-height
      // This is key - we cap the height and let scrolling take over after that
      const calculatedScrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 150; // This should match the CSS max-height
      const newHeight = `${Math.min(maxHeight, calculatedScrollHeight)}px`;

      // Apply new height
      textareaRef.current.style.height = newHeight;

      // Only update state if height changed significantly to prevent unnecessary renders
      if (Math.abs(parseInt(textareaHeight) - parseInt(newHeight)) > 2) {
        setTextareaHeight(newHeight);
      }

      // Restore textarea scroll position and cursor
      textareaRef.current.scrollTop = scrollPos;
      if (document.activeElement === textareaRef.current) {
        textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
  }, [textareaHeight]);

  // Optimized input change handler with enhanced performance
  const handleInputChange = useCallback((e) => {
    // Use event.target.value directly for more consistent access
    const newValue = e.target.value;

    // Only perform DOM updates if we have a valid reference
    if (textareaRef.current) {
      // Store the selection position before modifying
      const selectionStart = textareaRef.current.selectionStart;
      const selectionEnd = textareaRef.current.selectionEnd;

      // Update value directly to avoid React re-rendering delays
      textareaRef.current.value = newValue;

      // Immediately run auto-resize after direct DOM update
      requestAnimationFrame(() => {
        autoResizeTextarea();

        // Restore cursor position after the resize
        if (document.activeElement === textareaRef.current) {
          textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
        }
      });
    }

    // Use debounced handler for state updates to avoid excessive renders
    debouncedInputHandler(newValue);
  }, [debouncedInputHandler, autoResizeTextarea]);

  // Optimized ref callback - memoized to prevent recreation on each render
  const textareaRefCallback = useCallback(element => {
    if (element) {
      textareaRef.current = element;
      chatInputRef.current = element;
      // Auto-resize on mount
      autoResizeTextarea();
    }
  }, [autoResizeTextarea]);

  // Apply the height style directly when it changes
  useEffect(() => {
    if (textareaRef.current && textareaHeight !== 'auto') {
      textareaRef.current.style.height = textareaHeight;
    }
  }, [textareaHeight]);

  // Cancel debounced functions on unmount
  useEffect(() => {
    return () => {
      debouncedInputHandler.cancel();
    };
  }, [debouncedInputHandler]);

  // Replace the old textarea auto-resize effect with a cleanup
  useEffect(() => {
    // Cleanup only - actual resizing is handled directly in the handleInputChange function
    return () => {
      // Clean up any resources if needed
    };
  }, [inputValue]);

  // Scroll handling - optimized to use RAF for smooth scrolling
  useEffect(() => {
    if (shouldScrollRef.current && messagesEndRef.current) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      });
    }
  }, [messages, initialRender]);

  // Check if user has scrolled up
  const handleScroll = useCallback(() => {
    if (!chatMessagesRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current;
    const isCloseToBottom = scrollHeight - scrollTop - clientHeight < 100;
    shouldScrollRef.current = isCloseToBottom;
  }, []);

  // Enable auto-scrolling
  const handleChatInteraction = useCallback(() => {
    shouldScrollRef.current = true;
  }, []);

  // Optimized code detection function
  const formatCodeInUserMessage = useCallback((text) => {
    // Quick checks to avoid unnecessary processing
    if (!text || text.includes('```')) {
      return text; // Already formatted or empty
    }

    const lines = text.split('\n');

    // Check for text + code pattern
    if (lines.length > 1) {
      const potentialCode = lines.slice(1).join('\n').trim();

      if (potentialCode && potentialCode.length > 0) {
        // Simplified code detection with regex
        const codePatterns = [
          /function\s*\w*\s*\([^)]*\)\s*\{/,  // function definitions
          /const|let|var\s+\w+\s*=/,          // variable declarations
          /import\s+.*\s+from/,               // imports
          /class\s+\w+/,                      // class definitions
          /<\w+[^>]*>.*<\/\w+>/s,             // HTML tags
          /\{[\s\S]*\}/                       // code blocks
        ];

        const looksLikeCode = codePatterns.some(pattern => pattern.test(potentialCode));

        if (looksLikeCode) {
          // Detect language
          let language = 'javascript';

          if (/def\s+\w+\s*\([^)]*\):|import\s+\w+\s*$|^\s*@/.test(potentialCode)) {
            language = 'python';
          } else if (/<html|<div|<span|<\//.test(potentialCode) && !(/import React|useState/.test(potentialCode))) {
            language = 'html';
          } else if (/\.\w+\s*\{|\#\w+\\s*\{|@media/.test(potentialCode)) {
            language = 'css';
          }

          return lines[0] + '\n\n```' + language + '\n' + potentialCode + '\n```';
        }
      }
    }

    // Check if entire message is code
    const codePatterns = [
      /function\s+\w+\s*\([^)]*\)\s*\{[\s\S]*\}/,
      /class\s+\w+\s*(extends\s+\w+)?\s*\{[\s\S]*\}/,
      /import\s+.*\s+from\s+['"].*['"];/,
      /<\w+[^>]*>[\s\S]*<\/\w+>/
    ];

    const isFullCode = codePatterns.some(pattern => pattern.test(text));

    if (isFullCode) {
      let language = 'javascript';

      if (/def\s+\w+\s*\([^)]*\):|import\s+\w+\s*$/.test(text)) {
        language = 'python';
      } else if (/<html|<div|<span|<\//.test(text) && !(/import React|useState/.test(text))) {
        language = 'html';
      } else if (/\.\w+\s*\{|\#\w+\s*\{|@media/.test(text)) {
        language = 'css';
      }

      return '```' + language + '\n' + text + '\n```';
    }

    return text;
  }, []);

  // Message handling functions
  const addUserMessage = useCallback((message) => {
    shouldScrollRef.current = true;
    const formattedMessage = formatCodeInUserMessage(message);

    setMessages(prevMessages => [
      ...prevMessages,
      { text: formattedMessage, isUser: true }
    ]);
  }, [formatCodeInUserMessage]);

  const addBotMessage = useCallback((message) => {
    setCurrentBotText(message);
    setIsTypingComplete(false);

    setMessages(prevMessages => [
      ...prevMessages,
      { text: '', isUser: false, isTyping: true }
    ]);
  }, []);

  const handleTypingComplete = useCallback(() => {
    setIsTypingComplete(true);
    setIsTyping(false);

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
  }, [currentBotText]);

  // Handle sending messages
  const handleSend = useCallback(async () => {
    handleChatInteraction();
    const message = inputValue.trim();

    if (!message) return;

    addUserMessage(message);
    setInputValue('');
    setIsThinking(true);

    try {
      // Create request body
      const requestBody = {
        question: message
      };

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

      if (data.session_id) {
        setSessionId(data.session_id);
      }

      setIsThinking(false);
      setIsTyping(true);

      setTimeout(() => {
        addBotMessage(data.answer);
      }, 300);
    } catch (error) {
      console.error('Error:', error);
      setIsThinking(false);
      setIsTyping(false);

      setTimeout(() => {
        addBotMessage("Sorry, I couldn't process your request. Please try again later.");
      }, 500);
    }
  }, [inputValue, sessionId, API_URL, addUserMessage, addBotMessage, handleChatInteraction]);

  // Optimize for key combinations and special inputs
  const handleKeyDown = useCallback((e) => {
    // Handle Enter key press for sending
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid adding a newline

      // Get the input value directly from the textarea for better performance
      const message = textareaRef.current?.value.trim();

      if (message) {
        // Update the value directly
        if (textareaRef.current) {
          textareaRef.current.value = '';
          // Reset height immediately
          textareaRef.current.style.height = 'auto';
          setTextareaHeight('auto');
        }

        // Execute send after DOM updates complete
        requestAnimationFrame(() => {
          handleSend();
        });
      }
    } else if (e.key === 'Tab') {
      // Prevent tab from leaving the textarea
      e.preventDefault();

      // Insert a tab character (4 spaces is common)
      if (textareaRef.current) {
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const spaces = '    ';

        // Insert spaces at cursor position
        const newValue = textareaRef.current.value.substring(0, start) +
                        spaces +
                        textareaRef.current.value.substring(end);

        // Update value directly
        textareaRef.current.value = newValue;

        // Set cursor position after the inserted tab
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + spaces.length;

        // Trigger resize and update state
        autoResizeTextarea();
        debouncedInputHandler(newValue);
      }
    } else {
      // Always handle chat interaction for other keys
      handleChatInteraction();
    }
  }, [handleSend, handleChatInteraction, autoResizeTextarea, debouncedInputHandler]);

  // Reset conversation
  const resetConversation = useCallback(() => {
    setSessionId(null);
    localStorage.removeItem('chat_session_id');
    setMessages([]);
    setTimeout(() => {
      const greeting = "Hello! I'm Hauba Nikhil Bhagat's AI assistant. How can I help you today?";
      setCurrentBotText(greeting);
      setIsTypingComplete(false);
      setMessages([{ text: '', isUser: false, isTyping: true }]);
    }, 300);
  }, []);

  // Render messages with memo to prevent unnecessary re-renders
  const renderMessages = useMemo(() => {
    return messages.map((message, index) => (
      <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
        {!message.isUser && (
          <div className="bot-icon">
            <img
              src="https://github.com/NikeGunn/imagess/blob/main/Hauba__5_-removebg-preview.png?raw=true"
              alt="Nikhil Bhagat"
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </div>
        )}
        <div className="message-content">
          {message.isUser ? (
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={remarkPlugins}
                rehypePlugins={rehypePlugins}
                components={markdownComponents}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          ) : message.isTyping ? (
            // Only apply typing effect to latest bot message
            index === messages.length - 1 && !isTypingComplete ? (
              <div className="markdown-content">
                <MarkdownTypingEffect
                  text={currentBotText}
                  speed={3} // Increase typing speed
                  onComplete={handleTypingComplete}
                  className="hacker-text-style"
                  components={markdownComponents}
                />
              </div>
            ) : (
              message.text
            )
          ) : (
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={remarkPlugins}
                rehypePlugins={rehypePlugins}
                components={markdownComponents}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    ));
  }, [messages, isTypingComplete, currentBotText, handleTypingComplete, markdownComponents, remarkPlugins, rehypePlugins]);

  return (
    <div
      className="embedded-chat-container"
      onClick={handleChatInteraction}
    >
      <div className="chat-header">
        <div className="avatar">
          <img
            src="https://github.com/NikeGunn/imagess/blob/main/Hauba__5_-removebg-preview.png?raw=true"
            alt="Nikhil Bhagat"
            className="w-full h-full object-cover rounded-full"
            loading="lazy"
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
            onClick={resetConversation}
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
          {renderMessages}

          {/* Thinking effect */}
          {isThinking && (
            <div className="message bot-message">
              <div className="bot-icon">
                <img
                  src="https://github.com/NikeGunn/imagess/blob/main/Hauba__5_-removebg-preview.png?raw=true"
                  alt="Nikhil Bhagat"
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>
              <div className="message-content">
                <ThinkingEffect />
                <div className="neural-network"></div>
              </div>
            </div>
          )}

          {/* Old simple typing indicator - replaced by ThinkingEffect */}
          {isTyping && !currentBotText && !isThinking && (
            <div className="message bot-message typing-indicator active">
              <div className="bot-icon">
                <img
                  src="https://github.com/NikeGunn/imagess/blob/main/Hauba__5_-removebg-preview.png?raw=true"
                  alt="Nikhil Bhagat"
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
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
            ref={textareaRefCallback}
            className="chat-input"
            defaultValue={inputValue} // Use defaultValue instead of value for better performance
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            rows="1"
            autoComplete="off"
            disabled={isThinking}
            style={{ height: textareaHeight, overflowY: 'auto' }}
          ></textarea>
          <button
            className="send-button"
            onClick={handleSend}
            disabled={!textareaRef.current?.value.trim() || isThinking}
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

// Prevent unnecessary re-renders of the entire component
export default React.memo(ChatComponent);