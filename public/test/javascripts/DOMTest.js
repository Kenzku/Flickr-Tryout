/**
 * Author: Ken
 * Date: 23/04/2013
 * Time: 23:10
 */
define(['../../javascripts/DOM'],function(DOM){
    return {
        RunTests : function () {
            module('DOM helper function');
            test('append - one element - then remove the child',function(){
                var aCanvas = document.createElement('canvas');
                aCanvas.width= 100;
                aCanvas.height = 100;

                var sidebar = document.getElementById('thumbnail');
                var sidebarList = sidebar.children[0];

                var aDOM = new DOM();
                aDOM.append(sidebarList,aCanvas);

                equal(sidebarList.childElementCount,1);

                aDOM.removeChildren(sidebarList);
                equal(sidebarList.childElementCount,0);
            });

            test('append - some elements - then remove the children',function(){
                var nodes = [];
                var testLength = 10;
                var sidebar = document.getElementById('thumbnail');
                var sidebarList = sidebar.children[0];

                // add elements
                for (var i = 0 ; i < testLength ; i ++){
                    var aCanvas = document.createElement('canvas');
                    aCanvas.setAttribute('id', 'aCanvas' + i );

                    nodes.push(aCanvas);
                }

                var aDOM = new DOM();
                aDOM.append(sidebarList,nodes);

                equal(sidebarList.childElementCount,testLength);
                aDOM.removeChildren(sidebarList);
                equal(sidebarList.childElementCount,0);
            });
        }
    }
})