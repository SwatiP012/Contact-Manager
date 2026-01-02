import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  const location = useLocation();

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/contacts'>
          <i className={icon} /> {title}
        </Link>
      </h1>

      <ul className="nav-tabs">
        <li className={location.pathname === '/contacts' ? 'active' : ''}>
          <Link to="/contacts">Contacts</Link>
        </li>
        <li className={location.pathname === '/add-contact' ? 'active' : ''}>
          <Link to="/add-contact">Add Contact</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Contact Manager',
  icon: 'fas fa-id-card-alt'
};

export default Navbar;
