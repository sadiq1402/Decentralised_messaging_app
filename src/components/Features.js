import React from 'react';
import "../../src/Features.css"; // Separate CSS file for Features section

const Features = () => {
  return (
    <section className="features">
      <h2>Features</h2>
      <div className="features-grid">
        <div className="feature-item">
          <h3>Decentralized</h3>
          <p>Messages stored securely on the blockchain.</p>
        </div>
        <div className="feature-item">
          <h3>Encrypted</h3>
          <p>End-to-end encryption for maximum security.</p>
        </div>
        <div className="feature-item">
          <h3>Private</h3>
          <p>No central authority controls your messages.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
