
/*
 * GET home page.
 */
var ImageDealer = require('../lib/imageDealer');

exports.index = function(req, res){
  res.render('index', { title: 'Flickr Tryout' });
};

exports.ParseThenShow = function(req, res){
    // get parameter
    var foreignURL = req.params.url;
    // download the image
    var anImageDealer = new ImageDealer();
    anImageDealer.getImageURL(foreignURL,successCB, errorCB);

    var data = {};

    function successCB(url){
        data.url = url;
        res.json(200, data);
    }

    function errorCB(error){
        console.log(error);
        data.error = error;
        res.json(500, data);
    }
}