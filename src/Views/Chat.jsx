/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessagesThunk from '../redux/features/actions/getMessage';
import './Chat.scss';
import AddMessageThunk from '../redux/features/actions/addMessage';

function Chat() {
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const chatMessagesRef = useRef(null);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    dispatch(MessagesThunk());
  }, [dispatch]);

  useEffect(() => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages]);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const formattedTimestamp = `sent ${date.toLocaleString()}`;
    return formattedTimestamp;
  }
  function handleInputChange(event) {
    setInputMessage(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (inputMessage.trim() === '') {
      return;
    }
    dispatch(
      AddMessageThunk({
        message: inputMessage,
      })
    );
    setInputMessage('');
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile" /> ChatCord
        </h1>
        <a id="leave-btn" className="btn">
          Leave Room
        </a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments" /> Room Name:
          </h3>
          <h2 id="room-name" />
          <h3>
            <i className="fas fa-users" /> Users
          </h3>
          <ul id="users" />
        </div>
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <div className="message" key={message.id}>
                <p className="meta">
                  {message.user?.username}{' '}
                  <span className="timestamp">
                    {formatTimestamp(message.createdAt)}
                  </span>
                </p>
                <p className="text">{message.message}</p>
              </div>
            ))}
        </div>
      </main>
      <div className="chat-form-container">
        <p id="typing" style={{ color: 'gold' }} />
        <form id="chat-form" onSubmit={handleSubmit}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            value={inputMessage}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <button className="btn">
            <i className="fas fa-paper-plane" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
