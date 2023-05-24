/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import './ChatIcon.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// eslint-disable-next-line import/no-named-as-default
import AddMessageThunk from '../redux/features/actions/addMessage';
import { addMessage } from '../redux/features/slices/getMessage';
import MessagesThunk from '../redux/features/actions/getMessage';
import messageSchema from '../validations/inputValidation';
import { showErrorMessage } from '../utils/toast';

function ChatIcon({ socket, room, user }) {
  const {
    chat: { messages },
    addMessage: { loading },
  } = useSelector((state) => state);
  const [typingText, setTypingText] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(messageSchema),
  });

  const handleTypingStart = () => {
    socket.emit('typing', { user: user.username, room, isTyping: true });
  };
  useEffect(() => {
    dispatch(MessagesThunk());
    socket.on('istyping', (data) => {
      setTypingText(`${data.user} is typing ...`);
      setTimeout(() => {
        setTypingText('');
      }, 1000);
    });

    socket.on('receive_message', (data) => {
      dispatch(addMessage(data));
    });
    return () => {
      socket.off('istyping');
      socket.off('receive_message');
    };
  }, [socket]);
  const onSubmit = async (message) => {
    try {
      const response = await dispatch(AddMessageThunk(message)).unwrap();
      const submitData = { ...response };
      const data = { ...submitData, user };
      await socket.emit('send_message', { data, room });
      dispatch(addMessage(data));
      reset();
    } catch (error) {
      showErrorMessage(error);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="chatbot">
      <div
        className="chat-icon"
        onClick={() => (user ? toggleChat() : showErrorMessage('Please login'))}
        data-testid="chat-icon"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" />
        </svg>
      </div>
      {isChatOpen && (
        <div className="chat-modal">
          <div className="back" onClick={toggleChat}>
            {' '}
          </div>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Brogrammers Public Chat</h2>
            </div>
            <div className="modal-body">
              {messages.map((message) => (
                <article
                  className={
                    message?.user?.username === user?.username ? 'mine' : ''
                  }
                  key={message?.id}
                >
                  <p className="meta">
                    {message?.user?.username}{' '}
                    <span className="timestamp">
                      <Moment fromNow date={message?.createdAt} />
                    </span>
                  </p>
                  <div className="chat-message">{message?.message}</div>
                </article>
              ))}
            </div>
            <p>
              <em> {`${typingText}`}</em>
            </p>
            <form
              className="modal-footer"
              onSubmit={(event) => {
                handleSubmit(onSubmit)(event);
              }}
            >
              <textarea
                type="text"
                placeholder="Type a message"
                onKeyDown={handleTypingStart}
                required
                {...register('message')}
              />
              {loading ? (
                <button className="btn" type="submit" disabled={true}>
                  <i className="fas fa-spinner fa-spin" />
                </button>
              ) : (
                <button type="submit" className="btn">
                  <i className="fas fa-paper-plane" />
                  Send
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default ChatIcon;
