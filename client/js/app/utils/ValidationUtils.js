var _ = require('lodash');

module.exports = {

  runValidations: function(validationSet, model) {
    var isValid = true;
    var lastError = null;

    _.each(validationSet, function(validator, key) {
     if (!validator.validator(model, model[key])) {
       isValid = false;
       lastError = validator.msg;
     }
    });

    return {
      isValid: isValid,
      lastError: lastError,
    };
  }
  
};