import { useState } from 'react';
import Event from '../../../Components/Events/Event/index';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { GiMicrophone } from 'react-icons/gi';
import { SiDiscogs } from 'react-icons/si';
import { GiBarracksTent } from 'react-icons/gi';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { FaTicketAlt } from 'react-icons/fa';
import DropDownMenu from '../../../UI/DropDownMenu/DropDownMenu';
import Confetti from 'react-confetti';
const EventContainer = (props) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const eventIconCalculator = (eventType) => {
    switch (eventType) {
      case 'fest':
        return (
          <GiBarracksTent
            style={{ margin: 'auto', marginTop: '20px', flex: '1' }}
            size={42}
            color="#00FF7F"
          />
        );
      case 'club':
        return (
          <SiDiscogs
            style={{ margin: 'auto', marginTop: '20px', flex: '1' }}
            size={42}
            color="#FFA500"
          />
        );
      case 'live':
        return (
          <GiMicrophone
            style={{ margin: 'auto', marginTop: '20px', flex: '1' }}
            size={42}
            color="#CD5C5C"
          />
        );
      default:
        return (
          <PeopleOutlineIcon
            style={{ margin: 'auto', marginTop: '20px', flex: '1' }}
            size={42}
          />
        );
    }
  };

  const getDate = (epochSeconds) => {
    var date = new Date(0);

    date.setUTCSeconds(epochSeconds);

    return date.toLocaleDateString();
  };

  const clickedInterested = (id, interestedStatus) => {
    props.clickedInterested(id);

    let confettiShowStatus = false;
    if (!interestedStatus) {
      confettiShowStatus = true;
    }
    setShowConfetti(confettiShowStatus);
  };

  const clickedAttending = (id, attendingStatus) => {
    props.clickedAttending(id);

    let confettiShowStatus = false;
    if (!attendingStatus) {
      confettiShowStatus = true;
    }
    setShowConfetti(confettiShowStatus);
  };

  return (
    <div>
      <Event.Container>
        {props.eventsArray.map((event) => {
          return (
            <Event key={event.id} eventData={event.data} theme={props.theme}>
              {/* {showConfetti && (
                <Confetti
                  run={showConfetti}
                  recycle={false}
                  onConfettiComplete={() => setShowConfetti(false)}
                />
              )} */}
              <Event.Top>
                <Event.Title>{event.data.eventName}</Event.Title>
                <Event.IconHolder>
                  <Event.Icon
                    onClick={() =>
                      clickedInterested(event.id, event.interested)
                    }
                  >
                    {event.interested ? (
                      <DoneIcon style={{ color: 'green' }} />
                    ) : (
                      <DoneIcon />
                    )}
                    Interested
                  </Event.Icon>
                  <DropDownMenu
                    listItems={
                      event.data.interestedList ? event.data.interestedList : []
                    }
                  />
                  <Event.Icon
                    onClick={() => clickedAttending(event.id, event.attending)}
                  >
                    {event.attending ? (
                      <HowToRegIcon style={{ color: 'cyan' }} />
                    ) : (
                      <HowToRegIcon />
                    )}
                    Attending
                  </Event.Icon>
                  <DropDownMenu
                    style={{ marginLeft: '0px' }}
                    listItems={
                      event.data.attendingList ? event.data.attendingList : []
                    }
                  />
                </Event.IconHolder>
              </Event.Top>

              <Event.Body>
                <Event.DescriptionInfo>
                  <Event.Image src={event.data.hostProfilePic} />
                  <Event.Text style={{ textAlign: 'left' }}>
                    Description: {event.data.eventDescription}
                  </Event.Text>
                  <Event.Text>
                    Date: {getDate(event.data.eventDate.seconds)}
                  </Event.Text>
                </Event.DescriptionInfo>

                <Event.AdditionalInfo>
                  <Event.Pane>
                    <LocationOnIcon
                      style={{
                        margin: 'auto',
                        paddingBottom: '10px',
                        fontSize: '40px',
                      }}
                    />
                    <Event.Subtitle>Venue</Event.Subtitle>
                    <Event.Text>{event.data.eventVenueName}</Event.Text>
                    <Event.Text>{event.data.eventLocation}</Event.Text>
                  </Event.Pane>

                  <Event.Pane>
                    <EventNoteIcon
                      style={{
                        margin: 'auto',
                        paddingBottom: '10px',
                        fontSize: '40px',
                      }}
                    />

                    <Event.Subtitle>Event</Event.Subtitle>
                    {eventIconCalculator(event.data.eventType)}
                    <Event.Text>Genre: {event.data.eventGenre}</Event.Text>
                  </Event.Pane>
                  {/* <Event.Text>{event.data.eventDate}</Event.Text> */}
                  <Event.Pane>
                    <FaTicketAlt
                      size={40}
                      style={{ margin: 'auto', paddingBottom: '10px' }}
                    />

                    <Event.Subtitle>Tickets</Event.Subtitle>
                    <Event.Text>
                      {event.data.eventTicketLink
                        ? event.data.eventTicketLink
                        : 'No Link available'}
                    </Event.Text>
                  </Event.Pane>
                </Event.AdditionalInfo>
              </Event.Body>
              {/* <Event.Image src={event.data.eventTicketLink} /> */}
            </Event>
          );
        })}
      </Event.Container>
    </div>
  );
};

export default EventContainer;
