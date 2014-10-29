var rsa = require('node-rsa');
var model = require('./model');
var util = require('./util');

var transaction = function(pagarme, path) {
    var transactionModel = new model(pagarme, '/transactions');
    
    transactionModel.create = function(data, callback) {
        if (data.payment_method == 'boleto') {
            return this.makeTransaction(data, callback);
        }
        
        var self = this;
        return this.cardHash(data, function(card_hash) {
            delete data.card_number;
            delete data.card_holder_name;
            delete data.card_expiration_date;
            delete data.card_cvv;
            data.card_hash = card_hash;
            
            return self.makeTransaction(data, callback);

        });
    };
        
    transactionModel.makeTransaction = function(data, callback) {
        return new pagarme.request(this.path, 'POST', data).then(callback);
    };

    transactionModel.cardHash = function(data, callback) {
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
    };
    
    return transactionModel;
};

module.exports = transaction;
