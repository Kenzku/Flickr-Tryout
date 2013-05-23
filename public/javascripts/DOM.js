/**
 * Author: Ken
 * Date: 22/04/2013
 * Time: 21:50
 */
/*global define, HTMLElement, DOMException*/
define(function () {
    "use strict";
    /**
     * helper DOM
     * @constructor
     */
    function DOM() {
        var self = this;
        /**
         * append `nodes` to `nodeToAppend`
         * @param nodeToAppend {HTMLElement}
         * @param nodes {HTMLElement|HTMLCollection}
         */
        self.append = function (nodeToAppend, nodes) {
            var i;
            if (nodes instanceof HTMLElement) { // because HTML Element is on nodes' prototype chain
                // on Node
                nodeToAppend.appendChild(nodes);
            } else if (nodes.constructor && nodes.constructor === Array){
                // Array of Nodes, but not yet HTMLCollection
                for (i = 0; i < nodes.length; i += 1) {
                    nodeToAppend.appendChild(nodes[i]);
                }
            } else {
                // DOMException Interface
                throw "Error Code: " + DOMException.NOT_FOUND_ERR;
            }
        };

        self.removeChildren = function (element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        };

        self.showElementById = function (id) {
            var loading = document.getElementById(id);
            loading.setAttribute('style', 'display:block;');
        };

        self.hideElementById = function (id) {
            var loading = document.getElementById(id);
            loading.setAttribute('style', 'display:none;');
        };

        self.flipHorizontal = function () {
            return document.getElementById('flipHorizontal');
        };

        self.flipVertical = function () {
            return document.getElementById('flipVertical');
        };

        self.pencil = function () {
            return document.getElementById('pencil');
        };

        self.download = function () {
            return document.getElementById('download');
        };

        self.undo = function () {
            return document.getElementById('undo');
        };

        self.redo = function () {
            return document.getElementById('redo');
        };

        self.colour = function () {
            return document.getElementById('colour');
        };

        self.search = function () {
            return document.getElementById('search').firstElementChild;
        };
    }
    return DOM;
});