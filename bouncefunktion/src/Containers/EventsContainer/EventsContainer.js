import './EventsContainer.css';
import EventsCreator from '../../Components/Events/EventsCreator/EventsCreator';

const EventsContainer = (props) => {
  // Event container should contain lots of information, I basically want a longish form for someone to fill out which details all the information you'd need for a night out

  // Type of event, e.g. club, festival or live music
  // Genre of music
  // Date of event
  // Start and end times of the event
  // Ticket price
  // Ticket purchase link
  // Location of event
  // Name of venue
  // Title of post
  // Description of event
  // Host of event
  return (
    <div>
      <p>Events information will go here</p>
      <EventsCreator />
    </div>
  );
};

export default EventsContainer;
