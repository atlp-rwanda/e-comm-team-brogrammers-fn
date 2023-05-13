import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert2';
import logo from '../images/logo.png';
import UserThunk from '../redux/features/actions/user';
import LogoutThunk from '../redux/features/actions/logout';
import CartIcon from './headercart';
import NotificationPane from './NotificationPane/NotificationPane';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, loading: tokenLoad } = useSelector((s) => s.login);
  const { user, loading } = useSelector((s) => s.user);
  const {
    loading: logoutLoad,
    error: logoutError,
    logout: isLogout,
  } = useSelector((s) => s.logout);

  const logoutPopup = swal.mixin({
    customClass: {
      confirmButton: 'btn1 btn-success swal-button',
      cancelButton: 'btn1 btn-danger swal-button',
    },
    buttonsStyling: false,
  });

  useEffect(() => {
    if (!tokenLoad && token && !user) {
      setTimeout(() => dispatch(UserThunk()), 1000);
    }
  }, [token]);

  useEffect(() => {
    if (isLogout)
      logoutPopup
        .fire({
          title: 'Come back soon!',
          text: 'You have been logged out to your account!',
          iconHtml:
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>',
          confirmButtonText: 'Continue',
          iconColor: '#4c4',
        })
        .then(() => window.location.assign('/'));
  }, [logoutLoad, logoutError, isLogout]);

  const logout = useCallback(() => {
    logoutPopup
      .fire({
        text: 'Are you sure you want to sign out?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Sign out',
        reverseButtons: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          dispatch(LogoutThunk());
        }
      });
  }, []);

  const userDrop = useRef();
  const userDropContainer = useRef();
  const [userDropView, setUserDropView] = useState(false);

  const userDropFunct = useCallback(
    (event) => {
      const myBox = userDropContainer.current;
      const isClickInside = !!(myBox && myBox.contains(event.target));
      if (isClickInside) {
        if (userDrop.current.contains(event.target)) {
          setUserDropView(true);
          return;
        }
        setUserDropView((prev) => !prev);
      } else {
        setUserDropView(false);
      }
    },
    [userDropContainer, userDropContainer.current, userDrop.current]
  );

  useEffect(() => {
    const myBox = userDropContainer.current;
    if (!myBox || myBox == null) return;
    document.addEventListener('click', userDropFunct);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', userDropFunct);
    };
  }, [userDropContainer.current, userDropContainer, user]);

  useEffect(() => {
    const drop = userDrop.current;
    if (!drop) return;

    if (userDropView) drop.style.display = 'block';
    else drop.style.display = 'none';
  }, [userDropView, userDrop.current]);

  return (
    <header className="body-header">
      <h2
        aria-hidden="true"
        className="brand"
        onClick={() => navigate('/')}
        data-testid="brand"
      >
        <img alt="logo" src={logo} />
        <span>
          <span className="sec-color">B</span>-Mall
        </span>
      </h2>
      <div className="header">
        <nav className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Shop</Link>
            </li>
          </ul>
        </nav>
      </div>
      <nav className="menu">
        <NotificationPane />
        <Link to="/cart">
          <CartIcon />
        </Link>
        {!loading && user ? (
          <div className="user" ref={userDropContainer}>
            <div className="profile" aria-hidden="true" data-testid="profile">
              <img className="profile" alt="profile" src={user?.avatar} />
            </div>
            <div
              className="drop-down"
              ref={userDrop}
              style={{ display: 'none' }}
            >
              <div className="user-drop">
                <section className="top">
                  <div className="profile">
                    <img className="profile" alt="profile" src={user?.avatar} />
                  </div>
                  <h2>{user?.username}</h2>
                </section>
                <section>
                  <span>View Shop</span>
                  <Link to="/cart">Cart</Link>
                  <span>Edit Profile</span>
                  <Link to="/change-password">change password</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin/user">Dashboard</Link>
                  )}
                  {user && user.role.toLowerCase() !== 'buyer' && (
                    <span>
                      <Link to="collection" data-testid="signup">
                        your collection
                      </Link>
                    </span>
                  )}
                  <Link to="/wishlist">My Wishlist</Link>
                  {user && user.role.toLowerCase() !== 'buyer' && (
                    <button
                      type="button"
                      className="btn1"
                      onClick={() => navigate('/products/additem')}
                    >
                      Add product
                    </button>
                  )}
                </section>
                <section>
                  <NavLink to="/settings">Settings </NavLink>
                  <span
                    className="pointer"
                    data-testid="logout"
                    aria-hidden="true"
                    onClick={logout}
                  >
                    Logout
                  </span>
                </section>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" data-testid="login">
              Login
            </Link>
            <Link to="/signup" data-testid="signup">
              signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
