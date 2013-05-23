/**
 * Author: Ken
 * Date: 27/04/2013
 * Time: 11:32
 */
/*global define, ok, start, asyncTest*/
define(['../../javascripts/history.js'],
    function (History) {
        "use strict";
        return {
            RunTests : function () {
                module('History');
                asyncTest('save-undo-redo', function () {
                    var i,
                        aCanvas = document.createElement('canvas'),
                        theHistory,
                        aContext,
                        flag = 0;
                    function successCB_1(aContext) {
                        ok(true);
                    }
                    function errorCB_1(aContext) {
                        ok(false);
                        start();
                    }
                    function successCB_2(aContext) {
                        ok(true);
                        flag += 1;
                        if (flag === 4) {
                            start();
                        }
                    }
                    function errorCB_2(aContext) {
                        ok(false);
                        start();
                    }
                    aCanvas.height = 500;
                    aCanvas.width = 500;

                    theHistory = new History();

                    theHistory.saveHistory(aCanvas);

                    aContext = aCanvas.getContext('2d');

                    for (i = 0; i < 5; i += 1) {
                        aContext.strokeStyle = "black";
                        aContext.beginPath();
                        aContext.moveTo(i * i, 40 * 5);
                        aContext.lineTo(80 * i, 40 * i);
                        aContext.lineTo(40 * i, 80 * i);
                        aContext.closePath();
                        aContext.stroke();
                        theHistory.saveHistory(aCanvas);
                    }

                    for (i = 0; i < 5; i += 1) {
                        theHistory.undo(aContext, successCB_1, errorCB_1);
                    }

                    for (i = 0; i < 5; i += 1) {
                        theHistory.redo(aContext, successCB_2, errorCB_2);
                    }

                });
            }
        };
    });