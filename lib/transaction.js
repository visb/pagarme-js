var util = require('./util');
var rsa = require('node-rsa');

var transaction = function(pagarme) {
    return {
        create: function(data, callback) {
            if (data.payment_method == 'boleto') {
                return pagarme.transaction.makeTransaction(data, callback);
            }
            
            return pagarme.transaction.cardHash(data, function(card_hash) {
                delete data.card_number;
                delete data.card_holder_name;
                delete data.card_expiration_date;
                delete data.card_cvv;
                data.card_hash = card_hash;
                
                return pagarme.transaction.makeTransaction(data, callback);

            });
        },
        
        makeTransaction: function(data, callback) {
            return new pagarme.request('/transactions', 'POST', data).then(callback);
        },

        /**
         * Generate credit card hash
         *
         * more details: https://pagar.me/docs/restful-api/card-hash/
         */
        cardHash: function(data, callback) {
            var request = new pagarme.request('/transactions/card_hash_key', 'GET');

            request.then(function(error, response){
                var params = {
                    card_number: data.card_number,
                    card_holder_name: data.card_holder_name,
                    card_expiration_date: data.card_expiration_month + data.card_expiration_year,
                    card_cvv: data.card_cvv
                };

                var string = '';
                var separator = '';
                util.object.forEach(params, function(index, value){
                    string += separator + index + '=' + value;
                    separator = '&';
                });

                var key = new rsa(response.public_key);
                var encrypted = key.encrypt(string, 'base64');
                var card_hash = response.id + '_' + encrypted;

                callback(card_hash);
            });

            return request;
        },

        refund: function(id, callback) {
            id = ~~id;
            return new pagarme.request('/transactions/' + id + '/refund', 'post').then(callback);
        },

        get: function(id, callback) {
            if (typeof id == 'function') {
                id = undefined;
                callback = arguments[0];
            }
            
            var url = '/transactions';
            if (id) {
                url += '/' + id;
            }
            
            var request = new pagarme.request(url, 'get').then(callback || function(){});
        }
    };
};

module.exports = transaction;
