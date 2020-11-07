import './Sidebar.css';
import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Redirect } from 'react-router';

const Sidebar = (props) => {
  const [redirectLink, setRedirectLink] = useState(null);

  const linkRedirect = (e, direct) => {
    e.preventDefault();
    console.log('this is the ref= ' + direct);
    setRedirectLink(direct);
  };

  let redirect = null;

  if (redirectLink) {
    redirect = <Redirect to={redirectLink} />;
  }

  return (
    <div>
      {redirect}
      <Menu isOpen={props.isOpen}>
        <a
          id="home"
          className="menu-item"
          href="/"
          onClick={(e) => linkRedirect(e, '/')}
        >
          Home
        </a>
        <a
          id="about"
          className="menu-item"
          href="/feed"
          onClick={(e) => linkRedirect(e, '/feed')}
        >
          Feed
        </a>
        <a
          id="contact"
          className="menu-item"
          href="/events"
          onClick={(e) => linkRedirect(e, '/events')}
        >
          Events
        </a>
        <a
          className="menu-item--small"
          href="/profile"
          onClick={(e) => linkRedirect(e, '/profile')}
        >
          Profile
        </a>
      </Menu>
    </div>
  );
};

export default Sidebar;
