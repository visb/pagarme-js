var Pagarme;

var Subscription = function(options) {
  require('./transaction').call(this);
  var module = 'subscriptions';

  options = merge({
    // default options
  }, options);

  // set subscription values
  // this.[[key]] = [[value]];

  this.getModule = function() {
    return module;
  };

  this.charge = function(callback) {};
};

module.exports = function(instance) {
  Pagarme = instance;
  return Subscriptions;
};
