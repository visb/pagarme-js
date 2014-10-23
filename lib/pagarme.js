var transaction = require('./transaction');
var subscription = require('./subscription');
var plan = require('./plan');
var validation = require('./validation');
var request = require('./request');

var pagarme = function(apiKey) {
    var self = {
        apiKey: apiKey,

        validation: validation,

        request: new request(self),

        transaction: new transaction(self)
    };

    return self;
};

module.exports = pagarme;
