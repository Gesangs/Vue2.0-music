;(function(window, undefined){

  "use strict";

  // Helper functions.
  const getContext = function(){
    return document.createElement("canvas").getContext('2d');
  };

  const getImageData = function(img, loaded){

    const imgObj = new Image();
    const imgSrc = img.src || img;

    // Can't set cross origin to be anonymous for data url's
    // https://github.com/mrdoob/three.js/issues/1305
    if ( imgSrc.substring(0,5) !== 'data:' )
      imgObj.crossOrigin = "Anonymous";

    imgObj.onload = function(){
      const context = getContext('2d');
      context.drawImage(imgObj, 0, 0);

      const imageData = context.getImageData(0, 0, imgObj.width, imgObj.height);
      loaded && loaded(imageData.data);
    };

    imgObj.src = imgSrc;

  };

  const makeRGB = function(name){
    return ['rgb(', name, ')'].join('');
  };

  const PALETTESIZE = 10;

  const RGBaster = {};

  RGBaster.colors = function(img, opts){

    opts = opts || {};
    const exclude = opts.exclude || [ ], 
        paletteSize = opts.paletteSize || PALETTESIZE;

    getImageData(img, function(imgdata){
      const data = {
        imgdata,
        exclude,
        paletteSize
      }
      const worker = new Worker('../../static/imgData.js');
      worker.postMessage(data);

      worker.onmessage = function(event){
        const colors = event.data;
        if ( opts.success ) {
          opts.success({
            dominant: makeRGB(colors.dominant.name)
          });
        }
    }
    });
  };

  window.RGBaster = window.RGBaster || RGBaster;

})(window);