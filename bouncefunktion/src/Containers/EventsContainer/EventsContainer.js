import './EventsContainer.css';
import { useState, useEffect } from 'react';
import EventsCreator from '../../Components/Events/EventsCreator/EventsCreator';
import BlueButton from '../../UI/Modal/Buttons/BlueButton/BlueButton';
import db from '../../firebase';
import { useStateValue } from '../../Store/StateProvider';
import Event from '../../Components/Events/Event/Event';

const EventsContainer = (props) => {
  // Event container should contain lots of information, I basically want a longish form for someone to fill out which details all the information you'd need for a night out

  const [showEventsCreator, setShowEventsCreator] = useState(false);
  const [eventsArray, setEventsArray] = useState(null);

  useEffect(() => {
    const eventsDbRef = db.collection('events');

    eventsDbRef.get().then(function (query) {
      setEventsArray(
        query.docs.map((record) => ({ id: record.id, data: record.data() }))
      );
    });
  }, []);

  const createEventToggler = () => {
    console.log('Button pressed');
    setShowEventsCreator((oldValue) => !oldValue);
  };

  let eventsToRender = null;

  if (eventsArray) {
    eventsToRender = eventsArray.map((event) => {
      return <Event key={event.id} eventData={event.data} />;
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BlueButton clicked={createEventToggler}>Create an Event</BlueButton>
      </div>
      <div>{showEventsCreator ? <EventsCreator /> : null}</div>
      <div>{eventsToRender}</div>
    </div>
  );
};

export default EventsContainer;
