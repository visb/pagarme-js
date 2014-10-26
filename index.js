var pagarme = require('./lib/pagarme')('ak_test_jCoHaG0wvbpJnBtafcRbEvJ42QmzZw');

// pagarme.apiKey = '';

var transaction = pagarme.transaction.create({
    card_number: '4901720080344448',
    card_holder_name: 'Usuario de Testes',
    card_expiration_year: '16',
    card_expiration_month: '02',
    card_cvv: '314',
    amount: '1000'
});

transaction.charge(function(error, response) {
	if (error) {
		return console.log(error);
	}

	console.log('Created transaction #' + response.id);

	pagarme.transaction.refund(response.id, function(respose){
		console.log('Refunded transaction #' + response.id);

		pagarme.transaction.get(response.id, function(response) {
			console.log('Current values to transaction:');
			console.log(response);
		});
	});
});

