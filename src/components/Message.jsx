import React from 'react';

function Message({ message, createdAt, username }) {
  return (
    <li className="flex justify-start">
      <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
        <span className="block">{message}</span>
      </div>
      <div className="relative right-0 top-0 mt-2 mx-2">
        <span className="text-gray-600">
          <time dateTime="2020-01-01" className="p-2 text-xs">
            {(createdAt && new Date(createdAt).toLocaleTimeString()) ||
              new Date().toLocaleTimeString()}
          </time>
        </span>
      </div>
      <div className="relative right-0 top-0 mt-2 mx-2">
        <span className="text-gray-600 text-sm">{username}</span>
      </div>
    </li>
  );
}

export default Message;
