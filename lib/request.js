var http = require('https');
var url = require('url');

var request = function(pagarme) {
    return function(path, method, params) {
        var apiUrl = url.parse('https://api.pagar.me/1' + path);
        if (!params) {
            params = {};
        }
        params.api_key = pagarme.apiKey;

        return {
            charge: function(callback) {
                try {
                    validation.validate(params);
                } catch (e) {
                    if (callback) {
                        callback(e);
                    }
                    return;
                }

                var options = {
                    host: apiUrl.host,
                    port: apiUrl.port,
                    path: apiUrl.path,
                    method: method
                };

                var request = http.request(options, function(response) {
                    response.setEncoding('utf-8');

                    var responseString = '';

                    response.on('data', function(data) {
                        responseString += data;
                    });

                    response.on('end', function() {
                        if (callback) {
                            callback(undefined, responseString);
                        }
                    });
                });

                request.on('error', function(e) {
                    if (callback) {
                        callback(e)
                    }
                });

                request.write(JSON.stringify(params));

                request.end();

                return request;
            }
        }
    }
};

module.exports = request;
