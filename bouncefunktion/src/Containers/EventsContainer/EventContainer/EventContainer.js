import Event from '../../../Components/Events/Event/index';

const EventContainer = (props) => {
  return (
    <div>
      <Event.Container>
        {props.eventsArray.map((event) => {
          return (
            <Event key={event.id} eventData={event.data}>
              <Event.Text>{event.data.eventName}</Event.Text>
              <Event.Text>{event.data.eventDescription}</Event.Text>
              <Event.Text>{event.data.eventVenueName}</Event.Text>
              <Event.Text>{event.data.eventLocation}</Event.Text>
              <Event.Text>{event.data.eventGenre}</Event.Text>
              {/* <Event.Text>{event.data.eventDate}</Event.Text> */}
              <Event.Text>{event.data.eventTicketLink}</Event.Text>
              <Event.Text>{event.data.eventTicketLink}</Event.Text>
              <Event.Text>{event.data.eventTicketLink}</Event.Text>
              <Event.Image src={event.data.hostProfilePic} />
              {/* <Event.Image src={event.data.eventTicketLink} /> */}
            </Event>
          );
        })}
      </Event.Container>
    </div>
  );
};

export default EventContainer;
