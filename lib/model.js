var Pagarme = require('./pagarme');
var merge = require('merge');

var Model = function(module) {

  this.getModule = function() {
    return module;
  };

  this.create = function(callback) {};

  this.all = function(callback, page, count) {
    this.find({}, callback, page, count);
  };

  this.find = function(params, callback, page, count) {
    var options = merge({
      page: page || 1,
      count: count || 10
    }, params);

    new Pagarme.Request(this.getModule(), 'get').run(function(response) {
      if (response.errors) return callback(response.errors);

      var items = [];
      response.forEach(function(item) {
        items.push(new Pagarme.Transaction(item));
      });
      callback.apply(items);
    }, options);
  };

  this.get = function(id, callback) {
    new Pagarme.Request([this.getModule(), id].join('/'), 'get').run(function(response){
      var transaction = new Pagarme.Transaction(response);
      if (callback) callback.apply(transaction, response.errors);
    });
  };

  return this;
};

module.exports = Model;
