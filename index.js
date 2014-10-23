var pagarme = require('./lib/pagarme')('ak_test_jCoHaG0wvbpJnBtafcRbEvJ42QmzZw');

// pagarme.apiKey = '';

var transaction = pagarme.transaction.create({
    card_number: '4901720080344448',
    card_holder_name: 'Usuario de Testes',
    card_expiration_date: '0216',
    card_cvv: '314',
    amount: '1000'
});

transaction.charge(function(error, response) {
    console.log(arguments);
});

