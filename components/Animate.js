"use client"; // Ensures this component is run only on the client-side

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Animate = ({ children, animation, delay }) => {
  useEffect(() => {
    AOS.init({
      duration: 600, // Reduced from 1000 to 600ms for faster animation
      once: true, // Trigger animation only once
      easing: 'ease-in-out', // Smooth transition
    });
  }, []);

  return (
    <div data-aos={animation} data-aos-delay={delay}>
      {children}
    </div>
  );
};

export default Animate;
