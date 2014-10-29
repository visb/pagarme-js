describe('create plan', function() {
    pagarme.plan.create({
        name: 'Plan test',
        days: '15',
        amount: '1000'
    }, function(err, response) {
        if (err) return console.log(err);

        console.log('Created plan #' + response.id);
    });
})
