# pagarme-js

Implementation of pagarme's api to nodejs

-----


## Usage

### Initialize

```js
var pagarme = require('pagarme')('[ --- Api Key --- ]');

// or
var pagarme = require('pagarme')();
pagarme.apiKey = '[ --- Api Key --- ]';
```

-----


### Transactions

* **Create**: create a transaction

```js
pagarme.transaction.create({
    card_number: '4901720080344448',
    card_holder_name: 'Usuario de Testes',
    card_expiration_year: '16',
    card_expiration_month: '02',
    card_cvv: '314',
    amount: '1000'
}, function(err, response) {
    if (err) return console.log(err);
    
    console.log(response); // details of transaction
});
```

* **Get**: Return a transaction if passed id exists, or an error

```js
pagarme.transaction.get(id, function(err, response) {
    if (err) return console.log(err);
    
    console.log(response); // details of transaction
});
```

* **Get list**: Return a list with all transaction created with current api_key

```js
pagarme.transaction.get(function(err, response) {
    if (err) return console.log(err);
    
    console.log(response); // list of transactions
});
```

* **Refund**: refund a transaction if passed id exists, or an error

```js
pagarme.transaction.get(id, function(err, response) {
    if (err) return console.log(err);
    
    console.log(response); // details of transaction
});
```

-----


## Todo

* Params(count & page) in transaction get list
* test
* plans
* subscriptions
* npm module
