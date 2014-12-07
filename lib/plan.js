var Pagarme = require('./pagarme');
var merge = require('merge');

var Plan = function(options) {
  require('./model').call(this, 'plans');

  options = merge({
    id: null,
    name: null,
    amount: null,
    days: null,
    trial_days: 0,
    payment_methods: ['credit_card', 'boleto'],
    charges: null,
    installments: 1
  }, options);

  this.fromHash = function(data) {
    data = merge({}, this, data);

    this.id = data.id;
    this.name = data.name;
    this.amount = data.amount;
    this.days = data.days;
    this.trial_days = data.trial_days;
    this.payment_methods = data.payment_methods;
    this.charges = data.charges;
    this.installments = data.installments;
  };

  this.fromHash(options);

  return this;
};

module.exports = Plan;
