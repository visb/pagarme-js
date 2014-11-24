var Pagarme = require('./pagarme');
var rsa = require('node-rsa');

var TransactionCommon = function(module) {
  require('./model').call(this, module);

  this.refund = function(callback, options) {
    var path = [this.getModule(), this.id, 'refund'].join('/');
    var request = new Pagarme.Request(path, 'post');
    request.options = options || {};
    request.run(callback || function(){});
  };

  this.getCard = function() {
    return {
      card_number: this.card_number,
      card_holder_name: this.card_holder_name,
      card_expiration_date: this.card_expiration_month + this.card_expiration_year,
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
      var card = self.getCard();

      var string = Object.keys(card).map(function(option) {
        return [option, card[option]].join('=');
      }).join('&');
      var key = new rsa(response.content.public_key);
      var encrypted = key.encrypt(string, 'base64');
      self.card_hash = [response.content.id, encrypted].join('_');

      self.deleteCard();
      if (callback) callback();
    });
  };

  this.create = function(callback) {
    // encapsula a requisição porque caso o pagamento seja com
    // cartão é necessário criar o card hash, que por sua vez,
    // faz uma requisição à api
    var self = this;
    var create = function() {
      var request = new Pagarme.Request(self.getModule(), 'post');
      request.options = self;
      request.run(function(response) {
        self.id = response.content.id;
        self.status = response.content.status;
        if(callback) callback.apply(self);
      }, self);
    };

    if (this.payment_method == 'boleto') {
      create();
    } else {
      this.generateCardHash(function() {
        create();
      });
    }
    return this;
  };

  this.charge = function(callback) {
    return this.create(callback);
  };

  return this;
};

module.exports = TransactionCommon;
