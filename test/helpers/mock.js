var Pagarme = require('../../lib/pagarme');
var nock = require('nock');
var httpMockWrap = nock(Pagarme.endpoint);
var responses = require('./response');

var patfy = function(module) {
  if (module.join) module = module.join('/');
  return ['', Pagarme.apiVersion, module].join('/');
};

var mock = {
  transaction: {
    create: function(response) {
      httpMockWrap.post(patfy('transactions'))
        .reply(200, responses.transaction.create[response]);

      mock.card_hash_key();
    },
    refund: function(id) {
      httpMockWrap.post(patfy(['transactions', id, 'refund']))
        .reply(200, responses.transaction.refund);
    },
    find: function() {
      httpMockWrap.get(patfy('transactions'))
        .reply(200, responses.transaction.find);
    },
    get: function(id) {
      httpMockWrap.get(patfy(['transactions', id]))
        .reply(200, responses.transaction.get);
    },
    all: function() {
      httpMockWrap.get(patfy('transactions'))
        .reply(200, responses.transaction.all);
    }
  },
  subscription: {
    create: function(response) {
      httpMockWrap.post(patfy('subscriptions'))
        .reply(200, responses.transaction.create[response]);

      mock.card_hash_key();
    },
    refund: function(id) {
      httpMockWrap.post(patfy(['subscriptions', id, 'refund']))
        .reply(200, responses.transaction.refund);
    },
    find: function() {
      httpMockWrap.get(patfy('subscriptions'))
        .reply(200, responses.transaction.find);
    },
    get: function(id) {
      httpMockWrap.get(patfy(['subscriptions', id]))
        .reply(200, responses.transaction.get);
    },
    all: function() {
      httpMockWrap.get(patfy('subscriptions'))
        .reply(200, responses.transaction.all);
    }
  },
  card_hash_key: function() {
    httpMockWrap.get(patfy('transactions/card_hash_key'))
      .reply(200, responses.card_hash_key);
  }
};

module.exports = mock;
