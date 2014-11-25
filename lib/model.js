var Pagarme = require('./pagarme');

var Model = function(module) {

  this.getModule = function() {
    return module;
  };

  this.create = function(callback) {};

  this.all = function(callback, page, count) {};

  this.find = function(params, callback, page, count) {};

  this.get = function(id, callback) {
    new Pagarme.Request([this.getModule(), id].join('/'), 'get').run(function(response){
      var transaction = new Pagarme.Transaction(response);
      if (callback) callback.apply(transaction, response.errors);
    });
  };

  return this;
};

module.exports = Model;
