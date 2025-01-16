"use client";
import React, { useState, useEffect } from "react";
import TopLoadingBar from "../components/TopLoadingBar"; // Assuming TopLoadingBar is your loading bar component

const TopLoadingBarWrapper = () => {
  const [progress, setProgress] = useState(0);

  // This will control how fast the loading bar increases (in 1 second)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval); // Stop the interval when progress reaches 100%
          return 100;
        }
        return prevProgress + 1; // Increase by 1% per interval
      });
    }, 10); // Adjust the interval to make it complete in 1 second (10ms per step)
    
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <TopLoadingBar
      color="#f11946"
      progress={progress}
      height={4}
      animationDuration={10} // Adjust animation duration for a faster transition
      onLoaderFinished={() => setProgress(0)} // Reset the progress after it's finished
    />
  );
};

export default TopLoadingBarWrapper;
