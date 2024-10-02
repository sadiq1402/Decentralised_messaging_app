import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import UsersPage from './components/UsersPage';
import FriendsList from './components/FriendsList';
import ChatPage from './components/ChatPage';
import Footer from './components/Footer';
import './App.css'; // Include your CSS file for styling

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [friends, setFriends] = useState([
    { id: 1, name: 'Eve', wallet: '0x9876...mnop' },
    { id: 2, name: 'Mallory', wallet: '0x4321...qrst' },
    { id: 3, name: 'Trent', wallet: '0x8765...uvwx' },
  ]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this DApp.");
    }
  };

  const addFriend = (user) => {
    if (!friends.find(friend => friend.wallet === user.wallet)) {
      setFriends([...friends, user]);
    }
  };

  return (
    <>
      <Navbar connectWallet={connectWallet} walletAddress={walletAddress} />
      <Hero />
      <Features />
      <section id="users">
        <UsersPage onAddFriend={addFriend} />
      </section>
      <section id="friend">
        {walletAddress ? <FriendsList friends={friends} /> : <p>Please connect your wallet to see your friends.</p>}
      </section>
      <section id="chat">
        {walletAddress ? <ChatPage friends={friends} /> : <p>Please connect your wallet to access the chat.</p>}
      </section>
      <Footer />
    </>
  );
}

export default App;
