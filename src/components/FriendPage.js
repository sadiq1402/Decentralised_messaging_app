import React from 'react';
import "../../src/FriendPage.css"; // Separate CSS file for FriendPage styling

const FriendPage = () => {
  // Dummy friend list
  const friends = [
    { id: 1, name: 'Eve', wallet: '0x9876...mnop' },
    { id: 2, name: 'Mallory', wallet: '0x4321...qrst' },
    { id: 3, name: 'Trent', wallet: '0x8765...uvwx' },
  ];

  return (
    <div className="friend-page">
      <h2>Your Friends</h2>
      <ul className="friends-list">
        {friends.map(friend => (
          <li key={friend.id} className="friend-item">
            <p>{friend.name}</p>
            <p>{friend.wallet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendPage;
