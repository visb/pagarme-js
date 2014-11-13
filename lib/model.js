var Pagarme;

var Model = function(module) {
  this.getModule = function() {
    return module;
  };

  this.create = function(callback) {};

  this.all = function(callback, page, count) {};

  this.find = function(params, callback, page, count) {};

  this.getById = function() {};

  return this;
};

module.exports = function(instance) {
  Pagarme = instance;
  return Model;
};
