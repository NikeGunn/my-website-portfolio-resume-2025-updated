import React, { useEffect, useState, useRef, memo } from 'react';

const ThinkingEffect = () => {
  const [dots, setDots] = useState('');
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const thoughtIntervalRef = useRef(null);
  const dotIntervalRef = useRef(null);

  // Reduce number of thoughts to improve performance
  const thoughts = [
    'Thinking',
    'Processing'
  ];

  // Rotate through the thinking phrases with performance optimizations
  useEffect(() => {
    // Clear existing interval if any
    if (thoughtIntervalRef.current) {
      clearInterval(thoughtIntervalRef.current);
    }

    thoughtIntervalRef.current = setInterval(() => {
      setThoughtIndex((prevIndex) => (prevIndex + 1) % thoughts.length);
    }, 2500); // Slower rotation to reduce state updates

    return () => {
      if (thoughtIntervalRef.current) {
        clearInterval(thoughtIntervalRef.current);
      }
    };
  }, []);

  // Animate the dots with reduced frequency
  useEffect(() => {
    // Clear existing interval if any
    if (dotIntervalRef.current) {
      clearInterval(dotIntervalRef.current);
    }

    dotIntervalRef.current = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) return '';
        return prevDots + '.';
      });
    }, 400); // Slower dot animation to reduce state updates

    return () => {
      if (dotIntervalRef.current) {
        clearInterval(dotIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="thinking-effect">
      <div className="thinking-text">
        {thoughts[thoughtIndex]}
        <span className="thinking-dots">
          {dots}
        </span>
      </div>
    </div>
  );
};

// Prevent unnecessary re-renders
export default memo(ThinkingEffect);