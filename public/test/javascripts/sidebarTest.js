/**
 * Author: Ken
 * Date: 23/04/2013
 * Time: 22:28
 */
define(['../../javascripts/sidebar.js'],function(Sidebar){
    return {
        RunTests : function () {
            module ('Sidebar');

            test('clean all children elements',function(){
                var nodes = [];
                var testLength = 5;

                var sidebar = document.getElementById('thumbnail');
                var sidebarList = sidebar.children[0];


                // add elements
                for (var i = 0 ; i < testLength ; i ++){
                    var newDiv = document.createElement('div');
                    newDiv.setAttribute('id', 'newDiv' + i );
                    var newContent = document.createTextNode('I have Javascript');
                    newDiv.appendChild(newContent);

                    nodes.push(newDiv);
                    sidebarList.appendChild(newDiv);
                }
                // test adding successfully
                equal(sidebarList.childElementCount,testLength);

                // clean elements
                var aSidebar = new SideBar();
                aSidebar.cleanSideBar();

                // testing cleaning successfully
                equal(sidebarList.childElementCount,0);
            });

            test('reset side bar',function(){
                var nodes = [];
                var testLength = 5;

                var sidebar = document.getElementById('thumbnail');
                var sidebarList = sidebar.children[0];


                // add elements
                for (var i = 0 ; i < testLength ; i ++){
                    var newDiv = document.createElement('div');
                    newDiv.setAttribute('id', 'newDiv' + i );
                    var newContent = document.createTextNode('I have Javascript');
                    newDiv.appendChild(newContent);

                    nodes.push(newDiv);
                    sidebarList.appendChild(newDiv);
                }
                // test adding successfully
                equal(sidebarList.childElementCount,testLength);

                // create an instance
                var aSidebar = new SideBar();

                // config properties
                aSidebar.nextPage = 10;
                aSidebar.previousPage = 8;

                equal(aSidebar.nextPage,10);
                equal(aSidebar.previousPage,8);

                aSidebar.resetSideBar();
                deepEqual(aSidebar.nextPage,null); // in case of 'undefined'
                deepEqual(aSidebar.previousPage,null);
                equal(sidebarList.childElementCount,0);
            });
        }
    }
});