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
    invalid_credit_card: merge({}, card, { amount: 1000, card_number: '000' }),
    boleto: {
      amount: 1000,
      payment_method: 'boleto',
      customer: {
        email: 'contact@example.com'
      }
    }
  },

  subscription: {
    credit_card: merge({}, card, { plan_id: 1 }),
    invalid_credit_card: merge({}, card, { plan_id: 1, card_number: '000' }),
    boleto: {
      plan_id: 1,
      payment_method: 'boleto',
      customer: {
        email: 'contact@example.com'
      }
    }
  },

  plan: {
    create: {
      name: 'Teste',
      amount: 1000,
      days: 15
    }
  }
};
