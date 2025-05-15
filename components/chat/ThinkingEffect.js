import React, { useEffect, useState } from 'react';

const ThinkingEffect = () => {
  const [dots, setDots] = useState('');
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const thoughts = [
    'Thinking',
    'Processing',
    'Analyzing',
    'Loading'
  ];

  // Rotate through the thinking phrases
  useEffect(() => {
    const thoughtInterval = setInterval(() => {
      setThoughtIndex((prevIndex) => (prevIndex + 1) % thoughts.length);
    }, 2000); // Change phrases every 2 seconds

    return () => clearInterval(thoughtInterval);
  }, []);

  // Animate the dots
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) return '';
        return prevDots + '.';
      });
    }, 300); // Change dots every 300ms

    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div style={{
      padding: '12px',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '16px',
        fontWeight: '500',
        color: '#e2f8ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {thoughts[thoughtIndex]}
        <span style={{
          width: '24px',
          textAlign: 'left',
          marginLeft: '4px'
        }}>
          {dots}
        </span>
      </div>
    </div>
  );
};

export default ThinkingEffect;