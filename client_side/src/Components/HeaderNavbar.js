import React from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import profileImage from '../assets/profile.png';
import useFetch from '../hooks/Fetch.hook.js';
import './HeaderNavbar.css';

const HeaderNavbar = () => {
  const navigate = useNavigate();
  const [{ apiData, isError }] = useFetch();

  const userLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  if (isError) {
    return <p>Error loading data.</p>; // Display an error message
  }

  return (
    <div className="header-navbar">
      <h1 className="header-title">Welcome To Aroha Technologies {apiData && apiData.username.toUpperCase()}</h1>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <strong>{apiData && apiData.position.toUpperCase()} </strong>
        <Image
            src={apiData?.profile || profileImage}
            alt="Profile Image"
            roundedCircle
            style={{ width: '30px', height: '30px' }}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu align="right">
          <div className='text-center'>
          <Link className='text-success text-decoration-none' to="/profile">Profile Settings</Link>
          </div>
          <Dropdown.Divider />
          <div className="text-center"> {/* Center the Logout link */}
            <Link className='text-danger text-decoration-none' onClick={userLogout} to='/'>
              Logout
            </Link>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default HeaderNavbar;