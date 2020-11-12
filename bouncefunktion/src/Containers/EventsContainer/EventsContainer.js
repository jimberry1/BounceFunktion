import './EventsContainer.css';
import { useState, useEffect } from 'react';
import EventsCreator from '../../Components/Events/EventsCreator/EventsCreator';
import BlueButton from '../../UI/Modal/Buttons/BlueButton/BlueButton';
import db from '../../firebase';
import { useStateValue } from '../../Store/StateProvider';
import Event from '../../Components/Events/Event/index';
import EventContainer from './EventContainer/EventContainer';

const EventsContainer = (props) => {
  // Event container should contain lots of information, I basically want a longish form for someone to fill out which details all the information you'd need for a night out

  const [showEventsCreator, setShowEventsCreator] = useState(false);
  const [eventsArray, setEventsArray] = useState(null);
  const [eventSubmittedText, setEventSubmittedText] = useState('');

  useEffect(() => {
    const eventsDbRef = db.collection('events');

    eventsDbRef.get().then(function (query) {
      setEventsArray(
        query.docs.map((record) => ({
          id: record.id,
          data: record.data(),
          interested: false,
          attending: false,
        }))
      );
    });
  }, []);

  const interestChangedHandler = (id) => {
    console.log('interested handler');
    setEventsArray(
      eventsArray.map((event) => {
        if (event.id == id) {
          event.interested = !event.interested;
        }
        return event;
      })
    );
  };

  const attendingHandler = (id) => {
    setEventsArray(
      eventsArray.map((event) => {
        if (event.id == id) {
          event.attending = !event.attending;
        }
        return event;
      })
    );
  };

  const createEventToggler = () => {
    console.log('Button pressed');
    if (eventSubmittedText) {
      setEventSubmittedText('');
    }
    setShowEventsCreator((oldValue) => !oldValue);
  };

  const eventSubmittedHandler = () => {
    setEventSubmittedText('Thank you for submitting your event!');
    setShowEventsCreator(false);
  };

  let eventsToRender = null;

  if (eventsArray) {
    eventsToRender = (
      <EventContainer
        eventsArray={eventsArray}
        clickedInterested={(id) => interestChangedHandler(id)}
        clickedAttending={(id) => attendingHandler(id)}
      />
    );
    // eventsToRender = eventsArray.map((event) => {
    //   return <Event key={event.id} eventData={event.data} />;
    // });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BlueButton clicked={createEventToggler}>Create an Event</BlueButton>
      </div>
      <div>
        {showEventsCreator ? (
          <EventsCreator eventSubmitted={eventSubmittedHandler} />
        ) : null}
      </div>
      <div className="eventsContainer__submittedMessage">
        {eventSubmittedText}
      </div>
      <div>{eventsToRender}</div>
    </div>
  );
};

export default EventsContainer;
