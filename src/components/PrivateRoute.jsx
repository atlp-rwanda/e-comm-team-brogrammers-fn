import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ path, element }) {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return isLoggedIn ? (
    <Routes>
      <Route path={path} element={element} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
