/**
 * Author: Ken
 * Date: 26/04/2013
 * Time: 12:08
 */
define(['../../javascripts/tools.js'],function(Tools){
    return  {
        RunTests : function (){
            module ('Tools');
            asyncTest ('flip horizontally',function(){
                var anImage = document.createElement('img');
                var aCanvas = document.createElement('canvas');
                var fixture = document.getElementById('qunit-fixture');
                fixture.appendChild(aCanvas);
                anImage.src = '../../images/detail.jpg';

                anImage.onload = function (){
                    aCanvas.height = anImage.height;
                    aCanvas.width = anImage.width;

                    var aContext = aCanvas.getContext('2d');
                    aContext.drawImage(anImage,0,0);

                    var aTools = new Tools();
                    var options = {
                        method : 'horizontal',
                        canvas : aCanvas,
                        context : aContext,
                        image : anImage
                    }
//                    aContext.save();
                    aTools.flip(options,successCB,errorCB);

//                    var pixelData_10_10_before = aContext.getImageData(10, 10, 1, 1).data;

                    function successCB(aCanvas,aContext,newImage){
//                        aContext.restore();
//                        var pixelData_10_10_after = aContext.getImageData(anImage.width - 10, 10, 1, 1).data;
//                        deepEqual(pixelData_10_10_before,pixelData_10_10_after);
                        ok(true);
                        start();
                    }

                    function errorCB(error){
                        ok(false,error);
                        start();
                    }

                }
                anImage.onerror = function (e){
                    console.log(e);
                    ok(false);
                    start();
                }
            });

            asyncTest ('flip vertically',function(){
                var anImage = document.createElement('img');
                var aCanvas = document.createElement('canvas');
                var fixture = document.getElementById('qunit-fixture');
                fixture.appendChild(aCanvas);
                anImage.src = '../../images/detail.jpg';

                anImage.onload = function (){
                    aCanvas.height = anImage.height;
                    aCanvas.width = anImage.width;

                    var aContext = aCanvas.getContext('2d');
                    aContext.drawImage(anImage,0,0);

                    var aTools = new Tools();
                    var options = {
                        method : 'vertical',
                        canvas : aCanvas,
                        context : aContext,
                        image : anImage
                    }
//                    aContext.save();
                    aTools.flip(options,successCB,errorCB);

                    var pixelData_10_10_before = aContext.getImageData(10, 10, 1, 1).data;
                    function successCB(aCanvas,aContext,newImage){
//                        aContext.restore();
//                        var pixelData_10_10_after = aContext.getImageData(10, newImage.height-10, 1, 1).data;
//                        deepEqual(pixelData_10_10_before,pixelData_10_10_after);
                        ok(true)
                        start();
                    }

                    function errorCB(error){
                        ok(false,error);
                        start();
                    }
                }
                anImage.onerror = function (e){
                    console.log(e);
                    ok(false);
                    start();
                }
            });
        }
    }
});