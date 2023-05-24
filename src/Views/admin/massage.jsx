/* eslint-disable no-unused-vars */
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
  faMessage,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import Pagination from '../../components/paginationbuttons';

function Adminmessage() {
  const [contacts, setcontacts] = useState({
    data: [],
  });
  const [error, setError] = useState('');
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/contact`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setcontacts({
            data: response.data.contacts,
          });
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = contacts.data.slice(indexOfFirstRow, indexOfLastRow);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };
  const handleAddUserClick = () => {
    setShowCreateUserForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateUserForm(false);
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
              to="/admin/orders"
              className={location.pathname === '/admin/orders'}
            >
              <FontAwesomeIcon icon={faCalendarDays} /> Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/message"
              className={location.pathname === '/admin/message' ? 'active' : ''}
            >
              <FontAwesomeIcon icon={faMessage} /> message
            </Link>
          </li>
          <li>
            <Link to="/admin/subscribes">
              <FontAwesomeIcon icon={faNewspaper} /> Subscribers
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
          <li>
            <Link to="/logs">
              <FontAwesomeIcon icon={faHistory} /> Activity Logs
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="upper">
          <h2>messages</h2>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>email</th>
                <th>message</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            {/* {console.log(orders)} */}
            <tbody>
              {currentRows.map((contact) => (
                <tr key={contact.id}>
                  <td data-label="User">{contact.username}</td>
                  <td data-label="email">{contact.email}</td>
                  <td data-label="message">{contact.message}</td>
                  <td data-label="Action" className="action">
                    <button onClick={() => contact}>reply</button>
                    <button
                      className="delete"
                      onClick={() => contact}
                      data-testid="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(contacts.data.length / rowsPerPage)}
          />
        </div>
      </div>
    </div>
  );
}

export default Adminmessage;
