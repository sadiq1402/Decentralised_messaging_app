import React, { useState } from 'react';
import "../../src/FriendsList.css"; // Separate CSS file for FriendsList styling

const FriendsList = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'Eve', wallet: '0x9876...mnop' },
    { id: 2, name: 'Mallory', wallet: '0x4321...qrst' },
    { id: 3, name: 'Trent', wallet: '0x8765...uvwx' },
  ]);

  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendWallet, setNewFriendWallet] = useState('');

  const addFriend = (e) => {
    e.preventDefault();
    if (newFriendName.trim() && newFriendWallet.trim()) {
      setFriends([...friends, { id: friends.length + 1, name: newFriendName, wallet: newFriendWallet }]);
      setNewFriendName(''); // Clear input field
      setNewFriendWallet(''); // Clear input field
    }
  };

  return (
    <div className="friends-list-page">
      <h2>Your Friends</h2>
      <ul className="friends-list">
        {friends.map(friend => (
          <li key={friend.id} className="friend-item">
            <p>{friend.name}</p>
            <p>{friend.wallet}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={addFriend} className="add-friend-form">
        <input
          type="text"
          value={newFriendName}
          onChange={(e) => setNewFriendName(e.target.value)}
          placeholder="Friend's Name"
          className="add-friend-input"
        />
        <input
          type="text"
          value={newFriendWallet}
          onChange={(e) => setNewFriendWallet(e.target.value)}
          placeholder="Friend's Wallet Address"
          className="add-friend-input"
        />
        <button type="submit" className="add-friend-btn">Add Friend</button>
      </form>
    </div>
  );
};

export default FriendsList;
