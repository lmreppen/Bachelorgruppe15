const serviceUUID = '00001523-1212-efde-1523-785feabcd123';
const ledCharacteristicUUID = '00001525-1212-efde-1523-785feabcd123';

var bleDevice;
var bleServer;
var bleService;


window.onload = function() {
    document.querySelector('#stopButton').addEventListener('click', connect);
}
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
    return server.getPrimaryService(options);
  })
  .then(service => {
    
    bleService = service;
  }).catch(error => {
   
  });
}