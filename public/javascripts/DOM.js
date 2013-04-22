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

    self.append = function (NodeToAppend, Nodes){
        if (Nodes.constructor && Nodes.constructor === HTMLDivElement){
            // on Node
            NodeToAppend.appendChild(Nodes);
        }else if (Nodes.constructor && Nodes.constructor === Array){
            // Array of Nodes, but not yet HTMLCollection
            for (var i = 0; i < Nodes.length; i++){
                NodeToAppend.appendChild(Nodes[i]);
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
}