var http = require('https');
var url = require('url');
var restler = require('restler');

var request = function(pagarme) {
    return function(path, method, params) {
        var url = 'https://api.pagar.me/1' + path;
        if (!params) {
            params = {};
        }
        params.api_key = pagarme.apiKey;

        method = method.toLowerCase();
        // restrict to acceptable methods in pagarme's api
        if (['post', 'get'].indexOf(method) < 0) {
            throw new Exception('Invalid request method');
        }

        return {
            then: function(callback) {

                var request = restler[method](url, {data: params});

                request.on('complete', function(response) {
                    if (callback) {
                        if (response.errors) {
                            return callback(response.errors, response);
                        }

                        return callback(undefined, response);
                    }
                });

                request.on('error', function(e) {
                    if (callback) {
                        callback(e)
                    }
                });
            }
        }
    }
};

module.exports = request;
