import { Form, Button } from 'react-bootstrap';
import './AddMixForm.css';

/**
 * This component allows the user to add a mix, the state is controlled in the parent container
 * @param {
 * title
 * subtitle
 *
 * } props
 */
const AddMixForm = (props) => {
  return (
    <div className="addMixForm__container">
      <Form>
        <Form.Group controlId="formBasicText">
          <Form.Label>Mix Title</Form.Label>
          <Form.Control
            placeholder="Enter title"
            value={props.title}
            onChange={(event) => props.titleChanged(event)}
          />
          <Form.Text className="text-muted">
            {props.title.length} / 25 characters
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicText">
          <Form.Label>Mix Description</Form.Label>
          <Form.Control
            placeholder="Description"
            value={props.description}
            onChange={(event) => props.descriptionChanged(event)}
          />
          <Form.Text className="text-muted">
            {props.description.length} / 100 characters
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Label>Mix Link</Form.Label>
          <Form.Control
            placeholder="Link to your mix"
            value={props.mixLink}
            onChange={(event) => props.mixLinkChanged(event)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Label>Explore More link (Optional) </Form.Label>
          <Form.Control
            placeholder="Direct users to more of your work, e.g. your Soundcloud page"
            value={props.exploreMoreLink}
            onChange={(event) => props.exploreMoreLinkChanged(event)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(event) => props.submitClicked(event)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddMixForm;
