/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 14:30
 */
define(['../../javascripts/search.js'],function (Search){
    return {
        RunTests : function () {
            module('Search');
            asyncTest('Search photo with keywords from Flickr',function(){
                var aSearch = new Search();
                var options = {
                    keywords : 'dog'
                };
                aSearch.searchPhoto(options,successCB,errorCB);

                function successCB(data){
                    console.log(data);
                    equal(data.stat,'ok');
                    equal(data.photos.page,CONSTANT.FLICKR.PAGE);
                    equal(data.photos.photo.length,CONSTANT.FLICKR.PER_PAGE);
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