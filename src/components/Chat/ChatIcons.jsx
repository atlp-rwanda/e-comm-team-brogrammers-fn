import React from 'react';
import './ChatIcon.scss';
import { useSelector } from 'react-redux';

function ChatIcons() {
  const { user } = useSelector((state) => state.user);
  return (
    user && (
      <div className="chat-icon">
        <i className="fas fa-comments" />
      </div>
    )
  );
}

export default ChatIcons;
