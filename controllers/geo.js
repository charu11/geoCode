var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var cors = require('cors');
var openGeoCoder = require('node-open-geocoder');
var path = require('path');
var translate = require('translate');
var nominatim = require('nominatim-geocoder');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// view engine setup
//app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


var geocoder = new nominatim({
    delay : 1000,
    secure: false,
    host: 'nominatim.openstreetmap.org',
    customUrl: 'http://localhost:8484/geo/reverse'
})




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(morgan('Nexzent-core-log'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

  //enable CORS
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  
  });

 exports.addGeo = function(req,res){
     
    openGeoCoder()
    .geocode('135 pilkington avenue, birmingham', {addressDetails: 1, polygon_geojson: 1})
    .end(function(err, result){
        if(err){
            console.log('error occured');

        }else{
            console.log(result);
            res.json(result);
            
        }
    });
 } ;


 exports.reverseGeo = function(req,res){
 openGeoCoder()
    .reverse(80.787218, 6.714616)
    .end(function(err, result){
        if(err){
            console.log(err);
        }else{
        
            console.log(result);
           res.json(result);
        }
        
    })

};