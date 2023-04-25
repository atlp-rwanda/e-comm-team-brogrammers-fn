import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <h1>Homepage</h1>
      {user && (
        <p>
          Welcome <b>{user.username}</b>
        </p>
      )}
    </>
  );
}
export default Home;
