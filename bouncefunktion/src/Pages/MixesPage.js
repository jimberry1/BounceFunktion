import NavbarContainer from '../Containers/Navbar/NavbarContainer';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import MixesCardsComponent from '../Components/MixesCardsComponent/MixesCardsComponent';
import MixesContainer from '../Containers/MixesContainer/MixesContainer';
import HeaderImage from '../Components/HeaderImage/HeaderImage';
const MixesPage = (props) => {
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px 25px',
    marginTop: '250px',
    border: '5px solid black',
    backgroundColor: 'gray',
    margin: 'auto',
  };

  return (
    <div>
      <NavbarContainer theme={props.theme} toggleTheme={props.themeToggler} />
      <HeaderImage
        backgroundImage="https://images.pexels.com/photos/681467/pexels-photo-681467.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        title="Funktion Mixes"
        subtitle="Explore mixes made by funktion members"
        topMargin="-100px"
        titleFontColour="white"
        subtitleFontColour="lightgray"
      />

      {/* <Container style={{ marginTop: '100px', padding: 'none' }}>
        <Row>
          <Col>
            <Image
              src="https://images.unsplash.com/photo-1584352914514-2dc81696b544?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
              fluid
            />
          </Col>
          <Col>
            <div style={styles}>
              <h3>
                We want to support our community by promoting playlists and
                mixes made by Bounce Funktion members
              </h3>
              <p>
                Unfortunately this functionality isn't available at the moment.
                Please check back at a later date
              </p>
            </div>
          </Col>
          <Col>
            <Image
              src="https://images.unsplash.com/photo-1583906660276-05afc6cee960?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
              fluid
            />
          </Col>
        </Row>
      </Container> */}
      <MixesContainer theme={props.theme} />
    </div>
  );
};

export default MixesPage;
