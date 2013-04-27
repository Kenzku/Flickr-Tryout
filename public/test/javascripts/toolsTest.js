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
                    aTools.flip(options,successCB,errorCB);

                    function successCB(aCanvas,aContext,newImage){
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

            asyncTest ('flip with history',function(){
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
                    var theHistory = new History();
                    theHistory.saveHistory(aCanvas);
                    var aTools = new Tools(theHistory);
                    var options = {
                        method : 'vertical',
                        canvas : aCanvas,
                        context : aContext,
                        image : anImage
                    }
                    aTools.flip(options,successCB,errorCB);
                    // flip callbacks
                    function successCB(aCanvas,aContext,newImage){
                        ok(true)
                        theHistory.undo(aContext,successCB_1,errorCB_1);
                    }

                    function errorCB(error){
                        ok(false,error);
                        start();
                    }
                    // undo callbacks
                    function successCB_1(aContext){
                        theHistory.undo(aContext);
                        theHistory.redo(aContext,successCB_2,errorCB_2);
                        ok(true);
                    }
                    function errorCB_1(aContext){
                        ok(false);
                        start();
                    }
                    // redo callbacks 1
                    function successCB_2(aContext){
                        theHistory.redo(aContext,successCB_3,errorCB_3);
                        ok(true);
                        start();
                    }
                    function errorCB_2(aContext){
                        ok(false);
                        start();
                    }
                    // redo callbacks 2
                    function successCB_3(aContext){
                        // becaues it shouldn't be here
                        ok(false);
                        start();
                    }
                    function errorCB_3(aContext){
                        ok(false);
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