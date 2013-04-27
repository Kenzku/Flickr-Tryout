/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 12:35
 */

define(['../javascripts/loader.js',
    '../javascripts/Constant.js'],function(Loader,CONSTANT){
    return Search;
});

function Search(){

    var self = this;
    /**
     * search image from Flickr API
     * @param options {keywords:String,page:Number} tell Flickr how to load data
     * @param successCallback (data) data : {photos: Object, stat: "ok"}
     * @param errorCallback {err} {stat: "fail",message:String}
     */
    self.searchPhoto = function (options, successCallback, errorCallback){
        var aLoader = new Loader();
        aLoader.loadData(options, successCallback, errorCallback);
    }
}