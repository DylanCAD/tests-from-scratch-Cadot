// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './mocks/browser';
import '@testing-library/jest-dom';
// Avant tous les tests : démarrer MSW
beforeAll(() => server.listen());
// Après chaque test : reset handlers (réinitialise le state mocké)
afterEach(() => server.resetHandlers());
// Après tous les tests : fermer MSW
afterAll(() => server.close());