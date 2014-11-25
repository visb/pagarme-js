var sha1 = require('sha1');

var Pagarme = {

  endpoint: 'https://api.pagar.me',

  apiKey: undefined,

  apiVersion: 1,

  Request: require('./request'),

  Transaction: require('./transaction'),

  Subscription: require('./subscription'),

  Plan: require('./plan'),

  validateFingerprint: function(id, fingerprint) {
    return sha1([id, Pagarme.apiKey].join('#')) == fingerprint;
  }

};

module.exports = Pagarme;
