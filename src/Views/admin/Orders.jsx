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
import { useDispatch } from 'react-redux';
import Pagination from '../../components/paginationbuttons';
import DeleteOrder from '../../components/orders/delete';
import UpdateStatus from '../../components/orders/updateStatus';

import { updateOrderStatus } from '../../redux/features/slices/orders';

function AdminOrders() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState({ data: [] });
  const [error, setError] = useState('');
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const eventSource = new EventSource(
        `${process.env.REACT_APP_SERVER_URL}/order/sse`
      );

      eventSource.onmessage = (event) => {
        const updatedOrder = JSON.parse(event.data).orders[0];
        setOrders((prevOrders) => {
          const updatedData = prevOrders.data.map((order) =>
            order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order
          );
          return { data: updatedData };
        });
      };

      // eventSource.onerror = (newerror) => {
      //   setError('Failed to connect to real-time updates');
      //   console.error(newerror);
      // };

      return () => {
        eventSource.close();
      };
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/checkout/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders({ data: response.data.orders.results });
      } catch (err) {
        setError(err.response.data.message);
      }
    };

    fetchOrders();
  }, []);

  // Rest of the component code...
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = orders.data.slice(indexOfFirstRow, indexOfLastRow);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    // JSX code for the component...
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
              className={location.pathname === '/admin/orders' ? 'active' : ''}
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
          <h2>Orders</h2>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>order ID</th>
                <th>Is Paid</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((order) => (
                <tr key={order.id}>
                  <td data-label="UserEmail">{order.buyer.email}</td>
                  <td data-label="order ID">{order.id}</td>
                  <td data-label="IsPaid">{order.isPaid.toString()}</td>
                  <td data-label="Amount">{order.totalAmount}</td>
                  <td data-label="Status">{order.status}</td>
                  <td data-label="Action" className="action">
                    <UpdateStatus order={order} />
                    <DeleteOrder order={order} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(orders.data.length / rowsPerPage)}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
