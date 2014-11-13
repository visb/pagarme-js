var Pagarme;

var Subscription = function(options) {
  require('./model').call(this, 'subscriptions');

  options = merge({
    // default options
  }, options);

  // set subscription values
  // this.[[key]] = [[value]];
};

module.exports = function(instance) {
  Pagarme = instance;
  return Subscriptions;
};
