'use client';

import { useEffect } from 'react';

const ScrollToTopWrapper = () => {
  useEffect(() => {
    // Ensure the page starts at the top on initial load
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollToTopWrapper;