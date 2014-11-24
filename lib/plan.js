var Pagarme = require('./pagarme');

var Plan = function(options) {
  require('./model').call(this, 'plans');

  options = merge({
    // default options
  }, options);

  // set subscription values
  // this.[[key]] = [[value]];
};

module.exports = Plan;
