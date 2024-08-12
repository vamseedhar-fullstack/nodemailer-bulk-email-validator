import React, { useState, useEffect } from 'react';

export const Loadingpage = () => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Start the timer when the component mounts
    const startTime = new Date().getTime();

    const timerId = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

      // Update the state to reflect the elapsed time
      setElapsedTime(elapsedSeconds);

      // Your timer logic here

    }, 1000);

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timerId);
      console.log('Timer stopped.');
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
        <div className='zindexxx'>Timer: {elapsedTime} seconds</div>
       <div className='d-flex flex-row justify-content-center align-items-center boxxx'>
      <div className="loader">Sending Mails
        <span></span>
      </div>
      
      {/* Display the timer on the page */}
    </div>

    </div>
   
  );
};
