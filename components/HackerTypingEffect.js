'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const HackerTypingEffect = ({ text, speed = 1, className = '', onComplete = () => {} }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const timerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const textRef = useRef(text);

  // Update the ref when text changes
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  // Random typing speed variations with optimization
  const getRandomTypingDelay = useCallback(() => {
    // Base delay is very short for ultra-fast typing
    const baseDelay = Math.max(3, 15 - (speed * 4)); // Faster base speed
    // Add randomness (occasionally types multiple characters at once for "hacker" effect)
    const burstProbability = Math.random();

    if (burstProbability > 0.7) { // Increased probability for burst mode
      // Burst mode - super fast (almost instant)
      return 1;
    } else if (burstProbability > 0.5) { // Increased probability for fast mode
      // Fast mode
      return baseDelay * 0.5;
    } else {
      // Normal mode (still very fast)
      return baseDelay + (Math.random() * baseDelay * 0.3); // Reduced randomness
    }
  }, [speed]);

  // Optimized typing function using refs to avoid closure issues
  const typeNextCharacter = useCallback(() => {
    if (currentIndexRef.current >= textRef.current.length) {
      setIsComplete(true);
      setShowDot(false);
      onComplete();
      return;
    }

    // Add more characters at once for better performance
    let charsToAdd = Math.min(15, Math.floor(Math.random() * 20) + 8); // More aggressive batching

    // Ensure we don't exceed text length
    if (currentIndexRef.current + charsToAdd > textRef.current.length) {
      charsToAdd = textRef.current.length - currentIndexRef.current;
    }

    // Add the characters in a batch
    const nextChunk = textRef.current.substring(
      currentIndexRef.current,
      currentIndexRef.current + charsToAdd
    );
    currentIndexRef.current += charsToAdd;

    setDisplayedText(prevText => prevText + nextChunk);

    // Schedule next chunk with variable timing
    const delay = getRandomTypingDelay();
    timerRef.current = setTimeout(typeNextCharacter, delay);
  }, [getRandomTypingDelay, onComplete]);

  // Main effect for typing animation with cleanup
  useEffect(() => {
    if (!text) return;

    // Reset when text changes
    setDisplayedText('');
    setIsComplete(false);
    setShowDot(true);
    currentIndexRef.current = 0;

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Start typing after a small initial delay
    timerRef.current = setTimeout(typeNextCharacter, 50);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [text, typeNextCharacter]);

  // Blinking cursor effect using RAF for better performance
  useEffect(() => {
    if (!cursorRef.current) return;

    let animationFrameId;
    let lastToggleTime = 0;
    const blinkInterval = 500; // 500ms toggle

    const animateCursor = (timestamp) => {
      if (!cursorRef.current || isComplete) return;

      // Only toggle visibility every 500ms
      if (timestamp - lastToggleTime >= blinkInterval) {
        cursorRef.current.style.opacity = cursorRef.current.style.opacity === '0' ? '1' : '0';
        lastToggleTime = timestamp;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isComplete]);

  // Handle scrolling with RAF for smoother performance
  useEffect(() => {
    if (!containerRef.current) return;

    const handleScroll = () => {
      if (containerRef.current) {
        requestAnimationFrame(() => {
          containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        });
      }
    };

    // Use a more efficient approach to update scroll position
    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(containerRef.current);

    // Clean up
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [displayedText]);

  return (
    <div
      ref={containerRef}
      className={`hacker-typing-container ${className}`}
      style={{
        fontFamily: 'monospace',
        position: 'relative',
        overflow: 'hidden',
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

// Prevent unnecessary re-renders
export default React.memo(HackerTypingEffect);