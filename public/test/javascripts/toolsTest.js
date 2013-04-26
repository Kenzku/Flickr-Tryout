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
                        context : aContext,
                        image : anImage
                    }
                    aTools.flip(options);
                    ok(true);
                    start();
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
                        context : aContext,
                        image : anImage
                    }
                    aTools.flip(options);
                    ok(true);
                    start();
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