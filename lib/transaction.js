var merge = require('merge');

var Transaction = function(options) {
  require('./transactionModel').call(this, 'transactions');

  options = merge({
    card_number: null,
    card_holder_name: null,
    card_expiration_month: null,
    card_expiration_year: null,
    card_cvv: null,
    amount: null,
    plan: null,
    status: null,
    payment_method: 'credit_card',
    id: null
  }, options);

  this.fromHash = function(data) {
    this.card_number = data.card_number;
    this.card_holder_name = data.card_holder_name;
    this.card_expiration_month = data.card_expiration_month;
    this.card_expiration_year = data.card_expiration_year;
    this.card_cvv = data.card_cvv;
    this.amount = data.amount;
    this.status = data.status;
    this.plan = data.plan;
    this.payment_method = data.payment_method;
    this.id = data.id;
  };

  this.fromHash(options);

  return this;
};

module.exports = Transaction;
