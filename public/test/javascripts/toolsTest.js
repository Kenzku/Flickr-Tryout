/**
 * Author: Ken
 * Date: 26/04/2013
 * Time: 12:08
 */
/*global define, asyncTest, start, ok*/
define(['../../javascripts/tools.js',
        '../../javascripts/history.js'],
    function (Tools, History) {
        "use strict";
        return {
            RunTests : function () {
                module('Tools');
                asyncTest('flip horizontally', function () {
                    var anImage = document.createElement('img'),
                        aCanvas = document.createElement('canvas'),
                        fixture = document.getElementById('qunit-fixture');
                    fixture.appendChild(aCanvas);
                    anImage.src = '../../images/detail.jpg';

                    anImage.onload = function () {
                        var aContext = aCanvas.getContext('2d'),
                            aTools,
                            options;

                        aCanvas.height = anImage.height;
                        aCanvas.width = anImage.width;


                        aContext.drawImage(anImage, 0, 0);

                        aTools = new Tools();
                        options = {
                            method : 'horizontal',
                            canvas : aCanvas,
                            context : aContext,
                            image : anImage
                        };
                        function successCB(aCanvas, aContext, newImage) {
                            ok(true);
                            start();
                        }

                        function errorCB(error) {
                            ok(false, error);
                            start();
                        }
                        aTools.flip(options, successCB, errorCB);
                    };
                    anImage.onerror = function (e) {
                        console.log(e);
                        ok(false);
                        start();
                    };
                });

                asyncTest('flip vertically', function () {
                    var anImage = document.createElement('img'),
                        aCanvas = document.createElement('canvas'),
                        fixture = document.getElementById('qunit-fixture');
                    fixture.appendChild(aCanvas);
                    anImage.src = '../../images/detail.jpg';

                    anImage.onload = function () {
                        var aContext = aCanvas.getContext('2d'),
                            aTools,
                            options;

                        aCanvas.height = anImage.height;
                        aCanvas.width = anImage.width;


                        aContext.drawImage(anImage, 0, 0);

                        aTools = new Tools();
                        options = {
                            method : 'vertical',
                            canvas : aCanvas,
                            context : aContext,
                            image : anImage
                        };
                        function successCB(aCanvas, aContext, newImage) {
                            ok(true);
                            start();
                        }

                        function errorCB(error) {
                            ok(false, error);
                            start();
                        }
                        aTools.flip(options, successCB, errorCB);
                    };
                    anImage.onerror = function (e) {
                        console.log(e);
                        ok(false);
                        start();
                    };
                });

                asyncTest('flip with history', function () {
                    var anImage = document.createElement('img'),
                        aCanvas = document.createElement('canvas'),
                        fixture = document.getElementById('qunit-fixture');
                    fixture.appendChild(aCanvas);
                    anImage.src = '../../images/detail.jpg';

                    anImage.onload = function () {
                        var aContext = aCanvas.getContext('2d'),
                            theHistory,
                            aTools,
                            options;
                        // redo callbacks 2
                        function successCB_3(aContext) {
                            // becaues it shouldn't be here
                            ok(false);
                            start();
                        }
                        function errorCB_3(aContext) {
                            ok(false);
                            start();
                        }

                        // redo callbacks 1
                        function successCB_2(aContext) {
                            theHistory.redo(aContext, successCB_3, errorCB_3);
                            ok(true);
                            start();
                        }
                        function errorCB_2(aContext) {
                            ok(false);
                            start();
                        }

                        // undo callbacks
                        function successCB_1(aContext) {
                            theHistory.undo(aContext);
                            theHistory.redo(aContext, successCB_2, errorCB_2);
                            ok(true);
                        }
                        function errorCB_1(aContext) {
                            ok(false);
                            start();
                        }

                        function successCB(aCanvas, aContext, newImage) {
                            ok(true);
                            theHistory.undo(aContext, successCB_1, errorCB_1);
                        }

                        function errorCB(error) {
                            ok(false, error);
                            start();
                        }
                        aCanvas.height = anImage.height;
                        aCanvas.width = anImage.width;

                        aContext.drawImage(anImage, 0, 0);
                        theHistory = new History();
                        theHistory.saveHistory(aCanvas);
                        aTools = new Tools(theHistory);
                        options = {
                            method : 'vertical',
                            canvas : aCanvas,
                            context : aContext,
                            image : anImage
                        };
                        aTools.flip(options, successCB, errorCB);
                        // flip callbacks

                    };
                    anImage.onerror = function (e) {
                        console.log(e);
                        ok(false);
                        start();
                    };
                });
            }
        };
    });