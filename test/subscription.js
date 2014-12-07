var Pagarme = require('../lib/pagarme');
var expect = require('chai').expect;
var params = require('./helpers/params');
var mock = require('./helpers/mock');
var responses = require('./helpers/response');

describe('Subscription', function() {
  it('be able to create', function() {
    var subscription = new Pagarme.Subscription();
    expect(subscription).to.exist();
  });

  it('be able to charge', function(done) {
    mock.subscription.create('credit_card');
    new Pagarme.Subscription(params.subscription.credit_card).charge(function(error) {
      expect(error).to.not.exist();
      expect(this.status).to.equal('paid');
      done();
    });
  });

  it('be able to pay with boleto', function(done) {
    mock.subscription.create('boleto');
    var subscription = new Pagarme.Subscription(params.subscription.boleto);
    subscription.charge(function(error) {
      expect(error).to.not.exist();
      expect(this.status).to.equal('wayting_payment');
      expect(this.boleto_url).to.exist();
      done();
    });
  });

  it('be able to refund', function(done) {
    var id = 1;
    mock.subscription.refund(id);
    var subscription = new Pagarme.Subscription({ id: id });
    subscription.refund(function(error) {
      expect(error).to.not.exist();
      expect(this.status).to.equal('refunded');
      done();
    });
  });

  it('search by anything', function(done) {
    mock.subscription.find();
    Pagarme.Subscription().find({ status: 'paid' }, function(error) {
      expect(error).to.not.exist();
      expect(this.length).to.equal(responses.subscription.find.length);
      done();
    });
  });

  it('get by id', function(done) {
    var id = 1;
    mock.subscription.get(id);
    Pagarme.Subscription().get(id, function(error) {
      expect(error).to.not.exist();
      expect(this.id).to.equal(responses.subscription.get.id);
      done();
    });
  });

  it('list all', function(done) {
    mock.subscription.all();
    Pagarme.Subscription().all(function(error) {
      expect(error).to.not.exist();
      expect(this.length).to.equal(responses.subscription.all.length);
      done();
    });
  });
});
