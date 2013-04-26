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

            asyncTest('ask the server to get Image',function(){
                var aLoader = new Loader();
                aLoader.requestURL('http%3A%2F%2Ffarm9.staticflickr.com%2F8379%2F8682346439_e5e476ccb1_c.jpg',successCB, errorCB);
                function successCB(data){
                    var data = JSON.parse(data);
                    console.log(data);
                    ok(true);
                    start();
                }

                function errorCB(data){
                    console.log(data);
                    ok(false);
                    start();
                }
            });
        }
    }
});