module.exports = function(validatorSet, model) {
  var errors = [];
  var keys = Object.keys(validatorSet);

  for (var i=0; i<keys.length; i++) {
    var validator = validatorSet[keys[i]];
    if (!validator.shouldRun || !validator.shouldRun(model)) continue;

    var result = validator.validate(model);
    if (result === true) continue;
    var errorMsg = (result === false) ? result.msg : result;
    errors.push({
      attribute: keys[i],
      msg: errorMsg
    });
  }

  return errors;
};