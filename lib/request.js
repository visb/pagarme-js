var http = require('http');
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
                    validation.validate(data);
                } catch (e) {
                    callback(e);
                    return;
                }

                var content = JSON.stringify(params);

                var headers = {
                    'Content-Type': 'application/json',
                    'Content-Length': content.length
                };

                var options = {
                    host: apiUrl.host,
                    port: apiUrl.port,
                    path: apiUrl.path,
                    method: 'POST',
                    headers: headers
                };

                var request = http.request(options, function(response) {
                    response.setEncoding('utf-8');

                    var responseString = '';

                    response.on('data', function(data) {
                        responseString += data;
                    });

                    response.on('end', function() {
                        if (callback) {
                            callback(undefined, JSON.parse(responseString));
                        }
                    });
                });

                request.on('error', function(e) {
                    if (callback) {
                        callback(e)
                    }
                });

                request.write(content);

                request.end();

                return request;
            }
        }
    }
};

module.exports = request;
