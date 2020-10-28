import { Jumbotron } from 'react-bootstrap';

const HeaderImage = (props) => {
  var styles = {
    backgroundImage: `url(${props.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // height: props.height ? props.height : '400px',
    // borderRadius: '0px',
    // borderBottom: '25px solid darkgray',
  };

  return (
    <div>
      <Jumbotron style={styles}>
        <h1 style={{ color: props.titleFontColour }}>{props.title}</h1>
        <p style={{ color: props.subtitleFontColour }}>{props.subtitle}</p>
      </Jumbotron>
    </div>
  );
};

export default HeaderImage;
