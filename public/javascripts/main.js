/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 12:33
 */
require.config({
    paths: {
        'DOM' : '/javascripts/DOM',
        'search' : '/javascripts/search',
        'photos' : '/javascripts/photos'
    }
});
require(['DOM','search','photos'],function(DOM,Search,Photos){
    var aSearch = new Search();
    var options = {
        keywords : 'dog'
    };
    aSearch.searchPhoto(options,successCB,errorCB);

    function successCB(data){
        var aPhotos = new Photos();
        var photoDOMList = aPhotos.listPhotos(data.photos);

        var sidebar = document.getElementById('thumbnail');
        var sidebarList = sidebar.children[0];
        var aDOM = new DOM();

        aDOM.append(sidebarList,photoDOMList);

        for (var i = 0; i < photoDOMList.length; i++){

        }
    }

    function errorCB (err) {
        console.log('it goes to flickr fail - check reason: ' + err.message);
    }
});