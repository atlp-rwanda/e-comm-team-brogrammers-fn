import React from 'react';
import avatar from '../images/landing.jpg';

function Users({ username }) {
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <img
        className="object-cover w-10 h-10 rounded-full"
        src={avatar}
        alt="username"
      />
      <span className="block ml-2 font-bold text-gray-600">{username}</span>
      <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3" />
    </div>
  );
}

export default Users;
