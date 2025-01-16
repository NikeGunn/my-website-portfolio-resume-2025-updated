import React, { useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';
import Router from 'next/router';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  const loadingBarRef = useRef(null);

  // Router events to handle the loading bar
  Router.events.on('routeChangeStart', () => loadingBarRef.current?.continuousStart());
  Router.events.on('routeChangeComplete', () => loadingBarRef.current?.complete());
  Router.events.on('routeChangeError', () => loadingBarRef.current?.complete());

  return (
    <>
      <LoadingBar
        color="#ffffff" // White color
        height={4}      // Height of the bar
        ref={loadingBarRef} // Ref for controlling the bar
      />
      <Component {...pageProps} />
    </>
  );
}

export default App;
