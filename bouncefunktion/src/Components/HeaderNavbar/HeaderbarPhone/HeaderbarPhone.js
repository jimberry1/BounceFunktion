import React, { useState } from 'react';
import './HeaderbarPhone.css';
import { Nav, Navbar, Button, Form, FormControl } from 'react-bootstrap';
import Toggler from '../../Theme/Toggler';
import Sidebar from '../../../UI/Sidebar/Sidebar';

const HeaderNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="headerbarPhone__container">
        <div className="headerbarPhone__sidebar">
          <Sidebar />
        </div>
        <div className="headerbarPhone__title">
          <p>The Bounce Funktion</p>
        </div>
        <div className="headerbarPhone__toggler">
          <Toggler theme={props.theme} toggleTheme={props.toggleTheme} />
        </div>
      </div>
    </div>
  );
};

export default HeaderNavbar;
