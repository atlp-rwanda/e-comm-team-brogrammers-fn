/* eslint-disable no-else-return */
/* eslint-disable react/no-array-index-key */
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
import EditUserForm from './EditUserForm';

function AdminDashboard() {
  const [users, setUsers] = useState({
    data: [],
    currentPage: 1,
    rowsPerPage: 13,
  });
  const [error, setError] = useState('');
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

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
          setUsers({
            data: response.data.results,
            currentPage: 1,
            rowsPerPage: 13,
          });
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  }, []);

  const handlePageChange = (page) => {
    setUsers({ ...users, currentPage: page });
  };

  const indexOfLastRow = users.currentPage * users.rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - users.rowsPerPage;
  const currentRows = users.data.slice(indexOfFirstRow, indexOfLastRow);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };
  const handleEditUser = (user) => {
    setEditingUser(user);
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
        {editingUser ? (
          <EditUserForm user={editingUser} />
        ) : (
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
                {currentRows.map((user) => (
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
                      <button onClick={() => handleEditUser(user)}>Edit</button>
                      <button className="delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {users.currentPage > 1 && (
                <button onClick={() => handlePageChange(users.currentPage - 1)}>
                  Prev
                </button>
              )}
              {Array(Math.ceil(users.data.length / users.rowsPerPage))
                .fill()
                .map((_, index) => {
                  const minPage = Math.max(users.currentPage - 1, 1);
                  const maxPage = Math.min(
                    users.currentPage + 1,
                    Math.ceil(users.data.length / users.rowsPerPage)
                  );
                  const showLeftEllipsis = minPage > 1;
                  const showRightEllipsis =
                    maxPage < Math.ceil(users.data.length / users.rowsPerPage);
                  if (
                    index + 1 === 1 ||
                    index + 1 ===
                      Math.ceil(users.data.length / users.rowsPerPage) ||
                    (index + 1 >= minPage && index + 1 <= maxPage)
                  ) {
                    return (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={
                          users.currentPage === index + 1 ? 'active' : ''
                        }
                        style={{ marginLeft: '5px', marginRight: '5px' }}
                      >
                        {index + 1}
                      </button>
                    );
                  } else if (
                    (index + 1 === minPage - 1 && showLeftEllipsis) ||
                    (index + 1 === maxPage + 1 && showRightEllipsis)
                  ) {
                    return (
                      <span
                        key={index}
                        style={{ marginLeft: '5px', marginRight: '5px' }}
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              {users.currentPage <
                Math.ceil(users.data.length / users.rowsPerPage) && (
                <button onClick={() => handlePageChange(users.currentPage + 1)}>
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
