/**
 * Author: Ken
 * Date: 23/04/2013
 * Time: 00:50
 */
define(['../javascripts/DOM.js',
        '../javascripts/Constant.js',
        '../javascripts/search.js',
        '../javascripts/photos.js'],function(DOM, CONSTANT, Search, Photos){
    return SideBar;
});

function SideBar () {
    var self = this;

    self.nextPage = null;
    self.previousPage = null;

    /**
     * clear all children elements
     * under side bar
     */
    self.cleanSideBar = function () {
        // Get the side bar
        var sidebar = document.getElementById('thumbnail');
        var sidebarList = sidebar.children[0];

        var aDOM = new DOM();
        aDOM.removeChildren(sidebarList);
    }

    /**
     * reset side bar and clear its properties
     */
    self.resetSideBar = function (){
        self.nextPage = null;
        self.previousPage = null;
        self.cleanSideBar();
    }
}