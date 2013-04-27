/**
 * Author: Ken
 * Date: 25/04/2013
 * Time: 16:34
 */
define(['../javascripts/Constant.js',
        '../javascripts/lib/canvas2image.js'],function(CONSTANT,Canvas2Image) {
    return Tools;
});
function Tools (historySupport) {
    var self = this;

    self.history = historySupport ? historySupport : null;
    /**
     * flip the image
     * @param options {Object}
     * method : {String} either "horizontal" or "vertical"
     * context : the Context of the Canvas
     * image : the Image Element
     * @param successCallback (Canvas, Context, Image)
     * @param errorCallBack (error)
     */
    self.flip = function (options,successCallback, errorCallBack) {
        if (!options ||
            !options.canvas ||
            !options.context||
            !options.image){
            return;
        }
        if (self.history) {
            self.history.saveHistory(options.canvas);
        }
        var aMethod = options.method ? options.method : 'horizontal';
        var aCanvas = options.canvas;
        var aContext = options.context;
        var anImage = options.image;
        if (aMethod == 'horizontal'){
            var newImage = document.createElement('img');
            newImage.src = aCanvas.toDataURL();
            newImage.onload = function (){
                aContext.drawImage(newImage,0,0);
                aContext.translate(newImage.width,0);
                aContext.scale(-1,1);
                aContext.drawImage(newImage, 0,0, newImage.width, newImage.height);
                if (successCallback && typeof successCallback == 'function'){
                    successCallback(aCanvas,aContext,newImage);
                }
            }

            newImage.onerror = function (error){
                if (errorCallBack && typeof errorCallBack == 'function'){
                    errorCallBack(error);
                }else{
                    throw CONSTANT.ERROR.LOAD_DATA.LOAD_IMAGE;
                }
            }

        }else if (aMethod == 'vertical'){
            var newImage = document.createElement('img');
            newImage.src = aCanvas.toDataURL();
            newImage.onload = function (){
                aContext.drawImage(newImage,0,0);
                aContext.translate(0,newImage.height);
                aContext.scale(1,-1);
                aContext.drawImage(newImage, 0,0, newImage.width, newImage.height);
                if (successCallback && typeof successCallback == 'function'){
                    successCallback(aCanvas,aContext,newImage);
                }
            }

            newImage.onerror = function (error){
                if (errorCallBack && typeof errorCallBack == 'function'){
                    errorCallBack(error);
                }else{
                    throw CONSTANT.ERROR.LOAD_DATA.LOAD_IMAGE;
                }
            }
        }else{
            return;
        }
    }
    /**
     * draw on the Canvas
     * @param options {Object}
     * canvas : the Canvas Element
     * context : the Context of the Canvas
     * colour : the pencil colour
     */
    self.pencil = function (options) {

        var _self = this;

        if (!options.canvas ||
            !options.context){
            return;
        }
        _self.aCanvas = options.canvas;
        _self.aContext = options.context;

        _self.painting = false;
        _self.x = 0;
        _self.y = 0;
        _self.style = options.colour ? options.colour : CONSTANT.CANVAS.DEFAULT_STYLE

        _self.aCanvas.onmousedown = function(e) {
            for (var i  = 0 ; i < _self.aContext.saveCount; i++){
                _self.aContext.restore();
            }
            _self.painting = true;
            _self.aContext.fillStyle = _self.style;
            // offsetParent depends on their parents who have 'position', margin and padding
            // Plus, the body's margin and padding
            _self.x = e.pageX - this.offsetParent.offsetLeft - this.offsetLeft - window.getComputedStyle(this)['padding-left'].replace("px","");
            _self.y = e.pageY - this.offsetParent.offsetTop - this.offsetTop - window.getComputedStyle(this)['padding-top'].replace("px","");
        };

        _self.aCanvas.onmouseup = function(e){
            _self.painting = false;
            if (self.history) {
                self.history.saveHistory(options.canvas);
            }
        }

        _self.aCanvas.onmousemove = function(e) {
            /**
             * ALGORITHM: http://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
             * The Bresenham line algorithm is an algorithm which determines
             * which order to form a close approximation to a straight line
             * between two given points
             */
            if (_self.painting) {
                // NOTE: element.style cannot css files property
                var mouseX = e.pageX - this.offsetParent.offsetLeft - this.offsetLeft - window.getComputedStyle(this)['padding-left'].replace("px","");
                var mouseY = e.pageY - this.offsetParent.offsetTop - this.offsetTop - window.getComputedStyle(this)['padding-top'].replace("px","");

                // find all points between
                var x0 = mouseX;
                var x1 = _self.x;
                var y0 = mouseY;
                var y1 = _self.y;

                var steep = (Math.abs(y1 - y0) > Math.abs(x1 - x0));
                if (steep){
                    // swap x0 and y0
                    var tempX = x0;
                    x0 = y0;
                    y0 = tempX;
                    // swap x1 and y1
                    var tempY = y1;
                    y1 = x1;
                    x1 = tempY;
                }
                if (x0 > x1) {
                    // swap x0 and x1
                    var tempX = x0;
                    x0 = x1;
                    x1 = tempX;
                    // swap y0 and y1
                    var tempY = y0;
                    y0 = y1;
                    y1 = tempY;
                }

                var deltaX = x1 - x0;
                var deltaY = Math.abs(y1 - y0);
                var error = deltaX / 2;
                var yStep;
                var tempY = y0;

                if (y0 < y1) {
                    yStep = 1;
                }else{
                    yStep = -1;
                }

                var thickness = 5 - Math.sqrt((x1 - x0) *(x1-x0) + (y1 - y0) * (y1-y0))/10;

                if(thickness < CONSTANT.CANVAS.DEFAULT_THICKNESS){
                    thickness = CONSTANT.CANVAS.DEFAULT_THICKNESS;
                }

                for (var tempX = x0; tempX < x1; tempX++) {
                    if (steep) {
                        _self.aContext.fillRect(tempY, tempX, thickness , thickness );
                    } else {
                        _self.aContext.fillRect(tempX, tempY, thickness , thickness );
                    }

                    error -= deltaY;
                    if (error < 0) {
                        tempY += yStep;
                        error += deltaX;
                    }
                }

                _self.x = mouseX;
                _self.y = mouseY;

            }
        }
    }

    /**
     * save the image from Canvas
     * @param aCanvas the Canvas
     */
    self.canvasToImage = function (aCanvas) {
        // get base64 encoded image from the Canvas
        var newIMG = aCanvas.toDataURL();
        // change the MIME data
        var downloadURL = newIMG.replace(/^data:image\//gmi, 'data:application/octet-stream');
        // tricks to trigger download
        location.href = downloadURL;
    }
}