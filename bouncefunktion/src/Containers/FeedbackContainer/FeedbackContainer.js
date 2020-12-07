import './FeedbackContainer.css';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BlueButton from '../../UI/Modal/Buttons/BlueButton/BlueButton';
import FeedbackForm from '../../Components/FeedbackForm/FeedbackForm';
import db from '../../firebase';
import { useStateValue } from '../../Store/StateProvider';
import firebase from 'firebase';

const FeedbackContainer = (props) => {
  const [reporterEmail, setReporterEmail] = useState('');
  const [description, setDescription] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [areaForChange, setAreaForChange] = useState('');
  const [{ user }, dispatch] = useStateValue();
  const [afterSubmitMessage, setAfterSubmitMessage] = useState('');

  const handleReportButtonClicked = (feedbackType) => {
    setFeedbackType(feedbackType);
    setAfterSubmitMessage('');
  };

  const submitFormHandler = (e) => {
    console.log('form submit handler invoked');
    e.preventDefault();

    db.collection('feedback').add({
      username: user.displayName,
      feedbackDescription: description,
      feedbackAreaforChange: areaForChange,
      feedbackType: feedbackType,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setDescription('');
    setFeedbackType('');
    setAreaForChange('');
    setAfterSubmitMessage('Thank you for submitting your feedback!');
  };

  let feedbackForm = null;

  if (feedbackType) {
    feedbackForm = (
      <FeedbackForm
        reporterEmail={reporterEmail}
        emailChangedHandler={(e) => setReporterEmail(e.target.value)}
        description={description}
        descriptionChangedHandler={(e) => setDescription(e.target.value)}
        feedbackType={feedbackType}
        screenFormLabel={
          feedbackType === 'bug'
            ? 'Bugged page or feature'
            : 'Area for improvement or name of new feature'
        }
        areaForChange={areaForChange}
        areaForChangeChanged={(e) => setAreaForChange(e.target.value)}
        formSubmitted={(e) => submitFormHandler(e)}
      />
    );
  }

  return (
    <div>
      <div className="feedbackContainer__container">
        <div className="feedbackContainer__title">
          <h2>Funktion Feedback</h2>
        </div>
        <div style={{ marginBottom: '1px solid' }}>
          <div className="feedbackContainer__subtitle">
            <p>We'd love to hear your thoughts!</p>{' '}
            <p>
              Please use this space to report bugs in the application or make
              suggestions for new BounceFunktion features
            </p>
          </div>
        </div>
        <div style={{ margin: 'auto', marginTop: '50px', width: '75%' }}>
          {feedbackForm}
        </div>
        <Container style={{ marginTop: '100px', textAlign: 'center' }}>
          <Row>
            <Col>
              <BlueButton
                clicked={() => handleReportButtonClicked('suggestion')}
              >
                Make a suggestion
              </BlueButton>
            </Col>
            <Col>
              <BlueButton clicked={() => handleReportButtonClicked('bug')}>
                Report a bug
              </BlueButton>
            </Col>
          </Row>
          <Row style={{ marginTop: '25px' }}>
            <Col>{afterSubmitMessage}</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default FeedbackContainer;
