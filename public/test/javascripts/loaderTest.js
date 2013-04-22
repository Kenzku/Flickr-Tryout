/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 14:01
 */
define(['../../javascripts/loader.js'],function (Loader){
    return {
        RunTests : function () {
            module('Loader');
            asyncTest('Load photo from Flickr',function(){
                var aLoader = new Loader();
                var options = {
                    keywords : 'cat',
                    page : 3
                };
                aLoader.loadData(options,successCB,errorCB);

                function successCB(data){
                    console.log(data);
                    equal(data.stat,'ok');
                    equal(data.photos.page,options.page);
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