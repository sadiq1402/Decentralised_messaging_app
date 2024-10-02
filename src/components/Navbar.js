import React from 'react';
import "../../src/Navbar.css"; // Separate CSS file for Navbar

const Navbar = ({ connectWallet, walletAddress }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">DApp Messaging</a>
      </div>
      <div className="navbar-links">
        <a href="#users">All Users</a>
        <a href="#chat">Chat</a> {/* Anchor link to ChatPage */}
        <a href="#friend">Friend</a>
        <a href="#contact">Contact Us</a>
        
        <button className="navbar-login" onClick={connectWallet}>
          {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
