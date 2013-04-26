/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 14:57
 */
define(['../javascripts/Constant.js',
        '../javascripts/photo.js',
        '../javascripts/DOM.js',
        '../javascripts/tools.js',
        '../javascripts/loader.js'],function(CONSTANT,Photo,DOM,Tools,Loader){
    return Photos;
});

function Photos(){

    var self = this;

    self.listPhotos = function (photos, successCallback, errorCallback){
        if (!photos) {
            if (errorCallback && typeof errorCallback === 'function') {
                errorCallback(CONSTANT.ERROR.PHOTOS.NO_PHOTOS);
            }else{
                throw CONSTANT.ERROR.PHOTOS.NO_PHOTOS;
            }
        }

        var photoDOMList = [];

        var photoURLs = self.getPhotoURLsBase(photos);

        for (var i = 0; i < photoURLs.length; i ++){
            var img = document.createElement('img');
            img.setAttribute('src',photoURLs[i] + CONSTANT.FLICKR.MEDIUM_SIZE);
            img.setAttribute('data-large',photoURLs[i] + CONSTANT.FLICKR.LARGE_SIZE);
            img.setAttribute('class','imagePreview');
            img.addEventListener('click',self.onSelectPhoto);
            photoDOMList.push(img);
        }
        return photoDOMList;
    }

    self.getPhotoURLs = function (photos) {
        var photoURLs = [];
        for (var i = 0; i < photos.photo.length; i ++) {
            var imageUrl = 'http://farm' + photos.photo[i].farm
                + '.staticflickr.com/' + photos.photo[i].server
                + '/' + photos.photo[i].id
                + '_' + photos.photo[i].secret
                + '_m.jpg';
            photoURLs.push(imageUrl);
        }
        return photoURLs;
    }

    self.getPhotoURLsBase = function (photos) {
        var photoURLs = [];
        for (var i = 0; i < photos.photo.length; i ++) {
            var imageUrlBase = 'http://farm' + photos.photo[i].farm
                + '.staticflickr.com/' + photos.photo[i].server
                + '/' + photos.photo[i].id
                + '_' + photos.photo[i].secret;
            photoURLs.push(imageUrlBase);
        }
        return photoURLs;
    }

    self.onSelectPhoto = function (event) {
        // set loading
        var aDOM = new DOM();
        aDOM.showElementById('loading');

        // find image
        var imageElement = event.srcElement;
        var photoURL = imageElement.getAttribute('data-large');

        // send the large image to server
        var aLoader = new Loader();
        var encodedURL = encodeURIComponent(photoURL);
        aLoader.requestURL(encodedURL,successCB_1)

        function successCB_1 (data) {
            var data = JSON.parse(data);
            if (data.url){
                var aPhoto = new Photo();
                // add the image to canvas
                aPhoto.addToCanvas(data.url,successCB_2,errorCB);
            }else if (data.error){
                throw data.error;
            }else{
                throw CONSTANT.ERROR.SERVER.IMAGE;
            }
        }

        function successCB_2(aCanvas,aContext,anImage){
            // tools listener
            var aDOM = new DOM();
            var aTool = new Tools();
            var aPencil = null;

            var options = {
                canvas : aCanvas,
                context : aContext,
                image : anImage
            }
            aContext.saveCount = 0;
            aDOM.flipHorizontal().addEventListener('click',function(){
                options.method = 'horizontal';
                aContext.save();
                aContext.saveCount++;
                aTool.flip(options);
            });

            aDOM.flipVertical().addEventListener('click',function(){
                options.method = 'vertical';
                aContext.save();
                aContext.saveCount++;
                aTool.flip(options);
            });

            aDOM.pencil().addEventListener('click',function(){


                aDOM.showElementById('colour');

                aPencil = new aTool.pencil(options);

                setTimeout(function(){
                    aDOM.hideElementById('colour');
                },CONSTANT.CANVAS.TOOL_DISAPPEAR_TIME);
            });

            aDOM.colour().addEventListener('click',function(e){
                options.colour = e.toElement.getAttribute('data-colour');
                if(aPencil){
                    aPencil.style = e.toElement.getAttribute('data-colour');
                }
            });

            aDOM.saturation().addEventListener('click',function(){
                aDOM.showElementById('dimmer');

                setTimeout(function(){
                    aDOM.hideElementById('dimmer');
                },CONSTANT.CANVAS.TOOL_DISAPPEAR_TIME);
            });

            aDOM.download().addEventListener('click',function(){
                aTool.canvasToImage(aCanvas);
            });

        }

        function errorCB(error){
            console.log(error);
        }
    }

}