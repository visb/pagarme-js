var Pagarme;

var Transaction = function(options) {
  require('./model').call(this, 'transactions');

  options = merge({
    // default options
  }, options);

  // set subscription values
  // this.[[key]] = [[value]];

  this.refund = function(callback, params) {};

  this.charge = function(callback) {
    return this.create(callback);
  };

  var generateCardHash = function(callback) {};

  this.create = function(callback) {
    // encapsula a requisição porque caso o pagamento seja com
    // cartão é necessário criar o card hash, que por sua vez,
    // faz uma requisição à api
    var create = function() {
      // ...
      callback();
    };

    if (is boleto) {
      create();
    } else {
      generateCardHash(function() {
        create();
      });
    }
  };

  return this;
};

module.exports = function(instance) {
  Pagarme = instance;
  return Transaction;
};
