/**
 * Author: Ken
 * Date: 23/04/2013
 * Time: 22:28
 */
/*global define, test, equal, deepEqual*/
define(['../../javascripts/sidebar.js'],
    function (SideBar) {
        "use strict";
        return {
            RunTests : function () {
                module('Sidebar');

                test('clean all children elements', function () {
                    var i,
                        newDiv,
                        newContent,
                        aSidebar,
                        nodes = [],
                        testLength = 5,
                        sidebar = document.getElementById('thumbnail'),
                        sidebarList = sidebar.children[0];


                    // add elements
                    for (i = 0; i < testLength; i += 1) {
                        newDiv = document.createElement('div');
                        newDiv.setAttribute('id', 'newDiv' + i);
                        newContent = document.createTextNode('I have Javascript');
                        newDiv.appendChild(newContent);

                        nodes.push(newDiv);
                        sidebarList.appendChild(newDiv);
                    }
                    // test adding successfully
                    equal(sidebarList.childElementCount, testLength);

                    // clean elements
                    aSidebar = new SideBar();
                    aSidebar.cleanSideBar();

                    // testing cleaning successfully
                    equal(sidebarList.childElementCount, 0);
                });

                test('reset side bar', function () {
                    var i,
                        newDiv,
                        newContent,
                        aSidebar,
                        nodes = [],
                        testLength = 5,
                        sidebar = document.getElementById('thumbnail'),
                        sidebarList = sidebar.children[0];


                    // add elements
                    for (i = 0; i < testLength; i += 1) {
                        newDiv = document.createElement('div');
                        newDiv.setAttribute('id', 'newDiv' + i);
                        newContent = document.createTextNode('I have Javascript');
                        newDiv.appendChild(newContent);
                        nodes.push(newDiv);
                        sidebarList.appendChild(newDiv);
                    }
                    // test adding successfully
                    equal(sidebarList.childElementCount, testLength);

                    // create an instance
                    aSidebar = new SideBar();

                    // config properties
                    aSidebar.nextPage = 10;
                    aSidebar.previousPage = 8;

                    equal(aSidebar.nextPage, 10);
                    equal(aSidebar.previousPage, 8);

                    aSidebar.resetSideBar();
                    deepEqual(aSidebar.nextPage, null); // in case of 'undefined'
                    deepEqual(aSidebar.previousPage, null);
                    equal(sidebarList.childElementCount, 0);
                });
            }
        };
});