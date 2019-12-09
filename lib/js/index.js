/* eslint-disable */
// only for DEV mode
export let keenGlobals = undefined;
if (typeof webpackKeenGlobals !== 'undefined') {
  keenGlobals = webpackKeenGlobals;
}

export { KeenExplorer } from './app/index';

import KeenExplorer from './app/index';
export default KeenExplorer;
