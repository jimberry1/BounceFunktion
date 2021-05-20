import './Sidebar.css';
import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Redirect } from 'react-router';
import { useStateValue } from '../../Store/StateProvider';
import { useHistory } from 'react-router';

const Sidebar = (props) => {
  // const [redirectLink, setRedirectLink] = useState(null);
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  const linkRedirect = (e, direct) => {
    e.preventDefault();
    user ? history.push(direct) : history.push(`/signin?redirectTo=${direct}`);
    // setRedirectLink(direct);
  };

  // let redirect = null;

  // if (redirectLink) {
  //   redirect = <Redirect to={redirectLink} />;
  // }

  return (
    <div>
      {/* {redirect} */}
      <Menu isOpen={props.isOpen}>
        <a
          id="home"
          className="menu-item"
          href="/"
          onClick={(e) => linkRedirect(e, '')}
        >
          Home
        </a>
        <a
          id="about"
          className="menu-item"
          href="/feed"
          onClick={(e) => linkRedirect(e, 'feed')}
        >
          Feed
        </a>
        <a
          id="about"
          className="menu-item"
          href="/mixes"
          onClick={(e) => linkRedirect(e, 'mixes')}
        >
          Mixes
        </a>
        <a
          id="contact"
          className="menu-item"
          href="/events"
          onClick={(e) => linkRedirect(e, 'events')}
        >
          Events
        </a>
        <a
          id="community"
          className="menu-item"
          href="/community"
          onClick={(e) => linkRedirect(e, 'community')}
        >
          Members
        </a>
        <a
          id="profile"
          className="menu-item--small"
          href="/profile"
          onClick={(e) => linkRedirect(e, 'profile')}
        >
          Profile
        </a>
        <a
          className="menu-item--small"
          href="/feedback"
          onClick={(e) => linkRedirect(e, 'feedback')}
        >
          Feedback
        </a>
      </Menu>
    </div>
  );
};

export default Sidebar;
