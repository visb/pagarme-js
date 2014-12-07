var Pagarme = require('../lib/pagarme');
var expect = require('chai').expect;
var params = require('./helpers/params');
var mock = require('./helpers/mock');

describe('Transaction', function() {
  it('be able to create', function() {
    var transaction = new Pagarme.Transaction();
    expect(transaction).to.exist();
  });

  it('be able to charge', function(done) {
    mock.transaction.create('credit_card');
    new Pagarme.Transaction(params.transaction.credit_card).charge(function(error) {
      expect(error).to.not.exist();
      expect(this.status).to.equal('paid');
      done();
    });
  });
});
