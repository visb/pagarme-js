var request = require('request');
var url = require('url').parse('http://localhost/server.php');

var data = {teste:'ok'};

request({
    method: 'POST',
    uri: 'http://localhost/server.php',
    multipart: [{
        'content-type': 'application/json',
        body: JSON.stringify(data)
    },

    {
        body: 'I am an attachment'
    }]
}, function(error, response, body) {
    if (error) {
        return console.error('upload failed:', error);
    }
    console.log('Upload successful!  Server responded with:', body);
});
