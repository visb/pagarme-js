var util = {
    object: {
        forEach: function(object, callback) {
            Object.keys(object).forEach(function(index) {
                callback(index, object[index]);
            });
        }
    }
};

module.exports = util;
