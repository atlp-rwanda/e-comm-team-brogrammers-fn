import React from 'react';
import { SocketContext, getSocket } from '../utils/socket';
import Modal from './Modal';
// import io from 'socket.io-client';

function Chat() {
  return (
    <SocketContext.Provider value={getSocket()}>
      <div>
        <Modal />
      </div>
    </SocketContext.Provider>
  );
}

export default Chat;

// return (
//   <div>
//     <input />
//     <button onClick={sendMsg} type="button">
//       send
//     </button>
//   </div>
// );
