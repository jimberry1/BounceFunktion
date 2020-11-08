import './EventsCreator.css';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStateValue } from '../../../Store/StateProvider';
import { Container, Col, Row } from 'react-bootstrap';
import BlueButton from '../../../UI/Modal/Buttons/BlueButton/BlueButton';
import db from '../../../firebase';
import firebase from 'firebase';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const EventsCreator = () => {
  // Type of event, e.g. club, festival or live music
  // Genre of music
  // Date of event
  // Start and end times of the event -- Not at start
  // Ticket price -- Not at start
  // Ticket purchase link
  // Location of event
  // Name of venue
  // Title of post
  // Description of event
  // Host of event

  const classes = useStyles();

  const [{ user }, dispatch] = useStateValue('');
  const [name, setName] = useState('');
  const [typeOfEvent, setTypeOfEvent] = useState('');
  const [genreOfMusic, setGenreOfMusic] = useState('');
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );
  const [ticketLink, setTicketLink] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [venueName, setVenueName] = useState('');
  const [location, setLocation] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submitEventFormHandler = (e) => {
    e.preventDefault();

    const eventsRef = db.collection('events');

    eventsRef.add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      eventDate: selectedDate,
      eventName: name,
      eventType: typeOfEvent,
      eventGenre: genreOfMusic,
      eventTicketLink: ticketLink,
      eventDescription: eventDescription,
      eventVenueName: venueName,
      eventLocation: location,
      hostName: user.displayName,
      hostUid: user.uid,
      hostProfilePic: user.photoURL,
    });

    setRedirect(true);
  };

  let redirectComponent = null;

  if (redirect) {
    redirectComponent = <Redirect to={'/'} />;
  }

  return (
    <div className="eventsCreator__container">
      <div className="eventsCreator__title">
        <h2>Events Creator</h2>
      </div>
      {redirectComponent}

      <Container
        style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}
      >
        <form className={classes.root} noValidate autoComplete="off">
          <Row>
            <Col
            // style={{
            //   margin: 'auto',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            //   alignContent: 'center',
            //   width: '50%',
            // }}
            // md="auto"
            >
              <TextField
                required
                id="eventTitle"
                label="Event Title"
                placeholder="Enter the event title here..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="filled"
              />
            </Col>
            <Col>
              <TextField
                id="eventDescription"
                label="Event Description"
                placeholder="Please describe the event you are posting..."
                multiline
                rowsMax={4}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                variant="filled"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <TextField
                id="venueName"
                label="Venue Name"
                placeholder="Enter the venue name"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                variant="filled"
              />
            </Col>
            <Col>
              <TextField
                id="venueLocation"
                label="Location"
                placeholder="Enter the location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                variant="filled"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormControl className={classes.formControl}>
                <InputLabel id="typeOfEvent">Type of Event</InputLabel>
                <Select
                  labelId="selectTypeOfEvent"
                  id="selectTypeOfEvent"
                  label="event"
                  placeholder="event"
                  value={typeOfEvent}
                  onChange={(e) => setTypeOfEvent(e.target.value)}
                  variant="filled"
                >
                  <MenuItem value="fest">Festival</MenuItem>
                  <MenuItem value="club">Club night</MenuItem>
                  <MenuItem value="live">Live music</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col>
              <FormControl className={classes.formControl}>
                <InputLabel id="genre">Genre</InputLabel>
                <Select
                  labelId="setGenre"
                  id="demo-simple-select"
                  value={genreOfMusic}
                  onChange={(e) => setGenreOfMusic(e.target.value)}
                  variant="filled"
                >
                  <MenuItem value="techno">Techno</MenuItem>
                  <MenuItem value="disco">Disco</MenuItem>
                  <MenuItem value="rap">Rap</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                id="date"
                label="Event Date"
                type="date"
                defaultValue="2021-01-01"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Col>

            <Col>
              <TextField
                id="ticketLink"
                label="Ticket Link"
                placeholder="Ticket Link"
                value={ticketLink}
                onChange={(e) => setTicketLink(e.target.value)}
                variant="filled"
              />
            </Col>
          </Row>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BlueButton clicked={(e) => submitEventFormHandler(e)} style={{}}>
              Submit
            </BlueButton>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default EventsCreator;
