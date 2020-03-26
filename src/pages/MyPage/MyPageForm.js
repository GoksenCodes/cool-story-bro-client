import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectMyHomepage } from "../../store/user/selectors";
import { updateMyPage } from "../../store/user/actions";

export default function MyHomepageForm() {
  const homepage = useSelector(selectMyHomepage); // we need homepage properties in the form as initial state so bring homepage from selector
  const dispatch = useDispatch();
  const [title, setTitle] = useState(homepage.title);
  const [description, setDescription] = useState(homepage.description || ""); // in db we didn't set this as allownull:false , so it can be empty
  const [backgroundColor, setBackgroundColor] = useState(
    homepage.backgroundcolor
  );
  const [color, setColor] = useState(homepage.color);

  function submitForm(event) {
    event.preventDefault();

    console.log(title, description, backgroundColor, color);
    dispatch(updateMyPage(title, description, backgroundColor, color)); // we dispatch updatemypage action in submit form
  }
  return (
    <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
      <h1 className="mt-5 mb-5">Edit your page</h1>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          onChange={event => setTitle(event.target.value)}
          type="text"
          placeholder="Title of your page"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          onChange={event => setDescription(event.target.value)}
          type="text"
          placeholder="What is your page about"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Background Color</Form.Label>
        <Form.Control
          value={backgroundColor}
          onChange={event => setBackgroundColor(event.target.value)}
          type="color"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Text Color</Form.Label>
        <Form.Control
          value={color}
          onChange={event => setColor(event.target.value)}
          type="color"
        />
      </Form.Group>
      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitForm}>
          Save changes
        </Button>
      </Form.Group>
    </Form>
  );
}
