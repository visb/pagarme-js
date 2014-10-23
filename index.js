var pagarme = require('./lib/pagarme')('testeApiKey');

// pagarme.apiKey = 'outraApiKey';

var transaction = pagarme.transaction.create({
    testKey: 'testValue'
});

transaction.charge(function(error, response) {
    // ...
});

