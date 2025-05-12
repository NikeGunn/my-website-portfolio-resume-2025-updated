'use client';

import React, { useState, useEffect, useRef } from 'react';

const HackerTypingEffect = ({ text, speed = 1, className = '', onComplete = () => {} }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  // Random typing speed variations to make it look more human-like but extremely fast
  const getRandomTypingDelay = () => {
    // Base delay is very short for ultra-fast typing
    const baseDelay = Math.max(5, 20 - (speed * 4));
    // Add randomness (occasionally types multiple characters at once for "hacker" effect)
    const burstProbability = Math.random();

    if (burstProbability > 0.8) {
      // Burst mode - super fast (almost instant)
      return 1;
    } else if (burstProbability > 0.6) {
      // Fast mode
      return baseDelay * 0.5;
    } else {
      // Normal mode (still very fast)
      return baseDelay + (Math.random() * baseDelay * 0.5);
    }
  };

  useEffect(() => {
    if (!text) return;

    // Reset when text changes
    setDisplayedText('');
    setIsComplete(false);
    setShowDot(true);

    let currentIndex = 0;
    let typeNextCharacter;

    // Function to type the next character or chunk
    typeNextCharacter = () => {
      if (currentIndex >= text.length) {
        setIsComplete(true);
        setShowDot(false);
        onComplete();
        return;
      }

      // Determine how many characters to type at once (hacker effect)
      let charsToAdd = 1;
      const burstProbability = Math.random();

      if (burstProbability > 0.9) {
        // Occasionally type 5-10 characters at once (hacker burst mode)
        charsToAdd = Math.floor(Math.random() * 6) + 5;
      } else if (burstProbability > 0.7) {
        // Sometimes type 2-4 characters at once
        charsToAdd = Math.floor(Math.random() * 3) + 2;
      }

      // Ensure we don't exceed text length
      if (currentIndex + charsToAdd > text.length) {
        charsToAdd = text.length - currentIndex;
      }

      // Add the characters
      const nextChunk = text.substring(currentIndex, currentIndex + charsToAdd);
      currentIndex += charsToAdd;

      setDisplayedText(prevText => prevText + nextChunk);

      // Schedule next character with variable timing
      const delay = getRandomTypingDelay();
      setTimeout(typeNextCharacter, delay);
    };

    // Start typing after a small initial delay
    const initialTimer = setTimeout(typeNextCharacter, 100);

    return () => {
      clearTimeout(initialTimer);
    };
  }, [text, speed, onComplete]);

  // Blinking cursor effect for the dot
  useEffect(() => {
    if (!cursorRef.current) return;

    const blinkInterval = setInterval(() => {
      if (cursorRef.current && !isComplete) {
        cursorRef.current.style.opacity = cursorRef.current.style.opacity === '0' ? '1' : '0';
      }
    }, 500);

    return () => clearInterval(blinkInterval);
  }, [isComplete]);

  // Scroll only within the container as typing happens, not the entire page
  useEffect(() => {
    if (containerRef.current) {
      // This scroll is now confined to the container only
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [displayedText]);

  return (
    <div
      ref={containerRef}
      className={`hacker-typing-container ${className}`}
      style={{
        fontFamily: 'monospace',
        position: 'relative',
        overflow: 'hidden',
        // Ensure scrolling only happens within this container
        maxWidth: '100%',
        display: 'inline-block'
      }}
    >
      <span className="hacker-text">{displayedText}</span>
      {showDot && !isComplete && (
        <span className="typewriter-dot">▋</span>
      )}
      <span
        ref={cursorRef}
        className="hacker-cursor"
        style={{
          display: isComplete ? 'none' : 'inline-block',
          width: '2px',
          height: '1em',
          backgroundColor: '#30C2CB',
          verticalAlign: 'middle',
          marginLeft: '2px',
          animation: 'blink 1s infinite',
          transition: 'opacity 0.2s'
        }}
      ></span>
    </div>
  );
};

export default HackerTypingEffect;