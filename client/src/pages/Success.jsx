import React, { useEffect } from "react";
import Jumbotron from '../components/jumbotron';

function Success() {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.replace('/');
    }, 5000);

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
