// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import Enzyme from 'enzyme';

// Existing Adapter is not supporting react 17
// import Adapter from 'enzyme-adapter-react-16';
// Unofficial version to support react 17: https://github.com/wojtekmaj/enzyme-adapter-react-17
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });