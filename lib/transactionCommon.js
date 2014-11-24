var Pagarme = require('./pagarme');
var rsa = require('node-rsa');
var request = require('request');

var TransactionCommon = function(module) {
  require('./model').call(this, module);

  this.refund = function(callback, options) {
    var path = [this.getModule(), this.id, 'refund'].join('/');
    var request = new request(path, 'post');
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
    new request(path, 'get').run(function(response) {
      var card = self.getCard();

      var string = Object.keys(card).map(function(option) {
        return [option, card[option]].join('=');
      }).join('&');
      console.log(response);
      return;
      var key = new rsa(response.public_key);
      var encrypted = key.encrypt(string, 'base64');
      this.card_hash = [response.id, encrypted].join('_');

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
      var request = new request(self.getModule(), 'post');
      request.options = self;
      request.run(function(response) {
        self.status = response.content.status;
        if(callback) callback();
      });
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
