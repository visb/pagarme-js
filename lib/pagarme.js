var Pagarme = {

  endpoint: 'https://api.pagarm.me',

  apiKey: undefined,

  apiVersion: 1,

  Transaction: require('./transaction'),

  Subscription: require('./subscription'),

  Plan: require('./plan')

};

module.exports = Pagarme;
