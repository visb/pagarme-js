var merge = require('merge');

var Subscription = function(options) {
  require('./transactionModel').call(this, 'subscriptions');

  options = merge({
    card_number: null,
    card_holder_name: null,
    card_expiration_month: null,
    card_expiration_year: null,
    card_cvv: null,
    amount: null,
    plan_id: null
  }, options);

  this.fromHash = function(data) {
    this.card_number = data.card_number;
    this.card_holder_name = data.card_holder_name;
    this.card_expiration_month = data.card_expiration_month;
    this.card_expiration_year = data.card_expiration_year;
    this.card_cvv = data.card_cvv;
    this.amount = data.amount;
    this.plan_id = data.plan_id;
  };

  this.fromHash(options);

  return this;
};

module.exports = Subscription;
