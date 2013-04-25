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

    self.canvas = null;
    self.context = null;

    /**
     * remove old canvas
     * add image to the canvas
     * put the canvas on DOM tree
     * @param imgURL {String} image url
     * @param successCallback (aCanvas,aContext,anImage)
     * called when successfully load the image:anImage on the canvas: aCanvas
     * aContext is the context of the canvas
     * @param errorCallback (error)
     */
    self.addToCanvas = function (imgURL, successCallback, errorCallback){
        var anImage = new Image();
        anImage.src = imgURL;

        anImage.onload = function () {
            var aDOM = new DOM();
            aDOM.hideLoading();
            // create canvas
            var aCanvas = self.createCanvas(removeOldCanvas);

            // append canvas to the page
            var imageZone = document.getElementById('imageZone');
            imageZone.appendChild(aCanvas);

            // get canvas context
            var aContext = aCanvas.getContext('2d');
            self.context = aContext;

            // set canvas context
//            aCanvas.height = anImage.height + CONSTANT.CANVAS.HEIGHT_PADDING;
//            aCanvas.width = anImage.width + CONSTANT.CANVAS.WIDTH_PADDING;
            aCanvas.height = anImage.height;
            aCanvas.width = anImage.width;
            // load the image that selected onto the canvas
//            aContext.drawImage(anImage,CONSTANT.CANVAS.X,CONSTANT.CANVAS.Y);
            aContext.drawImage(anImage,0,0);

            if (successCallback && typeof successCallback === 'function'){
                successCallback(aCanvas,aContext,anImage);
            }
        }

        anImage.onerror = function(error){
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(error);
            }else{
                throw error;
            }
        };

        function removeOldCanvas() {
            // clear canvas if there is any
            var imageZone = document.getElementById('imageZone');
            if (imageZone.childElementCount > 0){
                var aDOM = new DOM();
                aDOM.removeChildren(imageZone);
            }
        }
    }
    /**
     * create a canvas element with id: imageCanvas
     * @param callback (HTMLCanvasElement:aCanvas)
     * @returns {HTMLElement}
     */
    self.createCanvas = function (callback) {
        var aCanvas = document.createElement('canvas');
        aCanvas.setAttribute('id','imageCanvas');

        self.canvas = aCanvas;
        if (callback && typeof callback === 'function'){
            callback(aCanvas);
        }
        return aCanvas;
    }

    self.reset = function() {
        self.canvas = null;
        self.context = null;
    }
}