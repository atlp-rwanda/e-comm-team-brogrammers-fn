/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import Moment from 'react-moment';
import MessagesThunk from '../../redux/features/actions/getMessage';
import './Chat.scss';
import AddMessageThunk from '../../redux/features/actions/addMessage';
import { addMessage } from '../../redux/features/slices/getMessage';

function Chat() {
  const messages = useSelector((state) => state.chat.messages);
  const socket = io('http://localhost:5000');

  const [inputMsg, setInputMsg] = useState('');
  const [txt, setTxt] = useState('');
  const [allMessages, setMessages] = useState([]);
  const [typingText, setTypingText] = useState('');
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const chatMessagesRef = useRef(null);

  const handleJoinChat = useCallback(() => {
    socket.emit('joinRoom', { room: 'brogrammers' });
    console.log(`${user.email} joined chat`);
  }, []);

  const handleTypingStart = () => {
    socket.emit('typing', { email: user.email });
    socket.on('typing', (data) => {
      console.log(`You are typing ${data}`);
      setTypingText(`${data} is typing ...`);
      console.log(data);
      setTimeout(() => {
        setTypingText('');
      }, 1000);
    });
  };

  const getAllMessages = useCallback(() => {
    dispatch(MessagesThunk());
    socket.on('messages', (messages) => {
      setMessages(messages);
      dispatch(
        addMessage({
          message: inputMsg,
        })
      );
    });
  }, []);

  useEffect(() => {
    handleJoinChat();
    getAllMessages();
    socket.on('roomUsers', ({ room, users }) => {
      setUsers(users);
    });
  }, [socket]);

  useEffect(() => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages]);

  function handleInputChange(e) {
    setInputMsg(e.target.value);
    setTxt(e.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const res = await dispatch(
      AddMessageThunk({
        message: inputMsg,
      })
    ).unwrap();
    console.log(res);
    await socket.emit('chatMessage', inputMsg);
    dispatch(
      addMessage({
        message: inputMsg,
      })
    );
    if (inputMsg.trim() === '') {
      return;
    }
    setTxt('');
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
          <ul id="users">Hi</ul>
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
                    <Moment fromNow date={message.createdAt} />
                  </span>
                </p>
                <p className="text">{message.message}</p>
              </div>
            ))}
        </div>
      </main>
      <div className="chat-form-container">
        <p style={{ color: 'gold' }}>
          <p> {`${typingText}`}</p>
        </p>
        <form id="chat-form" onSubmit={handleSubmit}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            value={txt}
            onKeyUp={handleTypingStart}
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
