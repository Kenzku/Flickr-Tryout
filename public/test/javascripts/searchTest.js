/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 14:30
 */
/*global define, asyncTest, start, equal, ok*/
define(['../../javascripts/search.js',
        '../../javascripts/Constant.js'],
    function (Search, CONSTANT) {
        "use strict";
        return {
            RunTests : function () {
                module('Search');
                asyncTest('Search photo with keywords from Flickr', function () {
                    var aSearch = new Search(),
                        options = {
                            keywords : 'dog'
                        };
                    function successCB(data) {
                        console.log(data);
                        equal(data.stat, 'ok');
                        equal(data.photos.page, CONSTANT.FLICKR.PAGE);
                        equal(data.photos.photo.length, CONSTANT.FLICKR.PER_PAGE);
                        start();
                    }

                    function errorCB(err) {
                        equal(err.stat, 'fail');
                        ok(false, 'it goes to flickr fail - check reason: ' + err.message);
                        start();
                    }
                    aSearch.searchPhoto(options, successCB, errorCB);
                });
            }
        };
    });