var Pagarme;
var url = require('url');
var request = require('request');

var Request = function(path, method) {

  this.path = path;

  this.method = method;

  this.options = {};

  this.run = function(callback, options) {
    return request({
      url: [Pagarme.endpoint, Pagarme.apiVersion, this.path].join('/'),
      form: merge(this.options, options, {
        api_key: Pagarme.apiKey
      }, function(error, response, body) {
        if (callback) {
          callback(merge(response, {
            error: error
          }, {
            content: body
          }));
        }
      });
    });
  };

  return this;
};

module.exports = function(instance) {
  Pagarme = instance;
  return Request;
};
