import './HeaderNavbar.css';
import { Nav, Navbar } from 'react-bootstrap';
import Toggler from '../Theme/Toggler';
import { Link } from 'react-router-dom';

const HeaderNavbar = (props) => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          BounceFunktion
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/feed">
            Feed
          </Nav.Link>
          <Nav.Link as={Link} to="/mixes">
            Mixes
          </Nav.Link>
          <Nav.Link as={Link} to="/events">
            Events
          </Nav.Link>
          <Nav.Link as={Link} to="/community">
            Members
          </Nav.Link>
          <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/feedback">
            Feedback
          </Nav.Link>
        </Nav>
        <Toggler theme={props.theme} toggleTheme={props.toggleTheme} />
      </Navbar>
    </div>
  );
};

export default HeaderNavbar;
