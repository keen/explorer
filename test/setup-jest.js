import $ from 'jquery';
global.$ = global.jQuery = $;

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-15');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });
