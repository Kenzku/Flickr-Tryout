/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 12:33
 */
require.config({
    paths: {
        'indexPage' : '../../javascripts/index'
    }
});
require(['indexPage'],function(IndexPage){
    var aIndexPage = new IndexPage();
    aIndexPage.init();
});