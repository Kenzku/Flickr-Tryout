/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 22:07
 */
define(['../../javascripts/Constant.js',
        '../../javascripts/search.js',
        '../../javascripts/photos.js'],function (CONSTANT,Search,Photos){
    return {
        RunTests : function () {
            module('Photo');
            asyncTest('List Photos in DOM - img',function(){
                var aSearch = new Search();
                var options = {
                    keywords : 'dog'
                };
                aSearch.searchPhoto(options,successCB,errorCB);

                function successCB(data){
                    var aPhotos = new Photos();
                    var photoDOMList = aPhotos.listPhotos(data.photos);

                    equal(photoDOMList.length,data.photos.photo.length);

                    for (var i = 0; i < photoDOMList.length; i++){
                        var imageUrl = 'http://farm' + data.photos.photo[i].farm
                            + '.staticflickr.com/' + data.photos.photo[i].server
                            + '/' + data.photos.photo[i].id
                            + '_' + data.photos.photo[i].secret
                            + '_m.jpg';
                        deepEqual(photoDOMList[i].src,imageUrl);
                    }
                    start();
                }

                function errorCB (err) {
                    equal(err.stat,'fail');
                    ok(false,'it goes to flickr fail - check reason: ' + err.message);
                    start();
                }

            });

            asyncTest('Get photo URLs from Flickr',function(){
                var aSearch = new Search();
                var options = {
                    keywords : 'dog'
                };
                aSearch.searchPhoto(options,successCB,errorCB);

                function successCB(data){
                    var aPhotos = new Photos();
                    var photoURLs = aPhotos.getPhotoURLs(data.photos);

                    equal(photoURLs.length,data.photos.photo.length);

                    for (var i = 0; i < photoURLs.length; i++){
                        var match = photoURLs[i].match(CONSTANT.OTHER.URL);
                        deepEqual(photoURLs[i],match[0]);
                    }
                    start();
                }

                function errorCB (err) {
                    equal(err.stat,'fail');
                    ok(false,'it goes to flickr fail - check reason: ' + err.message);
                    start();
                }
            });
        }
    }
});