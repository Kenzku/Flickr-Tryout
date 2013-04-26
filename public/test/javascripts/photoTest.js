/**
 * Author: Ken
 * Date: 25/04/2013
 * Time: 13:23
 */
define(['../../javascripts/photo.js'],function(Photo){
    return  {
        RunTests : function (){
            module ('Selected Photo');

            test('create canvas - 1',function(){
                expect(4);
                var aPhoto = new Photo();
                var aCanvas =aPhoto.createCanvas(callback);

                function callback(aCanvas){
                    ok(aCanvas.constructor === HTMLCanvasElement);
                    equal(aCanvas.getAttribute('id'),'imageCanvas');
                }
                ok(aCanvas.constructor === HTMLCanvasElement);
                equal(aCanvas.getAttribute('id'),'imageCanvas');
            });

            test('create canvas - 2',function(){
                var aPhoto = new Photo();
                var aCanvas =aPhoto.createCanvas();

                deepEqual(aCanvas,aPhoto.canvas);
            });

            asyncTest('add an image to the canvas',function(){
                var aPhoto = new Photo();

                aPhoto.addToCanvas('http://farm9.staticflickr.com/8403/8679589215_80f8bbbd6e_m.jpg',
                    successCB, errorCB);

                function successCB(aCanvas,aContext,anImage){
                    var imageZone = document.getElementById('imageZone');

                    // is the canvas
                    ok(imageZone.firstElementChild.constructor === HTMLCanvasElement);
                    equal(imageZone.firstElementChild.getAttribute('id'),'imageCanvas');

                    // is only one canvas: removeOldCanvas
                    equal(imageZone.childElementCount,1);

                    // is canvas context
                    equal(aCanvas.height,anImage.height);
                    equal(aCanvas.width,anImage.width);

                    /* NEED TO IMPROVE - TESTING `drawImage` */

                    start();
                }

                function errorCB(error) {
                    ok(false,error);
                    start();
                }
            });

//            asyncTest('flip an image',function () {
//                var aPhoto = new Photo();
//
//                aPhoto.addToCanvas('http://farm9.staticflickr.com/8403/8679589215_80f8bbbd6e_m.jpg',
//                    successCB_1, errorCB_1);
//
//                function successCB_1(aCanvas,aContext,anImage){
//                    aPhoto.flip('horizontal',anImage,aContext,successCB_2,errorCB_2);
//                }
//
//                function errorCB_1(error) {
//                    ok(false,error);
//                    start();
//                }
//
//                function successCB_2 (aCanvas,aContext,anImage) {
//                    ok(true);
//                    start();
//                }
//
//                function errorCB_2(error) {
//                    console.log(error);
//                    ok(false,error);
//                    start();
//                }
//            });
        }
    }
});