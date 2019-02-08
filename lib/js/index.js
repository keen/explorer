// only for DEV mode
export let keenGlobals = undefined;
if (typeof webpackKeenGlobals !== 'undefined') {
  keenGlobals = webpackKeenGlobals;
}

import KeenExplorer from './app/app.js';

export { KeenExplorer } from './app/app.js';
export default KeenExplorer;
