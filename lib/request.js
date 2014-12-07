var url = require('url');
var request = require('request');
var merge = require('merge');

var Request = function(path, method) {
  var Pagarme = require('./pagarme');

  this.path = path;

  this.method = method;

  this.options = {};

  this.run = function(callback, options) {
    return request({
      url: [Pagarme.endpoint, Pagarme.apiVersion, this.path].join('/'),
      form: merge(this.options, options, {
        api_key: Pagarme.apiKey
      }),
      method: this.method
    }, function(error, response, body) {
      if (callback) {
        if (!body) return console.log([error]);
        callback(JSON.parse(body));
      }
    });
  };

  return this;
};

module.exports = Request;
