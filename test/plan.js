var Pagarme = require('../lib/pagarme');
var expect = require('chai').expect;
var params = require('./helpers/params');
var mock = require('./helpers/mock');
var responses = require('./helpers/response');

describe('Plan', function() {
  it('be able to init', function() {
    var plan = new Pagarme.Plan();
    expect(plan).to.exist();
  });

  it('be able to create', function(done) {
    mock.plan.create();
    new Pagarme.Plan(params.plan.create).create(function(error) {
      expect(error).to.not.exist();
      expect(this.id).to.equal(responses.plan.create.id);
      done();
    });
  });

  it('search by anything', function(done) {
    mock.plan.find();
    Pagarme.Plan().find({ days: 15 }, function(error) {
      expect(error).to.not.exist();
      expect(this.length).to.equal(responses.plan.find.length);
      done();
    });
  });

  it('get by id', function(done) {
    var id = 1;
    mock.plan.get(id);
    Pagarme.Plan().get(id, function(error) {
      expect(error).to.not.exist();
      expect(this.id).to.equal(responses.plan.get.id);
      done();
    });
  });

  it('list all', function(done) {
    mock.plan.all();
    Pagarme.Plan().all(function(error) {
      expect(error).to.not.exist();
      expect(this.length).to.equal(responses.plan.all.length);
      done();
    });
  });
});
