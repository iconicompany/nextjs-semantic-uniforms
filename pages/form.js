import React from 'react';
import { Container, Form } from 'semantic-ui-react';

function FormPage() {
  return (
    <Container>
      <Form>
        <Form.Group widths="equal">
          <Form.Field label="An HTML <input>" control="input" />
          <Form.Field label="An HTML <select>" control="select">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Field>
        </Form.Group>
        <Form.Group grouped>
          <Form.Field label="This one" control="input" type="radio" name="htmlRadios" />
          <Form.Field label="That one" control="input" type="radio" name="htmlRadios" />
        </Form.Group>
        <Form.Group grouped>
          <Form.Field label="This one" control="input" type="checkbox" />
          <Form.Field label="That one" control="input" type="checkbox" />
        </Form.Group>
        <Form.Field label="An HTML <textarea>" control="textarea" rows="3" />
        <Form.Field label="An HTML <button>" control="button">
          HTML Button
        </Form.Field>
      </Form>
    </Container>
  );
}
export default FormPage;
