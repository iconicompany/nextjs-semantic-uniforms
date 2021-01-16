import Registration from '../Registration';

const usecase = new Registration();

test('process', async () => {
  const req = { firstName: 'FirstName', lastName: 'LastName' };
  const expected = { greeting: 'Hello, FirstName LastName!' };
  const res = await usecase.process(req);
  expect(res).toStrictEqual(expected);
});
