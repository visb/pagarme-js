var merge = require('merge');

var Transaction = function(options) {
  require('./transactionCommon').call(this, 'transactions');

  options = merge({
    card_number: null,
    card_holder_name: null,
    card_expiration_month: null,
    card_expiration_year: null,
    card_cvv: null,
    amount: null,
    plan: null,
    payment_method: 'credit_card',
    id: null
  }, options);

  this.card_number = options.card_number;
  this.card_holder_name = options.card_holder_name;
  this.card_expiration_month = options.card_expiration_month;
  this.card_expiration_year = options.card_expiration_year;
  this.card_cvv = options.card_cvv;
  this.amount = options.amount;
  this.plan = options.plan;
  this.payment_method = options.payment_method;
  this.id = options.id;

  return this;
};

module.exports = Transaction;
