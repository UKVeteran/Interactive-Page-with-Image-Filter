var image = null;
var output =null;
function loadImage(){
  var img = document.getElementById("img");
  var can = document.getElementById("can");

  image = new SimpleImage(img);
  output = new SimpleImage(img);
  image.drawTo(can);
}
//RedFilter-------------------------------------
function redFilter(){
  var can = document.getElementById("can");

  if (image == null || !image.complete()) {
    alert("no input image");  return;
  }
  for (var pixel of image.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    var r = pixel.getRed();
    var g = pixel.getGreen();
    var b = pixel.getBlue();
    var avg = (r+g+b)/3;
    
    if (avg < 128) {
      pixel.setRed(2*avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(2*avg-255);
    }
    
  }
  image.drawTo(can);
}
//Green Filter-----------------------------------
function greenFilter(){
  var can = document.getElementById("can");
  
  if (image == null || !image.complete()) {
    alert("no input image");  return;
  }
  for (var pixel of image.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    image.setPixel(x, y, image.getPixel(x, y));
    pixel.setGreen(255);
  }
  image.drawTo(can);
}
//Grayscale Filter---------------------------
function grayscaleFilter(){
  var can = document.getElementById("can");
  
  if (image == null || !image.complete()){
    alert("no input image");  return;
  }
  
  for(var pixel of image.values()){
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  
  image.drawTo(can);
}
//Rainbow Filter---------
function rainbowFilter(){
  var can = document.getElementById("can");
  
  if (image == null || !image.complete()){
    alert("no input image");
    return;
  }
  var h = image.getHeight();
  
  for (var pixel of image.values()){
    var y = pixel.getY();
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (y < h/7){
    if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(2*avg-255);
      }
    }else if (y < 2*h/7){
      if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2*avg-255);
      }
    }else if (y < 3*h/7){
      if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
      }
    }else if (y < 4*h/7){
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
      }
    }else if (y < 5*h/7){
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
      }
    }else if (y < 6*h/7){
      if (avg < 128) {
        pixel.setRed(0.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
      }
    } else {
      if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      } else {
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(0.4*avg+153);
      }
    } 
}
image.drawTo(can);
} 


//Blur filter------------------------------------
function blurFilter(){
  var can = document.getElementById("can");

  if (image == null || !image.complete()) {
    alert("no input image");
    return;
  }
  
    
  var w = image.getWidth();
  var h = image.getHeight();
  
  for (var pixel of image.values()) {
    var select = Math.random();
    if (select > 0.5 ) {
      var x = pixel.getX();
      var y = pixel.getY();
      var rx = Math.floor((Math.random() * 10) + 1);
      var ry = Math.floor((Math.random() * 10) + 1);
      var xnew;
      var ynew;
      
      if (x+rx < w/5)
      {xnew = x+rx;}
      else
      {xnew = x-rx;}
      if(y+ry < h/5)
      {ynew = y+ry;}
      else
      {ynew = y-ry;}
      
      image.setPixel(x, y, image.getPixel(xnew, ynew));
    }
  }
  image.drawTo(can);
}
//Reset Filter----------------------
function resetFilter(){
  var can = document.getElementById("can");

  if (image == null || !image.complete()) {
    alert("no input image");  return;
  }
  
  for (var pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    image.setPixel(x, y, output.getPixel(x, y));
  }
  image.drawTo(can);
}
//Not Yet--------------------------------
var can = document.getElementById("can");
var ctx = can.getContext("2d");
var img = new Image();
function Interesting() {
  //img, 4 sides of 1st rectangle  
  //2nd 4, destination size what source rectangle will be scaled to
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, can.width, can.height);
};
img.src = 'data:image/jpeg;base64,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';

  