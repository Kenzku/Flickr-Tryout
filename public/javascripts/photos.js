/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 14:57
 */
/*global define*/
define(['../javascripts/Constant.js',
        '../javascripts/photo.js',
        '../javascripts/DOM.js',
        '../javascripts/tools.js',
        '../javascripts/loader.js',
        '../javascripts/history.js'],
    function (CONSTANT, Photo, DOM, Tools, Loader, History) {
        "use strict";
        function Photos() {
            var self = this;

            self.listPhotos = function (photos, successCallback, errorCallback) {
                if (!photos) {
                    if (errorCallback && typeof errorCallback === 'function') {
                        errorCallback(CONSTANT.ERROR.PHOTOS.NO_PHOTOS);
                    } else {
                        throw CONSTANT.ERROR.PHOTOS.NO_PHOTOS;
                    }
                }

                var i,
                    img,
                    photoDOMList = [],
                    photoURLs;

                photoURLs = self.getPhotoURLsBase(photos);

                for (i = 0; i < photoURLs.length; i += 1) {
                    img = document.createElement('img');
                    img.setAttribute('src', photoURLs[i] + CONSTANT.FLICKR.MEDIUM_SIZE);
                    img.setAttribute('data-large', photoURLs[i] + CONSTANT.FLICKR.LARGE_SIZE);
                    img.setAttribute('class', 'imagePreview');
                    img.addEventListener('click', self.onSelectPhoto);
                    photoDOMList.push(img);
                }
                return photoDOMList;
            };

            self.getPhotoURLs = function (photos) {
                var i,
                    imageUrl,
                    photoURLs = [];
                for (i = 0; i < photos.photo.length; i += 1) {
                    imageUrl = 'http://farm' + photos.photo[i].farm
                        + '.staticflickr.com/' + photos.photo[i].server
                        + '/' + photos.photo[i].id
                        + '_' + photos.photo[i].secret
                        + '_m.jpg';
                    photoURLs.push(imageUrl);
                }
                return photoURLs;
            };

            self.getPhotoURLsBase = function (photos) {
                var i,
                    imageUrlBase,
                    photoURLs = [];
                for (i = 0; i < photos.photo.length; i += 1) {
                    imageUrlBase = 'http://farm' + photos.photo[i].farm
                        + '.staticflickr.com/' + photos.photo[i].server
                        + '/' + photos.photo[i].id
                        + '_' + photos.photo[i].secret;
                    photoURLs.push(imageUrlBase);
                }
                return photoURLs;
            };

            self.onSelectPhoto = function (event) {
                // set loading
                var aDOM = new DOM(),
                    imageElement,
                    photoURL,
                    aLoader,
                    encodedURL;
                function errorCB(error) {
                    console.log(error);
                }

                function successCB_2(aCanvas, aContext, anImage) {
                    // tools listener
                    var aDOM = new DOM(),
                        theHistory,
                        aTool,
                        aPencil,
                        options;
                    theHistory = new History();
                    theHistory.saveHistory(aCanvas);
                    aTool = new Tools(theHistory);
                    aPencil = null;

                    options = {
                        canvas : aCanvas,
                        context : aContext,
                        image : anImage
                    };
                    aContext.saveCount = 0;
                    aDOM.flipHorizontal().addEventListener('click', function () {
                        options.method = 'horizontal';
                        aContext.save();
                        aContext.saveCount += 1;
                        aTool.flip(options);
                    });

                    aDOM.flipVertical().addEventListener('click', function () {
                        options.method = 'vertical';
                        aContext.save();
                        aContext.saveCount += 1;
                        aTool.flip(options);
                    });

                    aDOM.pencil().addEventListener('click', function () {

                        aDOM.showElementById('colour');

                        aPencil = new aTool.pencil(options);

                        setTimeout(function () {
                            aDOM.hideElementById('colour');
                        }, CONSTANT.CANVAS.TOOL_DISAPPEAR_TIME);
                    });

                    aDOM.colour().addEventListener('click', function (e) {
                        if (e.toElement) {
                            // chrome
                            options.colour = e.toElement.getAttribute('data-colour');
                        } else {
                            // firefox
                            options.colour = this.getAttribute('data-colour');
                        }

                        if (aPencil) {
                            if (e.toElement) {
                                // chrome
                                aPencil.style = e.toElement.getAttribute('data-colour');
                            } else {
                                // firefox
                                aPencil.style = e.target.getAttribute('data-colour');
                            }

                        }
                    });

                    aDOM.download().addEventListener('click', function () {
                        aTool.canvasToImage(aCanvas);
                    });

                    aDOM.redo().addEventListener('click', function () {
                        theHistory.redo(aContext);
                    });

                    aDOM.undo().addEventListener('click', function () {
                        theHistory.undo(aContext);
                    });
                }

                function successCB_1(data) {
                    var newData = JSON.parse(data),
                        aPhoto;
                    if (newData.url) {
                        aPhoto = new Photo();
                        // add the image to canvas
                        aPhoto.addToCanvas(newData.url, successCB_2, errorCB);
                    } else if (newData.error) {
                        throw newData.error;
                    } else {
                        throw CONSTANT.ERROR.SERVER.IMAGE;
                    }
                }

                aDOM.showElementById('loading');

                // find image
                if (event.srcElement) {
                    //chrome
                    imageElement = event.srcElement;
                } else {
                    //fire fox
                    imageElement = this;
                }
                photoURL = imageElement.getAttribute('data-large');

                // send the large image to server
                aLoader = new Loader();
                encodedURL = encodeURIComponent(photoURL);
                aLoader.requestURL(encodedURL, successCB_1);
            };
        }
        return Photos;
    });