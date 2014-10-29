var transaction = require('./transaction');
var subscription = require('./subscription');
var plan = require('./plan');
var request = require('./request');

var pagarme = function(apiKey) {
    this.apiKey = apiKey;

    this.request = new request(this);

    this.transaction = new transaction(this);
    
    this.subscription = new subscription(this);
    
    this.plan = new plan(this);

    return this;
};

module.exports = pagarme;
