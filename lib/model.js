var wrapper = function(pagarme) {
    var transaction = function(data) {
        if (~~data == data) {
            data = {id: data};
        }
        
        this.data = data;
        
        return this;
    };

    transaction.prototype.charge = function(callback) {
        this.generateCardHash(function(card_hash) {
            delete data.card_number;
            delete data.card_holder_name;
            delete data.card_expiration_date;
            delete data.card_cvv;
            data.card_hash = card_hash;
 
            new pagarme.request('/transactions', 'POST', data).then(function(response) {
                if (response.errors) {
                    return;
                }
                data = response;
            });
        });
    };

    transaction.prototype.generateCardHash = function(callback) {
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

    transaction.prototype.get = function(callback) {
        return new pagarme.request('/transactions' + id, 'get').then(callback);
    };

    transaction.prototype.refund = function(callback) {
        return new pagarme.request('/transactions/' + id + '/refund', 'post').then(callback);
    };

    return transaction;
};

module.exports = wrapper;
