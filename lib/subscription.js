var Pagarme;

var Subscription = function(options) {
  require('./transaction').call(this);
  var module = 'subscriptions';

  options = merge({
    card_number: null,
    card_holder_name: null,
    card_expiration_month: null,
    card_expiration_year: null,
    card_cvv: null,
    amount: null,
    plan: null
  }, options);

  this.card_number = options.card_number;
  this.card_holder_name = options.card_holder_name;
  this.card_expiration_month = options.card_expiration_month;
  this.card_expiration_year = options.card_expiration_year;
  this.card_cvv = options.card_cvv;
  this.amount = options.amount;
  this.plan = options.plan;
  // end of constructor

  this.getModule = function() {
    return module;
  };
};

module.exports = function(instance) {
  Pagarme = instance;
  return Subscriptions;
};
