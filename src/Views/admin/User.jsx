/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import EditUserForm from './EditUserForm';
import deleteUser from './DeleteUser';
import disableUser from './Disable';
import Pagination from '../../components/paginationbuttons';
import CreateUserForm from './CreateUser';
import Links from './links';

function AdminDashboard() {
  const [users, setUsers] = useState({
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
        .get(`${process.env.REACT_APP_SERVER_URL}/users/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUsers({
            data: response.data.results,
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
  const currentRows = users.data.slice(indexOfFirstRow, indexOfLastRow);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (user) => {
    deleteUser(user, setUsers);
  };

  const handleDisableUser = (user) => {
    disableUser(user, setUsers);
  };

  const handleAddUserClick = () => {
    setShowCreateUserForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateUserForm(false);
  };

  return (
    <div className="containerx">
      <Links />
      <div className="content">
        <div className="upper">
          {!showCreateUserForm && <h2>Users</h2>}
          {!showCreateUserForm && (
            <button onClick={handleAddUserClick} data-testid="add-user-button">
              Add User
            </button>
          )}
        </div>
        {showCreateUserForm && <CreateUserForm onClose={handleCloseForm} />}
        {error && <div className="error">{error}</div>}
        {!showCreateUserForm &&
          (editingUser ? (
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
                        <button onClick={() => handleEditUser(user)}>
                          Edit
                        </button>
                        <button
                          className="delete"
                          onClick={() => handleDeleteUser(user)}
                          data-testid="delete-button"
                        >
                          Delete
                        </button>
                        <button
                          className="Disable"
                          onClick={() => handleDisableUser(user)}
                        >
                          {user.disabledUser ? 'Enable' : 'Disable'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={Math.ceil(users.data.length / rowsPerPage)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
