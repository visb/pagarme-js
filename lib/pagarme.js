var Pagarme = {
  
  endpoint: 'https://api.pagarm.me',

  apiKey: apiKey,

  apiVersion: 1,

  Request: require('./request'),

  Transaction: require('./transaction'),

  Subscription: require('./subscription'),

  Plan: require('./plan')
    
};

module.exports = Pagarme;
his);

  this.Plan = require('plan')(this);

  return this;
};

module.exports = Pagarme;
