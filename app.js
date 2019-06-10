var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var cors = require('cors');
var geo = require('./routes/geo');
var path = require('path');



var portSelected = 8484;
app.listen(portSelected, function(){
    console.log('connected on port:' +portSelected);
});

app.use('/geo', geo);


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// view engine setup
//app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

   // error handler
   app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
   // res.render('error');
  });
  
/*
  import {PluggableMap, View} from 'ol';
import MapRenderer from 'ol/renderer/canvas/Map';
import TileLayerRenderer from 'ol/renderer/canvas/TileLayer';
import {Tile as TileLayer} from 'ol/layer';
import {XYZ} from 'ol/source';
import {defaults as controlDefaults} from 'ol/control';
import {defaults as interactionDefaults} from 'ol/interaction';

PluggableMap.prototype.createRenderer = function() {
  const renderer = new MapRenderer(this);
  renderer.registerLayerRenderers([TileLayerRenderer]);
  return renderer;
}
new PluggableMap({
  target: 'map',
  controls: controlDefaults(),
  interactions: interactionDefaults(),
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

*/



  module.exports = app;