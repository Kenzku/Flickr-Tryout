/**
 * Author: Ken
 * Date: 25/04/2013
 * Time: 16:34
 */
define(['../javascripts/Constant.js'],function(CONSTANT) {
    return Tools;
});
function Tools () {
    var self = this;

    self.flip = function (options) {
        if (!options.method ||
            !options.canvas ||
            !options.context||
            !options.image){
            return;
        }
        if (options.method == 'horizontal'){
            options.context.translate(options.image.width,0);
            options.context.scale(-1,1);
            options.context.drawImage(options.image, 0,0, options.image.width, options.image.height);
        }else if (options.method == 'vertical'){
            options.context.translate(0,options.image.height);
            options.context.scale(1,-1);
            options.context.drawImage(options.image, 0,0, options.image.width, options.image.height);
        }else{
            return;
        }
    }


}