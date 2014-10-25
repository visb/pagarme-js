var util = require('./util');
var rsa = require('node-rsa');

var transaction = function(pagarme) {
    var cardHash = function(data, callback) {
        return new pagarme.request('/transactions/card_hash_key', 'GET').charge(function(error, response){
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

            console.log(response);

            return;

            var key = new rsa(response.public_key);
            var encrypted = key.encrypt(string, 'base64');
            var card_hash = response.id + '_' + encrypted;

            callback(card_hash);
        });

    };
    return {
        create: function(data) {
            return {
                charge: function(callback) {
                    return cardHash(data, function(card_hash) {
                        delete data.card_number;
                        delete data.card_holder_name;
                        delete data.card_expiration_date;
                        delete data.card_cvv;
                        data.card_hash = card_hash;
                        new pagarme.request('/transactions', 'POST', data).charge(callback);
                    });
                }
            }
        }
    };
};

module.exports = transaction;
