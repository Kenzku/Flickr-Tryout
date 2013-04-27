/**
 * Author: Ken
 * Date: 27/04/2013
 * Time: 11:32
 */
define(['../../javascripts/tools.js',
        '../../javascripts/history.js'],function(){
    return {
        RunTests : function (){
            module('History');
            asyncTest('save-undo-redo',function(){
                var aCanvas = document.createElement('canvas');
                aCanvas.height = 500;
                aCanvas.width = 500;

                var theHistory = new History();

                theHistory.saveHistory(aCanvas);

                var aContext = aCanvas.getContext('2d');

                for (var i = 0 ; i < 5; i ++){
                    aContext.strokeStyle = "black";
                    aContext.beginPath();
                    aContext.moveTo((0 + i)*i, 40*5);
                    aContext.lineTo(80*i, 40*i);
                    aContext.lineTo(40*i, 80*i);
                    aContext.closePath();
                    aContext.stroke();
                    theHistory.saveHistory(aCanvas);
                }

                for (var i = 0 ; i < 5; i ++){
                    theHistory.undo(aContext,successCB_1,errorCB_1);
                }
                function successCB_1(aContext){
                    ok(true);
                }
                function errorCB_1(aContext){
                    ok(false);
                    start();
                }
                var flag = 0;
                for (var i = 0 ; i < 5; i ++){
                    theHistory.redo(aContext,successCB_2,errorCB_2);
                }
                function successCB_2(aContext){
                    ok(true);
                    flag ++;
                    if (flag == 4){
                        start();
                    }
                }
                function errorCB_2(aContext){
                    ok(false);
                    start();
                }
            });
        }
    }
});