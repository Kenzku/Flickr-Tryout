/**
 * Author: Ken
 * Date: 15/04/2013
 * Time: 23:10
 */
require.config({
    paths: {
        'loaderTest' : '/test/javascripts/loadertest',
        'searchTest' : '/test/javascripts/searchTest',
        'photosTest' : '/test/javascripts/photosTest',
        'sidebarTest': '/test/javascripts/sidebarTest',
        'domTest' : '/test/javascripts/domTest'
    }
});
QUnit.config.autostart = false;
require(['loaderTest',
        'searchTest',
        'photosTest',
        'sidebarTest',
        'domTest'],
    function (loaderTest,searchTest,photosTest,sidebarTest,domTest) {
        QUnit.start();
        loaderTest.RunTests();
        searchTest.RunTests();
        photosTest.RunTests();
        sidebarTest.RunTests();
        domTest.RunTests();
    }
);
