import NavbarContainer from '../Containers/Navbar/NavbarContainer';
import Iframe from 'react-iframe';

const EventsPage = (props) => {
  return (
    <div>
      <NavbarContainer theme={props.theme} toggleTheme={props.themeToggler} />
      <p>Hi</p>
      <iframe
        src="https://open.spotify.com/embed/track/73X9X7kDgsm4YeHpc8prf6"
        width="300"
        height="380"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default EventsPage;
