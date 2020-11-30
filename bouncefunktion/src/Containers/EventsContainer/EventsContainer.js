import './EventsContainer.css';
import { useState, useEffect } from 'react';
import EventsCreator from '../../Components/Events/EventsCreator/EventsCreator';
import BlueButton from '../../UI/Modal/Buttons/BlueButton/BlueButton';
import db from '../../firebase';
import { useStateValue } from '../../Store/StateProvider';
import EventContainer from './EventContainer/EventContainer';
import { Spinner } from 'react-bootstrap';
import EventsFilterBar from './EventsFilterBar/EventsFilterBar';
import Confetti from 'react-confetti';

const EventsContainer = (props) => {
  // Event container should contain lots of information, I basically want a longish form for someone to fill out which details all the information you'd need for a night out

  const [{ user }, dispatch] = useStateValue();
  const [showEventsCreator, setShowEventsCreator] = useState(false);
  const [eventsArray, setEventsArray] = useState(null);
  const [eventSubmittedText, setEventSubmittedText] = useState('');
  // const [recentlyCreatedEvents, setRecentlyCreatedEvents] = useState(null);

  // Gets the data for all of the events ordered by when they're occurring
  useEffect(() => {
    const eventsDbRef = db.collection('events').orderBy('eventDate', 'asc');

    eventsDbRef.get().then(function (query) {
      setEventsArray(
        query.docs.map((record) => ({
          id: record.id,
          data: record.data(),
          interested: record.data().interestedList.includes(user.displayName)
            ? true
            : false,
          attending: record.data().interestedList.includes(user.displayName)
            ? true
            : false,
        }))
      );
    });
  }, [user]);

  //Gets the id's of the 3 most recently added events and adds them to the recentlyCreatedEvents array
  // useEffect(() => {
  //   const eventsDbRef = db
  //     .collection('events')
  //     .orderBy('timestamp', 'desc')
  //     .limit(3);

  //   eventsDbRef.get().then(function (query) {
  //     setRecentlyCreatedEvents(
  //       query.docs.map((record) => ({
  //         id: record.id,
  //         data: record.data(),
  //         interested: record.data().interestedList.includes(user.displayName)
  //           ? true
  //           : false,
  //         attending: record.data().interestedList.includes(user.displayName)
  //           ? true
  //           : false,
  //       }))
  //     );
  //   });
  // }, [user]);

  const interestChangedHandler = (id) => {
    const eventRef = db.collection('events').doc(id);

    eventRef.get().then(function (query) {
      if (query.data() && query.data().interestedList) {
        const interestedArray = query.data().interestedList;
        if (interestedArray.includes(user.displayName)) {
          eventRef.set(
            {
              interestedList: query
                .data()
                .interestedList.filter((name) => name !== user.displayName),
            },
            { merge: true }
          );
        } else {
          const newArrayOfNames = query.data().interestedList;
          newArrayOfNames.push(user.displayName);
          eventRef.set(
            {
              interestedList: newArrayOfNames,
            },
            { merge: true }
          );
        }
      }
    });

    //Updating internal state
    setEventsArray(
      eventsArray.map((event) => {
        if (event.id === id) {
          event.interested = !event.interested;
        }
        return event;
      })
    );
  };

  const attendingHandler = (id) => {
    const eventRef = db.collection('events').doc(id);

    eventRef.get().then(function (query) {
      if (query.data() && query.data().attendingList) {
        const attendingArray = query.data().attendingList;
        if (attendingArray.includes(user.displayName)) {
          eventRef.set(
            {
              attendingList: query
                .data()
                .attendingList.filter((name) => name !== user.displayName),
            },
            { merge: true }
          );
        } else {
          const newArrayOfNames = query.data().attendingList;
          newArrayOfNames.push(user.displayName);
          eventRef.set(
            {
              attendingList: newArrayOfNames,
            },
            { merge: true }
          );
        }
      }
    });

    //Update internal state
    setEventsArray(
      eventsArray.map((event) => {
        if (event.id === id) {
          event.attending = !event.attending;
        }
        return event;
      })
    );
  };

  const createEventToggler = () => {
    if (eventSubmittedText) {
      setEventSubmittedText('');
    }
    setShowEventsCreator((oldValue) => !oldValue);
  };

  const eventSubmittedHandler = () => {
    setEventSubmittedText('Thank you for submitting your event!');
    setShowEventsCreator(false);
  };

  let eventsToRender = <Spinner animation="border" role="status" />;
  let recentlyCreatedEventsToRender = (
    <Spinner animation="border" role="status" />
  );

  if (eventsArray) {
    eventsToRender = (
      <EventContainer
        theme={props.theme}
        eventsArray={eventsArray}
        clickedInterested={(id) => interestChangedHandler(id)}
        clickedAttending={(id) => attendingHandler(id)}
      />
    );
  }

  // if (recentlyCreatedEvents) {
  //   recentlyCreatedEventsToRender = (
  //     <EventContainer
  //       theme={props.theme}
  //       eventsArray={recentlyCreatedEvents}
  //       clickedInterested={(id) => interestChangedHandler(id)}
  //       clickedAttending={(id) => attendingHandler(id)}
  //     />
  //   );
  // }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BlueButton clicked={createEventToggler}>
          {showEventsCreator ? 'Minimize' : 'Create an Event'}
        </BlueButton>
      </div>
      {/* <EventsFilterBar /> */}
      <div>
        {showEventsCreator ? (
          <EventsCreator eventSubmitted={eventSubmittedHandler} />
        ) : null}
      </div>
      <div className="eventsContainer__submittedMessage">
        {eventSubmittedText}
      </div>
      {/* <h1
        style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Recently Added
      </h1>
      <div>{recentlyCreatedEventsToRender}</div> */}

      <h1
        style={{
          textAlign: 'center',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        Upcoming Events
      </h1>
      <div>{eventsToRender}</div>
    </div>
  );
};

export default EventsContainer;
