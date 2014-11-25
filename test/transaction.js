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

    // tests to do
    // this.status = paid
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

    // tests to do
    // this.status = waytinh_payment
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

      // tests to do
      // this.status = refunded
    });
  });
});

describe('be able to find a transaction', function() {
  Pagarme.Transaction().get(168927, function() {
    console.log(this.status);

    // tests to do
    // this.id = 168927
  });
});

describe('be able to list', function() {
  Pagarme.Transaction().all(function(errors) {
    if (errors) return console.log(errors);

    console.log(this);

    // tests to do
    // this.length <= 5
  }, 1, 5);
});


describe('be able to search by anything', function() {
  Pagarme.Transaction().find({status: 'refunded'}, function(errors) {
    if (errors) return console.log(errors);

    console.log(this);

    // tests to do
    // this.length <= 5
    // this.forEach(each.status = refunded)
  }, 1, 5);
});
