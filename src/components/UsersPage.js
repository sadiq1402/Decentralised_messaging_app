import React from 'react';
import "../../src/UsersPage.css"; // Separate CSS file for UsersPage styling

const UsersPage = ({ onAddFriend }) => {
  // Dummy users list
  const users = [
    { id: 1, name: 'Alice', wallet: '0x1234...abcd' },
    { id: 2, name: 'Bob', wallet: '0x5678...efgh' },
    { id: 3, name: 'Charlie', wallet: '0x9101...ijkl' },
  ];

  return (
    <div className="users-page">
      <h2>All Users</h2>
      <ul className="users-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <p>{user.name}</p>
            <p>{user.wallet}</p>
            <button onClick={() => onAddFriend(user)}>Add Friend</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
