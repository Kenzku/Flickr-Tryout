/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 21:50
 */
define(function(){
    return DOM;
});

function DOM () {
    var self = this;

    self.append = function (nodeToAppend, nodes){
        if (nodes instanceof HTMLElement){ // because HTML Element is on nodes' prototype chain
            // on Node
            nodeToAppend.appendChild(nodes);
        }else if (nodes.constructor && nodes.constructor === Array){
            // Array of Nodes, but not yet HTMLCollection
            for (var i = 0; i < nodes.length; i++){
                nodeToAppend.appendChild(nodes[i]);
            }
        }else{
            // DOMException Interface
            throw "Error Code: " + DOMException.NOT_FOUND_ERR;
        }
    }

    self.removeChildren = function (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    self.showLoading = function() {
        var loading = document.getElementById('loading');
        loading.setAttribute('style','display:block;');
    }

    self.hideLoading = function() {
        var loading = document.getElementById('loading');
        loading.setAttribute('style','display:none;');
    }
}