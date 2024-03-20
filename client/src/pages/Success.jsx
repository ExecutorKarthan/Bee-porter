import React, { useEffect } from "react";
import Jumbotron from '../components/jumbotron';

function Success() {
  // UseEffect hook to handle redirect
  useEffect(() => {
    // Set timer to redirect to the home page after 3 seconds
    const redirectTimer = setTimeout(() => {
      window.location.replace('/');
    }, 3000);
    // Cleanup function to clear the timer
    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div>
      <Jumbotron>
        <h1>Donation success!</h1>
        <h2>Thank you for helping the bees!</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;