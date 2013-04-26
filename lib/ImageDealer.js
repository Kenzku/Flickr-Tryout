/**
 * Author: Ken
 * Date: 26/04/2013
 * Time: 13:51
 */

var http = require('http')
    , fs = require('fs')
    , CONSTANT = require('../lib/Constant')
    , path = require('path');

function ImageDealer(){
    var self = this;

    self.getImageFromURL = function (url,successCallback,errorCallback) {
        var body = "";
        http.get(url, function(res) {
            res.setEncoding('binary');
            // the 'res' is the request that I sent, not the response that I receive
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                var dir = path.join(__dirname,'../','public/images',CONSTANT.FILE.DEFAULT_NAME);
                fs.writeFile(dir, body, 'binary', function(e){
                    if (e) {
                        if (errorCallback && typeof errorCallback === 'function'){
                            errorCallback(e);
                        }else{
                            throw e;
                        }
                    }else{
                        if (successCallback && typeof successCallback === 'function'){
                            // body is an array of urls
                            successCallback(res,body);
                        }
                    }
                })
            });
        }).on('error', function(e) {
                if (errorCallback && typeof errorCallback === 'function'){
                    errorCallback(e);
                }else{
                    throw e;
                }
            });
    }

    self.getImageURL = function(url,successCallback,errorCallback){
        self.getImageFromURL(url,successCB,errorCallback);
        function successCB (res,body){
            var url = '/images/' + CONSTANT.FILE.DEFAULT_NAME;
            if ( successCallback && typeof successCallback === 'function'){
                successCallback(url);
            }
        }
    }
}
module.exports = ImageDealer;