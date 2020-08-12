import { ReducerState as SavedQuery } from '../../../modules/savedQuery';

import { DEFAULT_ERRORS_STATE } from '../constants';

const validateSettings = (settings: SavedQuery) => {
  let hasErrors = false;
  const validationErrors = DEFAULT_ERRORS_STATE;

  console.log(settings, 'waliduje to gunwo');

  if (!settings.displayName) {
    console.log('nie ma displayName');
    hasErrors = true;
    validationErrors.queryName = 'kaczka';
  }

  console.log('ERRORY NA WYJSCIU', validationErrors);

  return {
    validationErrors,
    hasErrors,
  };
};

export default validateSettings;
