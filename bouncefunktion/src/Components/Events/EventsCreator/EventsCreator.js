import './EventsCreator.css';

const EventsCreator = () => {
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
    <div className="eventsCreator__container">
      <div className="eventsCreator__title">
        <h2>This is the events creator component</h2>
      </div>
      <p>
        Soon you'll be able to input details about a festival, night out or live
        music event and it will display for others to register their interest
        and buy tickets!
      </p>
    </div>
  );
};

export default EventsCreator;
