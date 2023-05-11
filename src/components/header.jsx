import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert2';
import logo from '../images/logo.png';
import UserThunk from '../redux/features/actions/user';
import LogoutThunk from '../redux/features/actions/logout';

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
      const isClickInside = myBox.contains(event.target);
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
          <span className="sec-color">B</span>rogrammers Mall
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
      <nav>
        <div>
          <svg
            width="57"
            height="57"
            viewBox="0 0 57 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_41_414)">
              <path
                d="M36.9313 30.875C38.7125 30.875 40.28 29.9013 41.0875 28.4288L49.59 13.015C50.4688 11.4475 49.3288 9.5 47.5238 9.5H12.3738L10.1413 4.75H2.375V9.5H7.125L15.675 27.5263L12.4688 33.3212C10.735 36.5037 13.015 40.375 16.625 40.375H45.125V35.625H16.625L19.2375 30.875H36.9313ZM14.63 14.25H43.4863L36.9313 26.125H20.2588L14.63 14.25ZM16.625 42.75C14.0125 42.75 11.8988 44.8875 11.8988 47.5C11.8988 50.1125 14.0125 52.25 16.625 52.25C19.2375 52.25 21.375 50.1125 21.375 47.5C21.375 44.8875 19.2375 42.75 16.625 42.75ZM40.375 42.75C37.7625 42.75 35.6488 44.8875 35.6488 47.5C35.6488 50.1125 37.7625 52.25 40.375 52.25C42.9875 52.25 45.125 50.1125 45.125 47.5C45.125 44.8875 42.9875 42.75 40.375 42.75Z"
                fill="#DDDDDD"
              />
            </g>
            <defs>
              <clipPath id="clip0_41_414">
                <rect width="57" height="57" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
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
                  <span>Cart</span>
                  <span>Edit Profile</span>
                  <Link to="/change-password">Change password</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin/user">Dashboard</Link>
                  )}
                  <span>
                    {' '}
                    <Link to="collection" data-testid="signup">
                      Your Collection
                    </Link>
                  </span>
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
