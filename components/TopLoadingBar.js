// components/TopLoadingBar.js

import React, { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

const TopLoadingBar = () => {
  const loadingBarRef = useRef(null);

  useEffect(() => {
    // Start the loading bar and simulate a task
    loadingBarRef.current?.continuousStart();

    const completeLoading = setTimeout(() => {
      loadingBarRef.current?.complete();
    }, 2000); // Simulate 2 seconds of loading

    return () => clearTimeout(completeLoading); // Cleanup timeout on unmount
  }, []);

  return <LoadingBar color="#22D3EE" height={4} ref={loadingBarRef} />;
};

export default TopLoadingBar;
