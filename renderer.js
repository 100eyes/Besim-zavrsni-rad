// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

console.log("included rendered,js");
var serialport = require("serialport");
var bluetooth = new serialport("/dev/rfcomm0");

bluetooth.write('c',function(err){
  if(err){
    return console.log("non-uspjelo, doslo do greske\n Greska je:",err.message);
  }

  console.log("poslano uspjesno");

});


bluetooth.on('error',function(err){
  console.log("Error: ", err.message);
});
