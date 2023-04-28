/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartSimple,
  faTruck,
  faUser,
  faCalendarDays,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function AdminDashboard() {
  return (
    <div className="container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faChartSimple} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={faTruck} /> Product
            </Link>
          </li>
          <li>
            <Link to="/admin/user">
              <FontAwesomeIcon icon={faUser} /> Users
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <FontAwesomeIcon icon={faCalendarDays} /> Orders
            </Link>
          </li>
          <li>
            <Link to="/newsletter">
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
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Disabled</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John doe</td>
                <td>brogrammer@gmail.com</td>
                <td>Male</td>
                <td>Admin</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>ben@gmail.com</td>
                <td>Male</td>
                <td>buyer</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>Admin</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>Seller</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>seller</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>Admin</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>female</td>
                <td>Admin</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>Buyer</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>Admin</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>Seller</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>Seller</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>buyer</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>Admin</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>Admin</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>Admin</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>John doe</td>
                <td>john@example.com</td>
                <td>Male</td>
                <td>Admin</td>
                <td className="red">True</td>
                <td className="action">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>

              {/* Add more rows here if needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
