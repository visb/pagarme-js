var Pagarme = require('../lib/pagarme');
var expect = require('chai').expect;
var params = require('./helpers/params');
var mock = require('./helpers/mock');
var responses = require('./helpers/response');

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

  it('be able to receive validation warnings', function(done) {
    mock.transaction.create('invalid_credit_card', 401);
    new Pagarme.Transaction(params.transaction.invalid_credit_card).charge(function(error) {
      expect(error).to.exist();
      expect(error.parameter_name).to.equal('card_number');
      done();
    });
  });

  it('be able to pay with boleto', function(done) {
    mock.transaction.create('boleto');
    var transaction = new Pagarme.Transaction(params.transaction.boleto);
    transaction.charge(function(error) {
      expect(error).to.not.exist();
      expect(this.status).to.equal('wayting_payment');
      expect(this.boleto_url).to.exist();
      done();
    });
  });

  it('be able to refund', function(done) {
    var id = 1;
    mock.transaction.refund(id);
    var transaction = new Pagarme.Transaction({ id: id });
    transaction.refund(function(error) {
      expect(error).to.not.exist();
      expect(this.status).to.equal('refunded');
      done();
    });
  });

  it('search by anything', function(done) {
    mock.transaction.find();
    Pagarme.Transaction().find({ status: 'paid' }, function(error) {
      expect(error).to.not.exist();
      expect(this.length).to.equal(responses.transaction.find.length);
      done();
    });
  });

  it('get by id', function(done) {
    var id = 1;
    mock.transaction.get(id);
    Pagarme.Transaction().get(id, function(error) {
      expect(error).to.not.exist();
      expect(this.id).to.equal(responses.transaction.get.id);
      done();
    });
  });

  it('list all', function(done) {
    mock.transaction.all();
    Pagarme.Transaction().all(function(error) {
      expect(error).to.not.exist();
      expect(this.length).to.equal(responses.transaction.all.length);
      done();
    });
  });
});
