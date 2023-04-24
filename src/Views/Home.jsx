import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
      <Link to="/login">Login</Link>
      <br />
      <Link to="/products">View Products</Link>
    </>
  );
}
export default Home;
