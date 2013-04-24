/**
 * Author: Ken
 * Date: 24/04/2013
 * Time: 21:29
 */
define(['../../javascripts/index',
        '../../javascripts/Constant'],function(Index,CONSTANT){
    return {
        RunTests : function () {
            module('Index Page');

            asyncTest('show photo on side bar',function(){
                var aIndexPage = new IndexPage();
                aIndexPage.showPhotoOnSideBar(null,successCB, errorCB);

                function successCB (sidebarList){
                    equal(sidebarList.length,parseInt(CONSTANT.FLICKR.PER_PAGE));
                    for (var i = 0; i < sidebarList.length ; i ++){
                        // test img elements
                        equal(sidebarList[i] instanceof HTMLImageElement, true);
                        var matchedImgURL = sidebarList[i]
                            .getAttribute('src')
                            .match(CONSTANT.OTHER.URL);
                        // test URL valid
                        equal(sidebarList[i].getAttribute('src'),matchedImgURL);
                    }
                    start();
                }

                function errorCB (error) {
                    ok(false,error);
                    start();
                }
            });
        }
    }
});
