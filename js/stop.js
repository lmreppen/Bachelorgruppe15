const serviceUUID = '00001523-1212-efde-1523-785feabcd123';


var bleDevice;
var bleServer;
var bleService;



window.onload = function() {
    document.querySelector('#stoppKnapp1').addEventListener('click', connect);
    document.querySelector('#stoppKnapp').addEventListener('click', connect);
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
    return server.getPrimaryService(serviceUUID);
  })
  .then(service => {


    bleService = service;
  }).catch(error => {


    
    bleService = service;
  }).catch(error => {
   

  });
}