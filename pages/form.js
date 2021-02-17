import { withRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, Form, Header, Message } from 'semantic-ui-react';
import Registration from '../usecases/Registration';

function shouldMatchPattern(pattern) {
  return (value) =>
    value.match(pattern) ? true : `Должно соответствовать образцу ${pattern.toString()}`;
}
function isNotEmpty() {
  return (value) => (value ? true : 'Должно быть не пустым');
}
function isNumber() {
  return (value) => (!isNaN(parseInt(value)) ? true : 'Должно быть числом');
}
function isLessThanOrEqual(number) {
  return (value) => (parseInt(value) <= number ? true : `Должно быть <= ${number}`);
}
function isMoreThanOrEqual(number) {
  return (value) => (parseInt(value) >= number ? true : `Должно быть >= ${number}`);
}

function FormInput({ name, id, type, label, defaultValue, register, required, errors }) {
  return (
    <Form.Field required={required || false}>
      <label htmlFor={id || name}>{label}</label>
      <input
        id={id || name}
        name={name}
        type={type || 'text'}
        defaultValue={defaultValue}
        ref={register}
      />
      {errors[name] && <FieldError error={errors[name].message} />}
    </Form.Field>
  );
}
function FormCheckbox({ name, id, label, defaultValue, register, required, errors }) {
  return (
    <Form.Field required={required || false} inline>
      <input
        id={id || name}
        name={name}
        defaultChecked={defaultValue === 'true' ? true : false}
        type={'checkbox'}
        ref={register}
      />
      <label htmlFor={id || name}>{label}</label>
      {errors[name] && <FieldError error={errors[name].message} />}
    </Form.Field>
  );
}
function FormSelect({ name, id, label, defaultValue, register, required, options, errors }) {
  return (
    <Form.Field required={required || false}>
      <label htmlFor={id || name}>{label}</label>
      <select name={id || name} ref={register} defaultValue={defaultValue}>
        {Object.entries(options).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {errors[name] && <FieldError error={errors[name].message} />}
    </Form.Field>
  );
}

function FieldError({ error }) {
  return <div className="ui red basic pointing label">{error}</div>;
}

function getErrorMessagesOrNull(errors) {
  const errorEntries = Object.entries(errors);
  if (errorEntries.length) {
    return errorEntries.map(([, error]) => error.message);
  }
  return null;
}

function FormPage({ request, response, router }) {
  const { handleSubmit, register, errors } = useForm();
  const errorMessages = getErrorMessagesOrNull(errors);

  const onSubmit = (query) => {
    router.push({ pathname: 'form', query });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="firstName"
          label="First name"
          defaultValue={request.firstName}
          register={register({
            validate: {
              isNotEmpty: isNotEmpty()
            }
          })}
          errors={errors}
          required
        />
        <FormInput
          name="lastName"
          label="Last name"
          defaultValue={request.lastName}
          register={register({
            validate: {
              isNotEmpty: isNotEmpty()
            }
          })}
          errors={errors}
          required
        />
        <FormInput
          name="workExperience"
          label="Work experience in hours"
          defaultValue={request.workExperience}
          type="number"
          register={register({
            validate: {
              isNotEmpty: isNotEmpty(),
              isNumber: isNumber(),
              isLessThanOrEqual100: isLessThanOrEqual(100),
              isMoreThanOrEqual0: isMoreThanOrEqual(0)
            }
          })}
          errors={errors}
        />
        <FormCheckbox
          name="check"
          label="Check"
          defaultValue={request.check}
          register={register}
          errors={errors}
        />
        <FormInput
          name="zip"
          label="Zip"
          defaultValue={request.zip}
          register={register({
            validate: {
              isNotEmpty: isNotEmpty(),
              shouldMatchPattern: shouldMatchPattern(/[0-9]{5}/)
            }
          })}
          errors={errors}
        />
        <FormSelect
          name="color"
          label="Color"
          defaultValue={request.color}
          options={{ color: 'Color', red: 'Red', amber: 'Abmer', green: 'Green' }}
          register={register}
          errors={errors}
        />
        <Button type="submit" disabled={errorMessages !== null}>
          Отправить запрос
        </Button>
        {errorMessages && (
          <Message negative>
            <ul>
              {errorMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </Message>
        )}
      </Form>
      {response.greeting && <Header as="h1">{response.greeting}</Header>}
    </Container>
  );
}
export default withRouter(FormPage);

export async function getServerSideProps({ query: request }) {
  const usecase = new Registration();
  const props = {
    request,
    response: await usecase.process(request)
  };
  return { props };
}
