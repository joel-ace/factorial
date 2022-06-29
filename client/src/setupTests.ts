// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

// Additional code snippets from: https://github.com/TkDodo/testing-react-query/blob/main/src/setupTests.ts
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node'
import { handlers } from '../src/mocks/apiResponseMock';

export const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
