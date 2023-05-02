import React from 'react';
import imge from '../images/profile.jpeg';
import SearchBox from '../components/search';

function UserProfile() {
  return (
    <div>
      <div className="search">
        <SearchBox />
      </div>
      <div className="olivier">
        <div>
          <div className="content">
            <div className="profile">
              <img src={imge} alt="profile" />
              <h2>Jean Doe</h2>
            </div>
            <div>
              <ul className="tasks">
                <li>My Orders</li>
                <li>Wishlist</li>
                <li>Settings</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="title">
            <h2>Customer Profile</h2>
          </div>
          <div className="changes">
            <div className="icon-1">
              <p>User name:</p>
              <p>Email:</p>
              <p>Gender:</p>
              <p>Role:</p>
              <p>Date of birth:</p>
              <p>Cover Picture</p>
              <h4>New Password</h4>
            </div>
            <div className="icon-2">
              <h4>John Doe</h4>
              <h4>jean@gmail.com</h4>
              <h4>Male</h4>
              <h4>Seller</h4>
              <h4>2 Oct 2023</h4>
              <link rel="stylesheet" href="edit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
