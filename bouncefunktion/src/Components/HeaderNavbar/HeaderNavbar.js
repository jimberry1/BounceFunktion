import './HeaderNavbar.css';
import { Nav, Navbar } from 'react-bootstrap';
import Toggler from '../Theme/Toggler';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../Store/StateProvider';

const HeaderNavbar = (props) => {
  const [{ user }] = useStateValue();
  console.log(user);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          BounceFunktion
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={user ? '/feed' : '/signin?redirectTo=feed'}>
            Feed
          </Nav.Link>
          <Nav.Link as={Link} to={user ? '/mixes' : '/signin?redirectTo=mixes'}>
            Mixes
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={user ? '/events' : '/signin?redirectTo=events'}
          >
            Events
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={user ? '/community' : '/signin?redirectTo=community'}
          >
            Members
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={user ? '/profile' : '/signin?redirectTo=profile'}
          >
            Profile
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={user ? '/feedback' : '/signin?redirectTo=feedback'}
          >
            Feedback
          </Nav.Link>
        </Nav>
        <Toggler theme={props.theme} toggleTheme={props.toggleTheme} />
      </Navbar>
    </div>
  );
};

export default HeaderNavbar;
