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
import firebase from 'firebase';

const EventsContainer = (props) => {
  const [{ user }, dispatch] = useStateValue();
  const [showEventsCreator, setShowEventsCreator] = useState(false);
  const [eventsArray, setEventsArray] = useState(null);
  const [eventSubmittedText, setEventSubmittedText] = useState('');
  const [orderByFilter, setOrderByFilter] = useState('eventDate');
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  // const [recentlyCreatedEvents, setRecentlyCreatedEvents] = useState(null);

  // Gets the data for all of the events ordered by when they're occurring
  useEffect(() => {
    //create a Date object with yesterday's date for filtering the query
    let start = new Date();
    start.setDate(start.getDate() - 1);

    let eventsDbRef = db
      .collection('events')
      .orderBy('eventDate', 'asc')
      .where('eventDate', '>', start);

    if (orderByFilter === 'timestamp') {
      eventsDbRef = db.collection('events').orderBy('timestamp', 'desc');
    } else if (orderByFilter === 'popularity') {
      // I will implement this in the future but requires Atomic integer for event popularity
    }

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
  }, [user, orderByFilter]);

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

  const applyUserFilters = (eventsArray) => {
    let newEventsArray = eventsArray;
    if (eventTypeFilter === '') {
      return eventsArray;
    } else {
      newEventsArray = eventsArray.filter(
        (event) => event.data.eventType === eventTypeFilter
      );
      return newEventsArray;
    }
  };

  let eventsToRender = <Spinner animation="border" role="status" />;

  if (eventsArray) {
    const filteredEventsArray = applyUserFilters(eventsArray);
    eventsToRender = (
      <EventContainer
        theme={props.theme}
        eventsArray={filteredEventsArray}
        clickedInterested={(id) => interestChangedHandler(id)}
        clickedAttending={(id) => attendingHandler(id)}
      />
    );
  }

  const changeOrderByFilterHandler = (e) => {
    setOrderByFilter(e.target.value);
  };

  const changeEventTypeFilterHandler = (e) => {
    setEventTypeFilter(e.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BlueButton clicked={createEventToggler}>
          {showEventsCreator ? 'Minimize' : 'Create an Event'}
        </BlueButton>
      </div>

      <div>
        {showEventsCreator ? (
          <EventsCreator eventSubmitted={eventSubmittedHandler} />
        ) : null}
      </div>
      <EventsFilterBar
        changeOrderByFilter={(e) => changeOrderByFilterHandler(e)}
        orderByFilterValue={orderByFilter}
        changeEventTypeFilter={(e) => changeEventTypeFilterHandler(e)}
        changeEventTypeFilterValue={eventTypeFilter}
      />
      <div className="eventsContainer__submittedMessage">
        {eventSubmittedText}
      </div>

      <h1
        style={{
          textAlign: 'center',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        {orderByFilter === 'eventDate'
          ? 'Upcoming Events'
          : 'Recently Created Events'}
      </h1>
      <div>{eventsToRender}</div>
    </div>
  );
};

export default EventsContainer;
