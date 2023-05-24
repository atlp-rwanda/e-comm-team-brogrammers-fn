/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from '../utils/socket';
import Message from './Message';
import Users from './User';

function Messages({ userId }) {
  const socket = useContext(SocketContext);
  const { email } = useSelector((state) => state.user.user);
  const [allMessages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState([]);
  const [names, setNames] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  const [txt, setTxt] = useState('');

  const inputRef = useRef(null);

  const handleJoinChat = useCallback(() => {
    socket.emit('joinRoom', { room: 'brogrammers', email });
  }, [socket, email]);

  const handleMessage = useCallback(
    (message) => {
      setMsg((current) => [...current, message]);
      setNames((current) => [...current, message.firstname]);
    },
    [setMsg, setNames]
  );

  const getAllMessages = useCallback(() => {
    socket.emit('getMessages');
  }, [socket]);

  useEffect(() => {
    handleJoinChat();
    getAllMessages();
    inputRef.current.focus();
  }, [handleJoinChat, getAllMessages]);

  useEffect(() => {
    const handleReceivedMessage = ({ room, message, firstname, createdAt }) => {
      handleMessage({ room, message, firstname, createdAt });
    };
    const handleReceivedMessages = (messages) => {
      setMessages(messages);
    };
    const handleReceivedRoomUsers = ({ room, users }) => {
      setUsers(users);
    };

    socket.on('message', handleReceivedMessage);
    socket.on('messages', handleReceivedMessages);
    socket.on('roomUsers', handleReceivedRoomUsers);

    return () => {
      socket.off('message', handleReceivedMessage);
      socket.off('messages', handleReceivedMessages);
      socket.off('roomUsers', handleReceivedRoomUsers);
    };
  }, [socket, handleMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMsg) {
      socket.emit('chatMessage', inputMsg);
      setInputMsg('');
      setTxt('');
    }
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-2xl border rounded">
        <div>
          <div className="w-full">
            <div className="flex">
              {users.map((u) => (
                <Users key={u.id} firstname={u.firstname} />
              ))}
            </div>

            <div className="relative w-full p-6 overflow-y-auto">
              <ul className="space-y-2">
                {allMessages.map((element, index) => (
                  <Message
                    key={index}
                    createdAt={element.createdAt}
                    message={element.message}
                    firstname={element.User.firstname}
                  />
                ))}
                {msg.map((m, i) => (
                  <Message key={i} message={m} firstname={names[i]} />
                ))}
              </ul>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-between w-full p-3 border-t border-gray-300"
            >
              <input
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                onChange={(e) => {
                  setInputMsg(e.target.value);
                  setTxt(e.target.value);
                }}
                ref={inputRef}
                value={txt}
                required
              />

              <button type="submit">
                <svg
                  className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
