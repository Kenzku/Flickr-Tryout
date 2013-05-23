/**
 * Author: Ken
 * Date: 24/04/2013
 * Time: 21:29
 */
/*global define, asyncTest, equal, HTMLImageElement, start, ok*/
define(['../../javascripts/Index',
        '../../javascripts/Constant'],
    function (IndexPage, CONSTANT) {
        "use strict";
        return {
            RunTests : function () {
                module('Index Page');

                asyncTest('show photo on side bar', function () {
                    var i,
                        aIndexPage = new IndexPage();
                    function successCB(sidebarList) {
                        equal(sidebarList.length, parseInt(CONSTANT.FLICKR.PER_PAGE, 10));
                        for (i = 0; i < sidebarList.length; i += 1) {
                            // test img elements
                            equal(sidebarList[i] instanceof HTMLImageElement, true);
                            var matchedImgURL = sidebarList[i]
                                .getAttribute('src')
                                .match(CONSTANT.OTHER.URL);
                            // test URL valid
                            equal(sidebarList[i].getAttribute('src'), matchedImgURL);
                        }
                        start();
                    }

                    function errorCB(error) {
                        ok(false, error);
                        start();
                    }
                    aIndexPage.showPhotoOnSideBar(null, successCB, errorCB);
                });
            }
        };
    });
