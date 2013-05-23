/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 22:07
 */
/*global define, asyncTest, equal, start, deepEqual, ok*/
define(['../../javascripts/Constant.js',
        '../../javascripts/search.js',
        '../../javascripts/photos.js'],
    function (CONSTANT, Search, Photos) {
        "use strict";
        return {
            RunTests : function () {
                module('Photo');
                asyncTest('List Photos in DOM - img', function () {
                    var aSearch = new Search(),
                        options;
                    function successCB(data) {
                        var i,
                            imageUrl,
                            aPhotos = new Photos(),
                            photoDOMList;
                        photoDOMList = aPhotos.listPhotos(data.photos);

                        equal(photoDOMList.length, data.photos.photo.length);

                        for (i = 0; i < photoDOMList.length; i += 1) {
                            imageUrl = 'http://farm' + data.photos.photo[i].farm
                                + '.staticflickr.com/' + data.photos.photo[i].server
                                + '/' + data.photos.photo[i].id
                                + '_' + data.photos.photo[i].secret
                                + '_m.jpg';
                            deepEqual(photoDOMList[i].src, imageUrl);
                        }
                        start();
                    }

                    function errorCB(err) {
                        equal(err.stat, 'fail');
                        ok(false, 'it goes to flickr fail - check reason: ' + err.message);
                        start();
                    }
                    options = {
                        keywords : 'dog'
                    };
                    aSearch.searchPhoto(options, successCB, errorCB);
                });

                asyncTest('Get photo URLs from Flickr', function () {
                    var aSearch = new Search(),
                        options;
                    options = {
                        keywords : 'dog'
                    };
                    function successCB(data) {
                        var i,
                            match,
                            aPhotos = new Photos(),
                            photoURLs;
                        photoURLs = aPhotos.getPhotoURLs(data.photos);

                        equal(photoURLs.length, data.photos.photo.length);

                        for (i = 0; i < photoURLs.length; i += 1) {
                            match = photoURLs[i].match(CONSTANT.OTHER.URL);
                            deepEqual(photoURLs[i], match[0]);
                        }
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