var rsa = require('node-rsa');
var Pagarme = require('./pagarme');

var transactionModel = function(module) {
  require('./model').call(this, module);

  this.refund = function(callback, options) {
    var path = [this.getModule(), this.id, 'refund'].join('/');
    var self = this;
    new Pagarme.Request(path, 'post').run(function(response) {
      if (response.errors) return callback(response.errors);

      self.fromArray(response);
      callback.apply(self, response.errors);
    }, options);
  };

  this.getCard = function() {
    return {
      card_number: this.card_number,
      card_holder_name: this.card_holder_name,
      card_expiration_date: [this.card_expiration_month, this.card_expiration_year].join(''),
      card_cvv: this.card_cvv
    };
  };

  this.deleteCard = function() {
    delete this.card_number;
    delete this.card_holder_name;
    delete this.card_expiration_month;
    delete this.card_expiration_year;
    delete this.card_cvv;
  };

  this.generateCardHash = function(callback) {
    var path = [this.getModule(), 'card_hash_key'].join('/');
    var self = this;
    new Pagarme.Request(path, 'get').run(function(response) {
      if (response.errors) return callback(response.errors);
      var card = self.getCard();
      var string = Object.keys(card).map(function(option) {
        return [option, card[option]].join('=');
      }).join('&');
      var key = new rsa(response.public_key);
      var encrypted = key.encrypt(string, 'base64');
      self.card_hash = [response.id, encrypted].join('_');

      self.deleteCard();
      callback();
    });
  };

  this.charge = function(callback) {
    if (this.payment_method == 'boleto') {
      this.create(callback);
    } else if (this.payment_method == 'credit_card') {
      if (!this.card_hash) {
        var self = this;
        this.generateCardHash(function(error) {
          if (error) return callback.apply(self, error);

          self.create(callback);
        });
        return;
      }
      this.create(callback);
    } else {
      callback({
        parameter_name: 'payment_method',
        type: 'invalid_parameter',
        message: "'payment_method' inválido"
      });
    }
  };

  return this;
};

module.exports = transactionModel;
