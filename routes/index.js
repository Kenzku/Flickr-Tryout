
/*
 * GET home page.
 */
var ImageDealer = require('../lib/imageDealer');

exports.index = function (req, res) {
    "use strict";
    res.render('index', { title: 'Flickr Tryout' });
};

exports.ParseThenShow = function (req, res) {
    "use strict";
    // get parameter
    var foreignURL = req.params.url,
        anImageDealer,
        data = {};
    function successCB(url) {
        data.url = url;
        res.json(200, data);
    }

    function errorCB(error) {
        console.log(error);
        data.error = error;
        res.json(500, data);
    }
    // download the image
    anImageDealer = new ImageDealer();
    anImageDealer.getImageURL(foreignURL, successCB, errorCB);
};