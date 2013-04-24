/**
 * Author: Ken
 * Date: 24/04/2013
 * Time: 23:46
 */
define(['../javascripts/Constant.js',
        '../javascripts/DOM.js'],function(CONSTANT,DOM){
    return Photo;
});

function Photo() {
    var self = this;

    self.addToCanvas = function (imgURL, successCallback, errorCallback){
        var image = new Image();
        image.src = imgURL;
        image.onload = function () {
            var aDOM = new DOM();
            aDOM.hideLoading();

            var aCanvas = self.createCanvas(removeOddCanvas);

            var content = document.getElementById('imageZone');
            content.appendChild(aCanvas);

            var aContext = aCanvas.getContext('2d');

            aCanvas.height = image.height + CONSTANT.CANVAS.HEIGHT_PADDING;
            aCanvas.width = image.width + CONSTANT.CANVAS.WIDTH_PADDING;
            aContext.drawImage(image,CONSTANT.CANVAS.X,CONSTANT.CANVAS.Y);
            if (successCallback && typeof successCallback === 'function'){
                successCallback(aCanvas,aContext);
            }
        }

        image.onerror = function(error){
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(error);
            }else{
                throw error;
            }
        };

        function removeOddCanvas() {
            // clear canvas if there is any
            var imageZone = document.getElementById('imageZone');
            if (imageZone.childElementCount > 0){
                var aDOM = new DOM();
                aDOM.removeChildren(imageZone);
            }
        }
    }

    self.createCanvas = function (callback) {
        var aCanvas = document.createElement('canvas');
        aCanvas.setAttribute('id','imageCanvas');

        self.canvas = aCanvas;
        if (callback && typeof callback === 'function'){
            callback();
        }
        return aCanvas;
    }
}