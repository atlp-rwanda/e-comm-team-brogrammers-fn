/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './ChatIcon.scss';

function ChatIcon() {
  const handleClick = () => {};

  return (
    <div className="chat-icon" onClick={handleClick}>
      <i className="fas fa-comments" />
    </div>
  );
}

export default ChatIcon;
