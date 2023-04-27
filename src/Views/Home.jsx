import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <h1>
        {' '}
        <Link to="/collection" data-testid="signup">
          seller Collection
        </Link>
        <Link to="/oneProduct" data-testid="signup">
          oneProduct
        </Link>
      </h1>
      {user && (
        <p>
          Welcome <b>{user.username}</b>
        </p>
      )}
    </>
  );
}
export default Home;
