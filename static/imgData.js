const makeRGB = function(name){
    return ['rgb(', name, ')'].join('');
  };

  // RGBaster Object
  // ---------------
  //
  const BLOCKSIZE = 5;

onmessage = function(event){
    const data = event.data;
    const img = data.imgdata,
          exclude = data.exclude,
          paletteSize = data.paletteSize;

    let length        = ( img.width * img.height ) || img.length,
    colorCounts   = {},
    rgbString     = '',
    rgb           = [],
    colors        = {
      dominant: { name: '', count: 0 },
      palette:  Array.apply(null, new Array(paletteSize)).map(Boolean).map(function(a){ return { name: '0,0,0', count: 0 }; })
    };

// Loop over all pixels, in BLOCKSIZE iterations.
let i = 0;
while ( i < length ) {
  rgb[0] = img[i];
  rgb[1] = img[i+1];
  rgb[2] = img[i+2];
  rgbString = rgb.join(",");

  // Keep track of counts.
  if ( rgbString in colorCounts ) {
    colorCounts[rgbString] = colorCounts[rgbString] + 1;
  }
  else{
    colorCounts[rgbString] = 1;
  }

  // Find dominant and palette, ignoring those colors in the exclude list.
  if ( exclude.indexOf( makeRGB(rgbString) ) === -1 ) {
    const colorCount = colorCounts[rgbString];
    if ( colorCount > colors.dominant.count ){
      colors.dominant.name = rgbString;
      colors.dominant.count = colorCount;
    } else {
      colors.palette.some(function(c){
        if ( colorCount > c.count ) {
          c.name = rgbString;
          c.count = colorCount;
          return true;
        }
      });
    }
  }
  i += BLOCKSIZE * 4;
}

    //向主线程返回消息
    postMessage(colors);
}