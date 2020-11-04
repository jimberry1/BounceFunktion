import './EventsContainer.css';
import { useState, useEffect } from 'react';
import EventsCreator from '../../Components/Events/EventsCreator/EventsCreator';
import BlueButton from '../../UI/Modal/Buttons/BlueButton/BlueButton';

const EventsContainer = (props) => {
  // Event container should contain lots of information, I basically want a longish form for someone to fill out which details all the information you'd need for a night out

  const [showEventsCreator, setShowEventsCreator] = useState(false);

  const testMethod = () => {
    console.log('Button pressed');
    setShowEventsCreator((oldValue) => !oldValue);
  };
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BlueButton clicked={testMethod}>Create an Event</BlueButton>
      </div>
      {showEventsCreator ? <EventsCreator /> : null}
    </div>
  );
};

export default EventsContainer;
