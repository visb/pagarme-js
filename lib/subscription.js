var model = require('./transaction');

var subscription = function(pagarme) {
    var subscriptionModel = new model(pagarme);
    subscriptionModel.path = '/subscriptions';
    return subscriptionModel;
};

module.exports = subscription;
