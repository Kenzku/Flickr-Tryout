/**
 * Author: Ken
 * Date: 26/04/2013
 * Time: 14:07
 */
var assert = require("assert")
    , fs = require('fs')
    , ImageDealer = require('../lib/imageDealer')
    , CONSTANT = require('../lib/Constant')
    , path = require('path');

function ok(expr, msg) {
    if (!expr) throw new Error(msg);
}

suite('ImageDealer');

test('download image from foreign domain',function(done){
    var anImageDealer = new ImageDealer();
    anImageDealer.getImageURL(CONSTANT.URL.TEST_URL,
        successCB, errorCB);

    var data = {};

    function successCB(url){
        data.url = url;
        assert.equal(url, '/images/detail.jpg');

        var dir = path.join(__dirname,'../','public/images');
        fs.readdir(dir,function (err, files) {
            if (err) throw err;
            assert.equal(files[0],CONSTANT.FILE.DEFAULT_NAME);
            done();
        });
    }

    function errorCB(error){
        data.error = error;
        console.log(error);
        done();
    }
});