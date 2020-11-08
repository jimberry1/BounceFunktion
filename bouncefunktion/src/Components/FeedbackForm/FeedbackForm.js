import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import db from '../../firebase';
import BlueButton from '../../UI/Modal/Buttons/BlueButton/BlueButton';

const FeedbackForm = (props) => {
  return (
    <div>
      <Form>
        {/* <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={props.reporterEmail}
            onChange={(e) => props.emailChangedHandler(e)}
          />
        </Form.Group> */}
        <Form.Label>{props.screenFormLabel}</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          value={props.areaForChange}
          onChange={(e) => props.areaForChangeChanged(e)}
        />

        <Form.Group
          controlId="exampleForm.ControlTextarea1"
          style={{ marginTop: '25px' }}
        >
          <Form.Label>Description of the {props.feedbackType}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={props.description}
            onChange={(e) => props.descriptionChangedHandler(e)}
          />
        </Form.Group>
        <BlueButton
          clicked={(e) => props.formSubmitted(e)}
          style={{ justifyContent: 'center' }}
        >
          Submit
        </BlueButton>
      </Form>
    </div>
  );
};

export default FeedbackForm;
