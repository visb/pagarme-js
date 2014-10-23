var transaction = require('./transaction');
var subscription = require('./subscription');
var plan = require('./plan');
var validation = require('./validation');
var request = require('./request');

var pagarme = function(apiKey) {
    this.apiKey = apiKey;

    this.validation = validation;

    this.request = new request(this);

    this.transaction = new transaction(this);

    return this;
};

module.exports = pagarme;
