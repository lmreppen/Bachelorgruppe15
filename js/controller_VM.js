//The bus stops the bus is going to stop at is temporarily put in this variable.
//Every time the page reloads with new content (every 30 secs), it checks if the upcoming stop equals this one.
var global_temp_storage;

const serviceUUID = '00001523-1212-efde-1523-785feabcd123';
const ledCharacteristicUUID = '00001525-1212-efde-1523-785feabcd123';
const buttonCharacteristicUUID = '00001524-1212-efde-1523-785feabcd123';

var bleDevice;
var bleServer;
var bleService;
var button1char;
var ledChar;
var button1count = 0;
var toggleFlag = false;

function connect() {
  if (!navigator.bluetooth) {
      log('Web Bluetooth API is not available.\n' +
          'Please make sure the Web Bluetooth flag is enabled.');
      return;
  }
  log('Requesting Bluetooth Device...');
  navigator.bluetooth.requestDevice({filters: [{services: [serviceUUID]}]})
  .then(device => {
    bleDevice = device;
    return device.connectGATT();
  })
  .then(server => {
    bleServer = server;
    log('Got bleServer');
    return server.getPrimaryService(serviceUUID);
  })
  .then(service => {
    log('Got bleService');
    bleService = service;
  })
  .then(() => bleService.getCharacteristic(buttonCharacteristicUUID))
  .then( characteristic => {
    log('Got button1characteristic');
    button1char = characteristic;
    return button1char.startNotifications();
  })
  .then(() => {
    log('Notifications enabled');
    button1char.addEventListener('characteristicvaluechanged',handleNotifyButton1);
  })
  .then(() => {
    return bleService.getCharacteristic(ledCharacteristicUUID);
  })
  .then( characteristic => {
    ledChar = characteristic;
    log('Got ledChar');
  })
  .catch(error => {
    log('> connect ' + error);
  });
}

function toggleLED(){
    console.log("Toggling LED");
    let toggle;
    if(toggleFlag === true){
      toggle = new Uint8Array([0]);
      toggleFlag = false;
    }
    else{
      toggle = new Uint8Array([1]);
      toggleFlag = true;
    }
    return ledChar.writeValue(toggle);
}


function fetchVehicleData() {
  var time = getCurrentTime(1);
  var id = document.getElementById("herErDu").textContent;
  $.ajax({
    type: 'POST',
    url: 'VehicleMonitoring.php', 
    data: {time:time,bussID:busID},
    cache: false,
    success: function(json) {
      console.log(json);
      getVehicleJourney(json);
      }
    });
}

//Returns a JSON object containing all the next stops and its passing time, from its current stop. 
//Takes a json object as an argument (fetchVehicleData returns the json object containing the vehicles upcoming stop and lineRef)
function getVehicleJourney(json){
  var stopRef = json['VehicleMonitoringDelivery']['VehicleActivity']['MonitoredVehicleJourney']['MonitoredCall']['StopPointRef']; //An 8-digit code for the upcoming stop
  var lineRef = json['VehicleMonitoringDelivery']['VehicleActivity']['MonitoredVehicleJourney']['LineRef']; //The number of the bus (E.G 8, 22, 5 etc)
  var DestinationName = json['VehicleMonitoringDelivery']['VehicleActivity']['MonitoredVehicleJourney']['DestinationName'];
  var date = getCurrentTime(2); //Get the current date and timestamp formatted correctly
  var url = 'getJourney.php?date='+date+'&code='+stopRef+'&num='+lineRef;
  var upcomingStop = json['VehicleMonitoringDelivery']['VehicleActivity']['MonitoredVehicleJourney']['MonitoredCall']['StopPointName']
  $.ajax({
    type: 'POST',
    url: url,
    cache: false,
    success: function(json) {
      console.log(json);
      generateFromTemplate(json, upcomingStop, (lineRef + ' - ' + DestinationName));
    }
  });
}

$(document).ready(function() {
    fetchVehicleData();
    setInterval(fetchVehicleData, 30000);
  //writeToDoc();
});


//Returns how many minute untill the bus will arrive
function getArrivalMinutes(time){

  //Some of the data returned will have undefined 'ExpectedDepartureTime'.
  //If it is undefined, use the 'AimedDepartureTime' instead
  try{
   var busTime = String(time['ExpectedDepartureTime']);
   var timeSDay = busTime.split("T");
  }catch(e){
    var busTime = String(time['AimedArrivalTime']);
    var timeSDay = busTime.split("T");
  }
  //getsCurrentTime
  var now = new Date();
  

  //splits the date to get the mintues and hours 
  var timeSTime = timeSDay[1].split(":");


  var busHours= timeSTime[0];
  var busMinutes=timeSTime[1];


  var curHours= now.getHours();
  var curMinutes=now.getMinutes();
  
  //subtracts the bus arrival with the current time to get hours untill departure 
  var hoursTo = parseInt(busHours) - parseInt(curHours);
  //subtracts the bus arrival minutes with the current minutes to get hours untill departure. 
  var minutesTo = parseInt(busMinutes) - parseInt(curMinutes);

  var timeTo = hoursTo*60 + minutesTo;
  if(timeTo <= 0){
    return "Nå";
  }
  else{
  return timeTo + "</br>min";  
  }
}


//Returns the current time in one of two formats:
//1 = YYYY-MM-DD T HH:MM:SS    for use in the soap request
//2 = DD.MM.YYYY&Time=HH%3AMM  for use in the rp.atb.no url
function getCurrentTime(option){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  if(dd<10) {
    dd='0'+dd
  } 

  if(mm<10) {
      mm='0'+mm
  } 

  if(hours<10) {
      hours='0'+hours
  } 

  if(minutes<10) {
      minutes='0'+minutes
  } 

  if(seconds<10) {
      mm='0'+mm
  } 

  if (option == 1){
    today = yyyy+'-'+mm+'-'+dd+'T'+hours+':'+minutes+':'+seconds;
    String(today);
  } else {
    today = dd+'.'+mm+'.'+yyyy+'&Time='+hours+'%3A'+minutes;
    String(today);
  }
  return today;
  
}


//The function registering button clicks, adding the selected stop to the global array.
function stopBus(stopRef){
  stopRef.className = "btn btn-xs btn-default btn-success"
  var stopName = stopRef.id;
  global_temp_storage = stopName;
}

function generateFromTemplate(json, upcomingStop, busName){
  //Create an array containing all the bus information formatted correctly
  var busArray = [];

  if (upcomingStop + ' (Trondheim)' == global_temp_storage){
    toggleLED();
    alert("Bus is now stopping at " + upcomingStop);
  }
  console.log(upcomingStop);

  //Init addStops as false
  var addStops = false;

  //Iterate over the json object
  for (var i = 0; i < json.length; i++){

    //If the current item in the json array is the next stop, set "addStops" to true, thus allowing all the next stops 
    //in the list to be added. This is so we avoid adding stops the bus has already passed.
    if(json[i]['holdeplass'] == upcomingStop || json[i]['holdeplass'] == upcomingStop + ' (Trondheim)' || json[i]['holdeplass'] == upcomingStop + ' (K) (Trondheim)') {
      addStops = true;
    }


    if (addStops == true){    
      busArray.push(
      {
        stopName: json[i]['holdeplass'],
        timeEst: json[i]['tid']
      }
        );
      }
  }

  console.log(busArray);
  //Finally, load the array into the template
  $(".simple-template-container").loadTemplate($("#template"), busArray);

  var c = document.getElementsByClassName("myCanvas");
  var ctx;
  for (var i = 0; i < c.length; i++) {   
    if (i == 0) { //If its the first circle, make it slightly bigger than the rest  
      ctx = c.item(i).getContext("2d");
      ctx.beginPath();
      ctx.arc(42,45,42,0,2*Math.PI);
      ctx.strokeStyle = "#1fb6ff";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = '#1fb6ff';
      ctx.fill();
    } else {
      ctx = c.item(i).getContext("2d");
      ctx.beginPath();
      ctx.arc(40,38,30,0,2*Math.PI);
      ctx.strokeStyle = "#1fb6ff";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = '#1fb6ff';
      ctx.fill();
    }
  }

  //Get all the stop buttons that was generated and put them into an array.
  var stoppknapper = document.getElementsByClassName("btn btn-xs btn-default btn-danger");
  console.log(stoppknapper.length);
  for (var i = 0; i < stoppknapper.length; i++) { 
    stoppknapper[i].id = busArray[i]['stopName'];
    stoppknapper[i].addEventListener("click", function(event){
      var target = event.target || event.srcElement;
       stopBus(target);
    }, false);

  }  

  document.getElementById("herErDu").innerHTML = busName;  
}





