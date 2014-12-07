var merge = require('merge');

var card = {
  card_number: '4901720080344448',
  card_holder_name: 'Usuario de Testes',
  card_expiration_year: '16',
  card_expiration_month: '02',
  card_cvv: '314'
};

module.exports = {
  transaction: {
    credit_card: merge({}, card, { amount: 1000 }),
    boleto: {
      amount: 1000,
      payment_method: 'boleto',
      customer: {
        email: 'contact@example.com'
      }
    }
  }
};
