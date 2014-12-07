var Pagarme = require('../../lib/pagarme');
var nock = require('nock');
var httpMockWrap = nock(Pagarme.endpoint);
var responses = require('./response');

var patfy = function(module) {
  return ['', Pagarme.apiVersion, module].join('/');
};

var mock = {
  transaction: {
    create: function(response) {
      httpMockWrap.post(patfy('transactions'))
        .reply(200, responses.transaction.create[response]);

      mock.card_hash_key();
    }
  },
  card_hash_key: function() {
    httpMockWrap.get(patfy('transactions/card_hash_key'))
      .reply(200, responses.card_hash_key);
  }
};

module.exports = mock;
