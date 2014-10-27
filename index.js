var pagarme = require('./lib/pagarme')('ak_test_jCoHaG0wvbpJnBtafcRbEvJ42QmzZw');

// pagarme.apiKey = '';

// var transaction = pagarme.transaction.create({
//     card_number: '4901720080344448',
//     card_holder_name: 'Usuario de Testes',
//     card_expiration_year: '16',
//     card_expiration_month: '02',
//     card_cvv: '314',
//     amount: '1000'
// }, function(err, response) {
//     if (err) return console.log(err);

//     console.log('Created transaction #' + response.id);

//     pagarme.transaction.refund(response.id, function(err, response){
//         if (err) return console.log(err);
        
//         console.log('Refunded transaction #' + response.id);

//         pagarme.transaction.get(response.id, function(err, response) {
//             if (err) return console.log(err);
            
//             console.log('Current values to transaction:');
//             console.log(response);
//         });
//     });
// });


pagarme.transaction.get(function(err, response) {
    if (err) return console.log(err);
    
    console.log('Current values to transaction:');
    console.log(response);
});
