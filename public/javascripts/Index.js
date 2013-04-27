/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 23:34
 */
define(['../javascripts/DOM.js',
        '../javascripts/Constant.js',
        '../javascripts/sidebar.js',
        '../javascripts/search.js',
        '../javascripts/photos.js'],function(DOM, CONSTANT, SideBar, Search, Photos){
    return IndexPage;
});

function IndexPage () {
    var self = this;

    self.sideBar = new SideBar();
    self.currentSearch = CONSTANT.SEARCH.DEFAULT_TEXT;

    self.init = function (){
        self.showPhotoOnSideBar();
        self.initNavButton();
        self.initSearch();
    }

    /**
     * initialise side bar: default search for dogs
     * display its median size images on the side bar
     * @param options {Object} the page that shown
     * {String:keywords,Number:page}
     * @param successCallback ({HTMLCollection:sidebarList [img]})
     * @param errorCallback (error)
     */
    self.showPhotoOnSideBar = function (options, successCallback, errorCallback) {
        var aSearch = new Search();
        var options = options ?
        {
            keywords : options.keywords ? options.keywords : self.currentSearch,
            page : options.page ? options.page : CONSTANT.FLICKR.PAGE
        } :
        {
            keywords : self.currentSearch,
            page : CONSTANT.FLICKR.PAGE
        };
        aSearch.searchPhoto(options,successCB,errorCB);

        function successCB(data){
            var currentPage = data.photos && data.photos.page ? data.photos.page : null;
            self.sideBar.nextPage = currentPage + 1;
            self.sideBar.previousPage = (currentPage - 1) == 0 ? currentPage : currentPage - 1;

            // Image DOM
            var aPhotos = new Photos();
            var photoDOMList = aPhotos.listPhotos(data.photos);

            // Get the side bar
            var sidebar = document.getElementById('thumbnail');
            var sidebarList = sidebar.children[0];

            // Attach DOM to the side bar
            var aDOM = new DOM();
            aDOM.append(sidebarList,photoDOMList);

            if (successCallback && typeof successCallback === 'function'){
                successCallback(sidebarList.children);
            }
        }

        function errorCB (err) {
            if (errorCallback && typeof errorCallback === 'function'){
                errorCallback(err);
            }else{
                throw 'it goes to flickr fail - check reason: ' + err.message;
            }
        }
    }
    /**
     * add listener to next button
     */
    self.initNavButton = function (){
        var next = document.getElementById('next');
        next.addEventListener('click', function() {
            self.sideBar.cleanSideBar();
            self.next();
        });

        var previous = document.getElementById('previous');
        previous.addEventListener('click', function() {
            self.sideBar.cleanSideBar();
            self.previous();
        });
    }
    /**
     * go to next page of search
     */
    self.next = function(successCallback, errorCallback){
        if (!self.sideBar.nextPage) {
            throw CONSTANT.ERROR.FLICKR;
        }
        var options = {
            page : self.sideBar.nextPage
        }
        self.showPhotoOnSideBar(options,successCallback, errorCallback);

    }

    /**
     * go to next page of search
     */
    self.previous = function(successCallback, errorCallback){
        if (!self.sideBar.previousPage) {
            throw CONSTANT.ERROR.FLICKR;
        }
        var options = {
            page : self.sideBar.previousPage
        }
        self.showPhotoOnSideBar(options,successCallback, errorCallback);
    }

    /**
     * initialise search bar
     * key 13 is the 'enter' key
     */
    self.initSearch = function(){
        var aDOM = new DOM();
        aDOM.search().addEventListener('keyup',function(e){
            if (e.keyCode == 13){
                self.currentSearch = this.value.length > 0 ?
                    this.value : self.currentSearch;
                self.sideBar.cleanSideBar();
                self.showPhotoOnSideBar();
            }
        });
    }

    self.resetSideBar = function (){
        self.sideBar.cleanSideBar();
        self.sideBar = new SideBar();
    }

}