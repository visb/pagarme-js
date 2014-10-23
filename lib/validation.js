var util = require('./util');

var validation = function() {
    var validators = {
        card_number: function(value) {
            return true;
        }
    };

    return {
        validate: function(data) {
            util.object.forEach(data, function(index, value){
                if (validators[index]) {
                    if (!validators[index](value)) {
                        throw new Exception('Invalid ' + index + ' value');
                    }
                }
            });
        }
    };
};

module.exports = validation();
