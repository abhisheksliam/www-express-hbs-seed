'use strict';

/* dependencies */
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

//config
const config = require("./server/config");

//Express
let app = express();

//Default location of Express Views - used in development mode
let viewsPath = path.join(__dirname, '.tmp', 'views');

//Environment setup production / development
if (process.env.NODE_ENV === 'production') {
    // Override Views location to dist folder
    viewsPath = path.join(__dirname, 'dist');
    app.use(express.static(__dirname + '/dist/'));
    app.set('views', viewsPath);
} else {
    // make express look in the public directory for assets (css/js/img)
    app.use(express.static(__dirname + '/.tmp/'));
    app.use(express.static(__dirname + '/app/'));
    app.set('views', viewsPath);
}
// 3.Support for  json encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//-----------Express WWW Server-------------------
let port = process.env.PORT || 8080;
// Serve Bower Components based JS & CSS & Image assets
app.use("/bower_components", express.static(__dirname + '/bower_components'));

// View engine setup (handlebars) based in viewsPath defined earlier
app.engine('.hbs', exphbs({
    defaultLayout: 'default',
    layoutsDir: viewsPath + '/layouts',
    partialsDir: viewsPath + '/partials',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

require('./server/routes/app.server.routes')(app);

//-----------Start listening -------------------
app.listen(port, function() {
	console.log('Your Automation App is running on http://localhost:' + port);
	console.log('Environment is set to ' + (process.env.NODE_ENV || 'development'));
});
