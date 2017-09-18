// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialport = require('serialport')
const createTable = require('data-table')


//Constats
const OnlyRFPort = true;
const BluetoothName = "/dev/rfcomm0";



var port = new serialport(BluetoothName,{
  baudRate: 9600
}, false);
var SerialData = '';

function ParseSingle(element){
  var unit = element.dataset.parsechar;
  SerialData = SerialData.concat(unit);
  if(unit != 'l' && unit != 'd'){
    var inputField = element.querySelector('input');
    var inputValue = inputField ? Number(inputField.value) : 0;
    SerialData = SerialData.concat(inputValue);
  }
}


function RecursiveParse(element){
  ParseSingle(element)
  var container = element.getElementsByClassName('container');
  if(container.length == 1 && container[0].childNodes.length > 0){
    console.log(container);
    container[0].childNodes.forEach(RecursiveParse);
    SerialData = SerialData.concat('e');
  }

}
function ParseSerialData(){
  SerialData = "";
  var scriptElement = document.getElementById('scriptid');
      scriptElement.childNodes.forEach(RecursiveParse);
  console.log(SerialData);
  port.write(SerialData,function(err){
        if(err){
          console.log(err);
        }
      });

}

document.querySelector('.load-action').addEventListener('click', ParseSerialData, false);



serialport.list((err, ports) => {
  console.log('ports', ports);
  if (err) {
    document.getElementById('error').textContent = err.message
    return err
  } else {
    document.getElementById('error').textContent = ''
  }

  if (ports.length === 0) {
    document.getElementById('error').textContent = 'No ports discovered'
  }

  const headers = Object.keys(ports[0])
  const table = createTable(headers)
  tableHTML = ''
  table.on('data', data => tableHTML += data)
  table.on('end', () => document.getElementById('ports').innerHTML = tableHTML)
  ports.forEach(port => { if(OnlyRFPort == true && port.comName == BluetoothName) table.write(port)})
  table.end();
})
