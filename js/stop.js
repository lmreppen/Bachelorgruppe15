window.onload = function(){
document.querySelector('#stopButton').addEventListener('click', connect);
          
 }
 
const serviceUUID = '00001523-1212-efde-1523-785feabcd123';

var bleDevice;
var bleServer;

function connect() {
  if (!navigator.bluetooth) {
    
      return;
  }
  navigator.bluetooth.requestDevice({filters: [{services: [serviceUUID]}]})
  .then(device => {
    bleDevice = device;
    return device.connectGATT();
  })
  .then(server => {
    bleServer = server;
    return server.getPrimaryService(serviceUUID);
  })
}
  