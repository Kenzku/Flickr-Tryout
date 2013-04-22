/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 14:57
 */
define(['../javascripts/Constant.js'],function(Loader,CONSTANT){
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

        var photoURLs = self.getPhotoURLs(photos);

        for (var i = 0; i < photoURLs.length; i ++){
            var img = document.createElement('img');
            img.setAttribute('src',photoURLs[i]);
            img.setAttribute('class','imagePreview');
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

}