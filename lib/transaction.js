var transaction = function(pagarme) {
    return {
        create: function(data) {
            return new pagarme.request('/transactions', 'POST', data);
        }
    };
};

module.exports = transaction;
