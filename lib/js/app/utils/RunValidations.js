module.exports = {

  run: function(validatorSet, model) {
    var keys = Object.keys(validatorSet);
    model.isValid = true;
    model.errors = [];

    for (var i=0; i<keys.length; i++) {
      var validator = validatorSet[keys[i]];

      // Check if this validator should be run at all.
      if (validator.shouldRun && !validator.shouldRun(model)) continue;

      var result = validator.validate(model);

      // Validator returned true. This attribute is valid. Move on.
      if (result === true) continue;

      // There is an error. Set the model as invalid and set the errors on the model.
      model.isValid = false;
      model.errors.push({
        attribute: keys[i],
        msg: (result === false) ? validator.msg : result
      });
    }
  }

};