var model = require('./model');

var plan = function(pagarme) {
    var planModel = new model(pagarme, '/plans');
    return planModel;
};

module.exports = plan;
