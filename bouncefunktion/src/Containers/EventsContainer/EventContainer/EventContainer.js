import { useState } from 'react';
import Event from '../../../Components/Events/Event/index';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { GiMicrophone } from 'react-icons/gi';
import { SiDiscogs } from 'react-icons/si';
import { GiBarracksTent } from 'react-icons/gi';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

const EventContainer = (props) => {
  const eventIconCalculator = (eventType) => {
    'fest, club, live, other';

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

  return (
    <div>
      <Event.Container>
        {props.eventsArray.map((event) => {
          return (
            <Event key={event.id} eventData={event.data}>
              <Event.Top>
                <Event.Title>{event.data.eventName}</Event.Title>
                <Event.Icon onClick={() => props.clickedInterested(event.id)}>
                  {event.interested ? (
                    <DoneIcon style={{ color: 'green' }} />
                  ) : (
                    <DoneIcon />
                  )}
                  Interested
                </Event.Icon>
                <Event.Icon onClick={() => props.clickedAttending(event.id)}>
                  {event.attending ? (
                    <HowToRegIcon style={{ color: 'cyan' }} />
                  ) : (
                    <HowToRegIcon />
                  )}
                  Attending
                </Event.Icon>
              </Event.Top>

              <Event.Body>
                <Event.AdditionalInfo>
                  <Event.Image src={event.data.hostProfilePic} />
                  <Event.Text style={{ textAlign: 'left' }}>
                    Description: {event.data.eventDescription}
                  </Event.Text>
                  <Event.Text>
                    Date: {getDate(event.data.eventDate.seconds)}
                  </Event.Text>
                </Event.AdditionalInfo>

                <Event.AdditionalInfo>
                  <Event.Pane>
                    <Event.Subtitle>Venue</Event.Subtitle>
                    <Event.Text>{event.data.eventVenueName}</Event.Text>
                    <Event.Text>{event.data.eventLocation}</Event.Text>
                  </Event.Pane>

                  <Event.Pane>
                    <Event.Subtitle>Event</Event.Subtitle>
                    {eventIconCalculator(event.data.eventType)}
                    <Event.Text>Genre: {event.data.eventGenre}</Event.Text>
                  </Event.Pane>
                  {/* <Event.Text>{event.data.eventDate}</Event.Text> */}
                  <Event.Pane>
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
