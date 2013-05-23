/**
 * Author: Ken
 * Date: 23/04/2013
 * Time: 23:10
 */
/*global define, test, equal*/
define(['../../javascripts/DOM'], function (DOM) {
    "use strict";
    return {
        RunTests : function () {
            module('DOM helper function');
            test('append - one element - then remove the child', function () {
                var aCanvas = document.createElement('canvas'),
                    sidebar,
                    sidebarList,
                    aDOM;
                aCanvas.width = 100;
                aCanvas.height = 100;

                sidebar = document.getElementById('thumbnail');
                sidebarList = sidebar.children[0];

                aDOM = new DOM();
                aDOM.append(sidebarList, aCanvas);

                equal(sidebarList.childElementCount, 1);

                aDOM.removeChildren(sidebarList);
                equal(sidebarList.childElementCount, 0);
            });

            test('append - some elements - then remove the children', function () {
                var i,
                    nodes = [],
                    testLength,
                    sidebar,
                    sidebarList,
                    aCanvas,
                    aDOM;
                testLength = 10;
                sidebar = document.getElementById('thumbnail');
                sidebarList = sidebar.children[0];

                // add elements
                for (i = 0; i < testLength; i += 1) {
                    aCanvas = document.createElement('canvas');
                    aCanvas.setAttribute('id', 'aCanvas' + i);

                    nodes.push(aCanvas);
                }

                aDOM = new DOM();
                aDOM.append(sidebarList, nodes);

                equal(sidebarList.childElementCount, testLength);
                aDOM.removeChildren(sidebarList);
                equal(sidebarList.childElementCount, 0);
            });
        }
    };
});