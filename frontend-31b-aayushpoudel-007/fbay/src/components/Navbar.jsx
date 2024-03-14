import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../components/pictures/logo.png'; // Adjust the path based on your project structure

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            <img src={logo} alt="Logo" style={{ width: '30px', marginRight: '10px' }} />
            fBay
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/resetpassword">
                  Reset Password
                </Link>
              </li>
            </ul>

            <form className="d-flex gap-2" role="search">
              {user ? (
                <>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Hello, {user.firstName}!
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button onClick={handleLogout} className="dropdown-item">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                  {user && (
                    <Link to="/profile">
                      <img
                        src={require('../components/pictures/profilepic.png').default}
                        alt="Profile"
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          marginLeft: '10px',
                          cursor: 'pointer',
                        }}
                      />
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-danger">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-outline-success">
                    Register
                  </Link>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
