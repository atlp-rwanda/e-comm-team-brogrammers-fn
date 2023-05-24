/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import socketio from 'socket.io-client';

const token = localStorage.getItem('token');
export const getSocket = () => {
  if (token) {
    return socketio.connect(process.env.REACT_APP_SERVER_URL, {
      auth: { token },
    });
  }
  return socketio.connect(process.env.REACT_APP_SERVER_URL);
};

export const SocketContext = React.createContext();
