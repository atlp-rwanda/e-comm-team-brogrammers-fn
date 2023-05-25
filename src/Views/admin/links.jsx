import React, { useState } from 'react';
import {
  faBars,
  faCalendarDays,
  faChartSimple,
  faNewspaper,
  faTimes,
  faTruck,
  faUser,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

function Links() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <button
        type="button"
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
          <NavLink to="/home">
            <FontAwesomeIcon icon={faChartSimple} /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/product">
            <FontAwesomeIcon icon={faTruck} /> Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/user">
            <FontAwesomeIcon icon={faUser} /> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders">
            <FontAwesomeIcon icon={faCalendarDays} /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/subscribes">
            <FontAwesomeIcon icon={faNewspaper} /> Subscribers
          </NavLink>
        </li>
        <li>
          <NavLink to="/newsletter">
            <FontAwesomeIcon icon={faNewspaper} /> Newsletter
          </NavLink>
        </li>
        <li>
          <NavLink to="/logs">
            <FontAwesomeIcon icon={faHistory} /> Activity Logs
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Links;
