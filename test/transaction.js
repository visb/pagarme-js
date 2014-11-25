var Pagarme = require('../lib/pagarme');

describe('be able to charge', function() {
  var transaction = new Pagarme.Transaction({
    card_number: '4901720080344448',
    card_holder_name: 'Usuario de Testes',
    card_expiration_year: '16',
    card_expiration_month: '02',
    card_cvv: '314',
    amount: '1000'
  });

  transaction.charge(function(error) {
    if (error) return console.log(error);
    console.log(this.id);
    console.log(this.status); // paid
  });
});

describe('be able to create transaciton with boleto', function() {
  var transaction = new Pagarme.Transaction({
    payment_method: 'boleto',
    amount: '1000'
  });

  transaction.charge(function(error) {
    if (error) return console.log(error);
    console.log(this.id);
    console.log(this.status); // wayting_payment
  });
});

describe('be able to refund', function() {
 var transaction = new Pagarme.Transaction({
    card_number: '4901720080344448',
    card_holder_name: 'Usuario de Testes',
    card_expiration_year: '16',
    card_expiration_month: '02',
    card_cvv: '314',
    amount: '1000'
  });

  transaction.charge(function(error) {
    if (error) return console.log(error);

    console.log(this.id);
    this.refund(function(error) {
      if (error) return console.log(error);
      console.log(this.status); // refunded
    });
  });
});

describe('be able to find a transaction', function() {
  Pagarme.Transaction().get(168927, function() {
    console.log(this.status);
  });
});
