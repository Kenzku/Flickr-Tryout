/**
 * Author: Ken
 * Date: 27/04/2013
 * Time: 10:48
 */
/*global define*/
define(function () {
    "use strict";
    /**
     * use the proper of Canvas : when changing,
     * it adds another layer to itself
     * @constructor
     */
    function History() {
        var self = this;

        self.step = -1;
        self.history = [];

        /**
         * save the current canvas into history
         * @param aCanvas the Canvas that you draw
         */
        self.saveHistory = function (aCanvas) {
            self.step += 1;
            if (self.step < self.history.length) {
                self.history.length = self.step;
            }
            self.history.push(aCanvas.toDataURL());
        };
        /**
         * undo changes on the Canvas
         * @param aContext the context of the current Canvas
         * @param successCallback (newContext)
         * newContext the Context of the Canvas after undo
         * @param errorCallback (error)
         */
        self.undo = function (aContext, successCallback, errorCallback) {
            if (self.step > 0) {
                self.step -= 1;
                var anImage = document.createElement('img');
                anImage.src = self.history[self.step];
                anImage.onload = function () {
                    aContext.drawImage(anImage, 0, 0);
                    if (successCallback && typeof successCallback === 'function') {
                        successCallback(aContext);
                    }
                };
                anImage.onerror = function (e) {
                    if (errorCallback && typeof errorCallback === 'function') {
                        errorCallback(e);
                    } else {
                        throw e;
                    }
                };
            }
        };
        /**
         * redo changes on the Canvas
         * @param aContext the context of the current Canvas
         * @param successCallback (newContext)
         * newContext the Context of the Canvas after undo
         * @param errorCallback (error)
         */
        self.redo = function (aContext, successCallback, errorCallback) {
            if (self.step < self.history.length - 1) {
                self.step += 1;
                var anImage = document.createElement('img');
                anImage.src = self.history[self.step];
                anImage.onload = function () {
                    aContext.drawImage(anImage, 0, 0);
                    if (successCallback && typeof successCallback === 'function') {
                        successCallback(aContext);
                    }
                };
                anImage.onerror = function (e) {
                    if (errorCallback && typeof errorCallback === 'function') {
                        errorCallback(e);
                    } else {
                        throw e;
                    }
                };
            }
        };
    }
    return History;
});