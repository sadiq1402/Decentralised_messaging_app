import React from 'react';
import "../../src/Hero.css"; // Separate CSS file for Hero section

const Hero = () => {
  return (
    <section className="hero">
      <h1>Welcome to DApp Messaging</h1>
      <p>Decentralized and Secure Messaging at Your Fingertips</p>
      <button className="hero-btn" >Get Started</button>
    </section>
  );
};

export default Hero;
