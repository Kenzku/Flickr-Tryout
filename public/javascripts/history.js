/**
 * Author: Ken
 * Date: 27/04/2013
 * Time: 10:48
 */
define(function(){
   return History;
});
/**
 * use the proper of Canvas : when changing,
 * it adds another layer to itself
 * @constructor
 */
function History(){
    var self = this;

    self.step = -1;
    self.history = [];

    /**
     * save the current canvas into history
     * @param aCanvas the Canvas that you draw
     */
    self.saveHistory = function(aCanvas){
        self.step++;
        if (self.step < self.history.length){
            self.history.length = self.step;
        }
        self.history.push(aCanvas.toDataURL());
    }

    self.undo = function (aContext) {
        if (self.step > 0){
            self.step--;
            var anImage = document.createElement('img');
            anImage.src = self.history[self.step];
            anImage.onload = function (){
                aContext.drawImage(anImage,0,0);
            }
            anImage.onerror = function (e){
                console.log(e);
            }
        }
    }

    self.redo = function (aContext) {
        if (self.step < self.history.length - 1){
            self.step++;
            var anImage = document.createElement('img');
            anImage.src = self.history[self.step];
            anImage.onload = function () {
                aContext.drawImage(anImage,0,0);
            }
            anImage.onerror = function (e){
                console.log(e);
            }
        }
    }
}