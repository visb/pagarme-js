var merge = require('merge');

var Subscription = function(options) {
  require('./transactionModel').call(this, 'subscriptions');

  options = merge({
    id: null,
    amount: null,
    installments: 1,
    status: null,
    plan_id: null,
    capture: true,
    soft_descriptor: null,
    payment_method: 'credit_card',
    card_hash: null,
    card_number: null,
    card_holder_name: null,
    card_expiration_month: null,
    card_expiration_year: null,
    card_cvv: null,
    postback_url: null,
    customer: { address: {}, phone: {} },
    metadata: {},
    boleto_url: null
  }, options);

  this.fromHash = function(data) {
    data = merge({}, this, data);

    this.id = data.id;
    this.amount = data.amount;
    this.installments = data.installments;
    this.status = data.status;
    this.plan_id = data.plan_id;
    this.capture = data.capture;
    this.soft_descriptor = data.soft_descriptor;
    this.payment_method = data.payment_method;
    this.card_hash = data.card_hash;
    this.card_number = data.card_number;
    this.card_holder_name = data.card_holder_name;
    this.card_expiration_month = data.card_expiration_month;
    this.card_expiration_year = data.card_expiration_year;
    this.card_cvv = data.card_cvv;
    this.postback_url = data.postback_url;
    this.customer = data.customer;
    this.metadata = data.metadata;
    this.boleto_url = data.boleto_url;
  };

  this.fromHash(options);

  return this;
};

module.exports = Subscription;
