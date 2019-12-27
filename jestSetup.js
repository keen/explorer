import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.fetch = require('jest-fetch-mock');

Enzyme.configure({ adapter: new Adapter() });
