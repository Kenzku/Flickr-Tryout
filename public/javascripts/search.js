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

    self.searchPhoto = function (options, successCallback, errorCallback){
        var aLoader = new Loader();
        aLoader.loadData(options, successCallback, errorCallback);
    }
}