// only for DEV mode
export let keenGlobals = undefined;
if (typeof webpackKeenGlobals !== 'undefined') {
  keenGlobals = webpackKeenGlobals;
}

export { KeenExplorer } from './app/app.js';

import KeenExplorer from './app/app.js';
export default KeenExplorer;
