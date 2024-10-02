import React, { useState } from 'react';
import "../../src/ChatPage.css"; // Separate CSS file for ChatPage styling

const ChatPage = ({ friends }) => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alice', message: 'Hey there!', timestamp: new Date().toLocaleTimeString() },
    { id: 2, user: 'Bob', message: 'Hi! How are you?', timestamp: new Date().toLocaleTimeString() },
    { id: 3, user: 'Alice', message: 'I’m doing great, thanks!', timestamp: new Date().toLocaleTimeString() },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedFriend) {
      const currentTime = new Date().toLocaleTimeString(); // Get the current time
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'You',
        message: newMessage,
        to: selectedFriend.name,
        timestamp: currentTime, // Add the timestamp
      }]);
      setNewMessage(''); // Clear input field
    }
  };

  return (
    <div className="chat-page">
      <h2>Chat</h2>
      {friends.length > 0 ? (
        <>
          <div className="friend-selector">
            <label htmlFor="friend">Select Friend:</label>
            <select
              id="friend"
              value={selectedFriend ? selectedFriend.name : ''}
              onChange={(e) => {
                const friend = friends.find(f => f.name === e.target.value);
                setSelectedFriend(friend);
              }}
            >
              <option value="">-- Select a Friend --</option>
              {friends.map(friend => (
                <option key={friend.id} value={friend.name}>{friend.name}</option>
              ))}
            </select>
          </div>
          <div className="chat-box">
            {messages.filter(msg => msg.to === (selectedFriend ? selectedFriend.name : null) || msg.user === 'You').map((msg) => (
              <div key={msg.id} className="chat-message">
                <strong>{msg.user}: </strong>{msg.message}
                <span className="chat-timestamp"> {msg.timestamp}</span> {/* Display the timestamp */}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="chat-input-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn">Send</button>
          </form>
        </>
      ) : (
        <p>You have no friends to chat with. Add some friends to start chatting!</p>
      )}
    </div>
  );
};

export default ChatPage;
