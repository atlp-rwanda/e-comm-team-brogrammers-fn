/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartSimple,
  faTruck,
  faUser,
  faCalendarDays,
  faNewspaper,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/users/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsers(response.data.results);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  }, []);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="containerx">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <button
          className="menu-btn"
          onClick={handleMenuClick}
          data-testid="menu-button"
        >
          {showMenu ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
        <ul
          className={`menu-list ${showMenu ? 'show' : ''}`}
          data-testid="menu-list"
        >
          <li>
            <Link
              to="/home"
              className={location.pathname === '/home' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faChartSimple} /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className={location.pathname === '/product' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faTruck} /> Product
            </Link>
          </li>
          <li>
            <Link
              to="/admin/user"
              className={location.pathname === '/admin/user' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faUser} /> Users
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className={location.pathname === '/orders' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faCalendarDays} /> Orders
            </Link>
          </li>
          <li>
            <Link
              to="/newsletter"
              className={location.pathname === '/newsletter' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faNewspaper} /> Newsletter
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="upper">
          <h2>Users</h2>
          <Link to="/add-user">
            <button>Add User</button>
          </Link>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Verified</th>
                <th>Disabled</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td data-label="Username">{user.username}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Gender">{user.gender}</td>
                  <td data-label="Role">{user.role}</td>
                  <td
                    data-label="Verified"
                    style={{ color: user.verified ? 'green' : 'red' }}
                  >
                    {user.verified ? 'True' : 'False'}
                  </td>
                  <td
                    data-label="Disabled"
                    style={{ color: user.disabledUser ? 'red' : 'green' }}
                  >
                    {user.disabledUser ? 'True' : 'False'}
                  </td>
                  <td data-label="Action" className="action">
                    <button>Edit</button>
                    <button className="delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
