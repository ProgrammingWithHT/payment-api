var Twocheckout = require('2checkout-node');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');


var app = express();
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded());


app.get('/', function(request, response) {response.render('index')});


app.post('/order', function(request, response) {
    console.log(request.body)
    var tco = new Twocheckout({
        sellerId: "255143724312",                                  // Seller ID, required for all non Admin API bindings
        privateKey: "6F657CEA-EE89-43BE-8ACF-C2DBA5C18AA5"         // Payment API private key, required for checkout.authorize binding
    });

    var params = {
        "merchantOrderId": Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000,
        "token": request.body.token,
        "currency": "USD",
        "total": "0.02",
        "billingAddr": {
            "name": "John Doe",
            "addrLine1": "123 Test St",
            "city": "Lahore",
            "state": "Punjab",
            "zipCode": "54000",
            "country": "Pakistan",
            "email": "example@2co.com",
            "phoneNumber": "5555555555"
        },
        "shippingAddr": {
            "name": "John Doe",
            "addrLine1": "123 Test St",
            "city": "Columbus",
            "state": "Ohio",
            "zipCode": "43123",
            "country": "Pakistan",
            "email": "example@2co.com",
            "phoneNumber": "5555555555"
        }
    };
    

    tco.checkout.authorize(params, function (error, data) {
        console.log(error.message)
        if (error) {response.send(error.message);} else {response.send(data.response.responseMsg);}
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});