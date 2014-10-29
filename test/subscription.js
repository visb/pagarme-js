describe('create subscription', function() {
    
    pagarme.subscription.create({
        customer: {
            email: 'test@gmail.com'
        },
        plan_id: '8531',
        card_number: '4901720080344448',
        card_holder_name: 'Usuario de Testes',
        card_expiration_year: '16',
        card_expiration_month: '02',
        card_cvv: '314'
    }, function(err, response) {
        if (err) return console.log(err);

        console.log('Created subscription #' + response.id);
    });

});
