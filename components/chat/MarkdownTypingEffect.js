'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkBreaks from 'remark-breaks';

const MarkdownTypingEffect = ({ text, speed = 1, className = '', onComplete = () => {}, components }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef(null);

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

    let currentIndex = 0;
    let typeNextCharacter;

    // Function to type the next character or chunk
    typeNextCharacter = () => {
      if (currentIndex >= text.length) {
        setIsComplete(true);
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

  return (
    <div
      ref={containerRef}
      className={`markdown-typing-container ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={components}
      >
        {displayedText}
      </ReactMarkdown>
      {!isComplete && (
        <span className="typewriter-dot">▋</span>
      )}
    </div>
  );
};

export default MarkdownTypingEffect;