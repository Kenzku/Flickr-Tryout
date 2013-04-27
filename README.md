Flickr-Tryout
=============

## What is it?
I made this Flickr tryout and recorded it as a video. It is a web application and you can use it to search photos from 
Flickr. You can also do some simple modification such as drawing and flipping or undo/redo. 
Finland, you can download the edited photo. 

Please check it on the video: ```http://www.youtube.com/watch?v=1qQscuM4oJw```

## Build the app

To sreve the application you need a server running Node.js with NPM installed. Step to get the web server running:

    cd Flickr-Tryout
    npm install
    node app.js

the node server uses port 3000 by default, so you can go to ```http://localhost:3000/```

if you haven't install node, please visit: ```http://nodejs.org```

## Testing
The test is done by Qunit: ```http://qunitjs.com``` on client side, and 

Mocha: ```http://visionmedia.github.io/mocha/``` on server.

To run the test on Client side, please firstly build the app, and run the server: ```node app.js```
then go to ```http://localhost:3000/test```

To run the test on Server side, please go to `cd Flickr-Tryout` then use ```mocha ./test/ -R spec -u qunit -t 10000```

## More detail?
It has a search interface where you can enter a keyword. 
The side bar is where photo’s that match the keyword appears. 
Then Click the photo showing its larger size (if it has) in the content portion.

You can edit the photo, e.g. Paint on the image, Flip the image, undo/redo if doing it wrong. 
It also present a user with a way to download the edited photo. 

PLEASE NOTE: that Flip, undo/redo might have ___deley___, it might depend on the server's reaction or your browser's performance.

The implementation is done in client side HTML/CSS/JS, except for the downloading part. 
This is because of the Cross-Domain policy (check out __why server?__ section). It only runs (tested) on the latest Chrome, currently. 

I did not use full blown library like jQuery, Backbone or Angular, but I used a small library to e.g. handle JSONP.


## Why Server?
Because The ```toDataURL()``` method requires that any images drawn onto the canvas are hosted on a web server with the same domain as the code executing it.  
If this condition is not met, a __SECURITY_ERR__ exception is thrown.

More example, you can no longer use the canvas toBlob() or getImageData() methods; doing so will throw a __security error__.

More see: ```https://developer.mozilla.org/en-US/docs/HTML/CORS_Enabled_Image```

## Others

I `Requirejs` style on the Client side to host my library, as well as I used to use it on `Node`. 
You do not have to download it, it will download automatically from cloud delivery network.
If there is any thing that doesn't look good, please leave me an issue, we can disscuss it!

