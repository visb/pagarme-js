# pagarme-js [![Build Status](https://travis-ci.org/visb/pagarme-js.svg)](https://travis-ci.org/visb/pagarme-js)

PagarMe in nodejs

-----

## Usage

```js
var Pagarme = require('./lib/pagarme');
Pagarme.apiKey = ' [ ... ApiKey ... ]';
```

**Transaction**

```js
var transaction = new Pagarme.Transaction({
  amount: 100,

  card_hash: '[CARD_HASH]'
  // or
  card_number: '4901720080344448',
  card_holder_name: 'Usuario de Testes',
  card_expiration_year: '16',
  card_expiration_month: '02',
  card_cvv: '314'
});
transaction.charge();

// get one
var id;
Pagarme.Transaction().get(id, function(error) {
  if (error) return console.log(error);

  console.log(this.status);
});

// list
var page, count; // optional params
Pagarme.Transaction().all(function(error) {
  if (error) return console.log(error);

  this.forEach(function(item) {
    console.log('#' + item.id + ' : ' + item.status);
  });
}, page, count);

// search
var page, count; // optional params
var options = { status: paid };
Pagarme.Transaction().find(options, function(error) {
  console.log(this.length + ' transactions found');
  this.forEach(function(item) {
    console.log('#' + item.id);
  });
}, page, count);
```

**Plan**

```js
var plan = new Pagarme.Plan({
  name: 'Teste',
  days: 15,
  amount: 10
});
plan.create();
```

**Subscription**

```js
var subscription = new Pagarme.Subscription({
  plan_id: plan.id,
  customer: { email: 'test@test.com' },

  card_hash: '[CARD_HASH]',
  // or
  card_number: '4901720080344448',
  card_holder_name: 'Usuario de Testes',
  card_expiration_year: '16',
  card_expiration_month: '02',
  card_cvv: '314'
});
subscription.charge();
```
