var Pagarme = require('../lib/pagarme');

describe('be able to charge', function(){
  var transaction = new Pagarme.Transaction({
    card_number: '4901720080344448',
    card_holder_name: 'Usuario de Testes',
    card_expiration_year: '16',
    card_expiration_month: '02',
    card_cvv: '314',
    amount: '1000'
  });

  transaction.charge(function() {
    console.log(transaction.id);
    console.log(this.id);
  });
});
