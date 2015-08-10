var _ = require('lodash');

module.exports = {

  runValidations: function(validationSet, model) {
    var isValid = true;
    var lastError = null;

    _.each(validationSet, function(validator, key) {
      var validity = validator.validator(model);
     if (validity !== true) {
       isValid = false;
       if (typeof validity === 'string') {
        lastError = validity;
       } else {
        lastError = validator.msg;
       }
     }
    });

    return {
      isValid: isValid,
      lastError: lastError,
    };
  }
  
};