/**
 * Author: Ken
 * Date: 23/04/2013
 * Time: 00:50
 */
/*global define*/
define(['../javascripts/DOM.js',
        '../javascripts/Constant.js',
        '../javascripts/search.js',
        '../javascripts/photos.js'],
    function (DOM) {
        "use strict";
        function SideBar() {
            var self = this;

            self.nextPage = null;
            self.previousPage = null;

            /**
             * clear all children elements
             * under side bar
             */
            self.cleanSideBar = function () {
                // Get the side bar
                var sidebar = document.getElementById('thumbnail'),
                    sidebarList = sidebar.children[0],
                    aDOM = new DOM();
                aDOM.removeChildren(sidebarList);
            };

            /**
             * reset side bar and clear its properties
             */
            self.resetSideBar = function () {
                self.nextPage = null;
                self.previousPage = null;
                self.cleanSideBar();
            };
        }
        return SideBar;
    });