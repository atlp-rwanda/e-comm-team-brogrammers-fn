/* eslint-disable react/button-has-type */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faUser,
  faCalendarDays,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';

function ButtonSts({
  totalCount,
  totalProductsCount,
  totalSubscribersCount,
  totalOrdersCount,
}) {
  return (
    <div className="btn_sts">
      <div className="card1">
        <button className="Dashtruck">
          <FontAwesomeIcon icon={faUser} className="dashtruck-icon" />
        </button>
        <div className="info">
          <h3>Users</h3>
          <h4>{totalCount}</h4>
        </div>
      </div>
      <div className="card1">
        <button className="DashUser">
          <FontAwesomeIcon icon={faTruck} className="dashuser-icon" />
        </button>
        <div className="info">
          <h3>Products</h3>
          <h4>{totalProductsCount}</h4>
        </div>
      </div>
      <div className="card1">
        <button className="DashSub">
          <FontAwesomeIcon icon={faNewspaper} className="dashsub-icon" />
        </button>
        <div className="info">
          <h3>Subcribers</h3>
          <h4>{totalSubscribersCount}</h4>
        </div>
      </div>
      <div className="card1">
        <button className="Dashorder">
          <FontAwesomeIcon icon={faCalendarDays} className="dashorder-icon" />
        </button>
        <div className="info">
          <h3>Orders</h3>
          <h4>{totalOrdersCount}</h4>
        </div>
      </div>
    </div>
  );
}

export default ButtonSts;
