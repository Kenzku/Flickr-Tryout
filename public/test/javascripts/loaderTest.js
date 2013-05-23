/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 14:01
 */
/*global define, equal, ok, start, asyncTest*/
define(['../../javascripts/loader.js',
        '../../javascripts/Constant.js'],
    function (Loader, CONSTANT) {
        "use strict";
        return {
            RunTests : function () {
                module('Loader');
                asyncTest('Load photo from Flickr', function () {
                    var aLoader = new Loader(),
                        options;
                    function jsonFlickrApi(data) {
                        console.log(data);
                    }
                    function successCB(data) {
                        console.log(data);
                        equal(data.stat, 'ok');
                        equal(data.photos.page, options.page);
                        equal(data.photos.photo.length, CONSTANT.FLICKR.PER_PAGE);
                        start();
                    }

                    function errorCB(err) {
                        equal(err.stat, 'fail');
                        ok(false, 'it goes to flickr fail - check reason: ' + err.message);
                        start();
                    }
                    options = {
                        keywords : 'cat',
                        page : 3
                    };
                    aLoader.loadData(options, successCB, errorCB);
                });

                asyncTest('ask the server to get Image', function () {
                    var aLoader = new Loader(),
                        data;
                    function successCB(data) {
                        data = JSON.parse(data);
                        console.log(data);
                        ok(true);
                        start();
                    }

                    function errorCB(data) {
                        console.log(data);
                        ok(false);
                        start();
                    }
                    aLoader.requestURL('http%3A%2F%2Ffarm9.staticflickr.com%2F8379%2F8682346439_e5e476ccb1_c.jpg', successCB, errorCB);
                });
            }
        };
    });