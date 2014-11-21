var Pagarme = require('pagarme');

describe('be able to charge', function() {
        
  var transaction = new Pagarme.Transaction({
    card_number: '4901720080344448',
    card_holder_name: 'Usuario de Testes',
    card_expiration_year: '16',
    card_expiration_month: '02',
    card_cvv: '314',
    amount: '1000'
  }).charge(function() {
    console.log(arguments);
  });

});
});
.log(arguments);
    });
    
});

describe('be able to refund', function() {
    
    pagarme.transaction.refund(response.id, function(err, response){
        if (err) return console.log(err);
        console.log('Refunded transaction #' + response.id);
    });
    
});

describe('be able to search by anything', function() {
    
    pagarme.transaction.get({amount: 1000, status: 'paid'}, function(err, response) {
        for (i in response) {
            var item = response[i];
            console.log('Transaction #' + item.id + ' ' + item.status);
        }
    });
    
});

describe('be able to create transaciton with boleto', function() {
    
    var transaction = pagarme.transaction.create({
        payment_method: 'boleto',
        amount: '1000'
    }, function(err, response) {
        if (err) return console.log(err);
        console.log('Created transaction #' + response.id);
    });
    
});

describe('be able to send metadata', function() {
    
});

describe('be able to find a transaction', function() {
    
    pagarme.transaction.get(155808, function(err, response) {
        console.log('Transaction #' + resoibse.id);
    });
    
});

describe('accept parameters on the refund', function() {
    
});

describe('be able to create transaction with customer', function() {
    
});

describe('be able to capture a transaction and pass an amount', function() {
    
});

describe('validate invalid transaction', function() {
    
});
);
e('validate invalid transaction', function() {
    
});
on', function() {
    
});

e('validate invalid transaction', function() {
    
});
on', function() {
    
});
