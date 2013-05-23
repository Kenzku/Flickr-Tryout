
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    howto = require('./routes/howto'),
    http = require('http'),
    path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
/*jslint nomen: true*/
app.set('views', __dirname + '/views');
/*jslint nomen: false*/
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
/*jslint nomen: true*/
app.use(express.static(path.join(__dirname, 'public')));
/*jslint nomen: false*/

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/url/:url', routes.ParseThenShow);
app.get('/howto', howto.show);
app.get('/test', function (req, res) {
    "use strict";
    /*jslint nomen: true*/
    res.sendfile(__dirname + '/public/test/testall.html');
    /*jslint nomen: false*/
});
http.createServer(app).listen(app.get('port'), function () {
    "use strict";
    console.log('Express server listening on port ' + app.get('port'));
});
