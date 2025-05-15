'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkBreaks from 'remark-breaks';

const MarkdownTypingEffect = ({ text, speed = 1, className = '', onComplete = () => {}, components }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const textRef = useRef(text);

  // Update the ref when text changes
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  // Memoize markdown plugins to prevent unnecessary re-creation
  const remarkPlugins = useMemo(() => [remarkGfm, remarkBreaks], []);
  const rehypePlugins = useMemo(() => [rehypeRaw, rehypeHighlight], []);

  // Random typing speed variations with optimization
  const getRandomTypingDelay = useCallback(() => {
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
  }, [speed]);

  // Optimized typing function that uses refs to avoid closures with stale values
  const typeNextCharacter = useCallback(() => {
    if (currentIndexRef.current >= textRef.current.length) {
      setIsComplete(true);
      onComplete();
      return;
    }

    // Batch multiple characters at once for performance
    let charsToAdd = Math.min(10, Math.floor(Math.random() * 15) + 5);

    // Ensure we don't exceed text length
    if (currentIndexRef.current + charsToAdd > textRef.current.length) {
      charsToAdd = textRef.current.length - currentIndexRef.current;
    }

    // Add the characters
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

  useEffect(() => {
    if (!text) return;

    // Reset when text changes
    setDisplayedText('');
    setIsComplete(false);
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

  return (
    <div
      ref={containerRef}
      className={`markdown-typing-container ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
        skipHtml={false}
      >
        {displayedText}
      </ReactMarkdown>
      {!isComplete && (
        <span className="typewriter-dot">▋</span>
      )}
    </div>
  );
};

// Prevent unnecessary re-renders
export default React.memo(MarkdownTypingEffect);