var Pagarme = {

  endpoint: 'https://api.pagar.me',

  apiKey: undefined,

  apiVersion: 1,

  Request: require('./request'),

  Transaction: require('./transaction'),

  Subscription: require('./subscription'),

  Plan: require('./plan')

};

module.exports = Pagarme;
