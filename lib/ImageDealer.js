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
    /**
     * download image for the client
     * @param url {String} the URL of the image
     * @param successCallback (res, body)
     * body is the image
     * @param errorCallback (error) if not given, an error will be thrown
     */
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
    /**
     * get the image from the given URL
     * @param url {String} the URL of the image
     * @param successCallback (String:url) the address of the downloaded image
     * @param errorCallback (error)
     */
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