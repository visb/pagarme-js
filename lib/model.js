var util = require('./util');

var model = function(pagarme, path) {
    this.path = path;
    
    this.create = function(data, callback) {
        return new pagarme.request(this.path, 'POST', data).then(callback);
    };
            
    this.refund = function(id, params, callback) {
        id = ~~id;
        var url = this.path + '/' + id + '/refund';
        
        if (typeof params == 'function') {
            callback = params;
            params = undefined;
        }
        
        return new pagarme.request(url, 'post', params).then(callback || function(){});
    };

    this.get = function(params, callback) {
        var id;
        var url = this.path;
        
        if (typeof params == 'function') {
            callback = params;
            params = undefined;
        } else if (~~params == params) {
            id = params;
            params = undefined;
        }
        
        if (id) {
            url += '/' + id;
        }
        
        var request = new pagarme.request(url, 'get', params).then(callback || function(){});
    };
};


module.exports = model;
