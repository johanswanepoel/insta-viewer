/*
Workflow
    - Grab the packages we need (Express, EJS, instagram-node)
    - Configure these packages
        - Set Instagram API access token
        - Set EJS as our templating engine
        - Set Express assets directory (for CSS)
    - Create a route for the home page
        - Grab our Instagram images
        - Pass to our views
    - Start the server

    https://api.instagram.com/v1/users/self/media/recent?access_token=###
*/

// ==================================================
// GRAB THE PACKAGES/VARIABLES WE NEED
// ==================================================

var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();

// ==================================================
// CONFIGURE THE APP
// ==================================================

// tell node where to look for site resources
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// configure instagram app with your access token
ig.use({
    // get access token here: http://instagram.pixelunion.net/
    access_token: 'YOUR_ACCESS_TOKEN',
});

// ==================================================
// SET THE ROUTES
// ==================================================

// home page route - popular images
app.get('/', function (req, res) {
    // use the instagram package to get popular media
    ig.user_self_media_recent(function (err, medias, pagination, remaining, limit) {
        // render the home page and pass in the popular images
        res.render('pages/index', { grams: medias }); // automatically checks for a 'views' folder
    });
});

// ==================================================
// START THE SERVER
// ==================================================

app.listen(8080);
console.log('App started! Look at http://localhost:8080');