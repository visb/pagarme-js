var Pagarme = function(apiKey) {
  this.endpoint = 'https://api.pagarm.me';

  this.apiKey = apiKey;

  this.apiVersion = 1;

  this.Request = require('./request')(this);

  this.Transaction = require('./transaction')(this);

  this.Subscription = require('./subscription')(this);

  this.Plan = require('plan')(this);

  return this;
};

module.exports = Pagarme;
