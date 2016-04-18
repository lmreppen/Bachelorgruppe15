function fetchData() {
  var time = getCurrentTime();
  var id = document.getElementById("herErDu").textContent;
  console.log(id);
  $.ajax({
    type: 'POST',
    url: 'test_realtime.php', 
    data: {time:time,holdeplass:holdeplass},
    cache: false,
    success: function(json) {
      console.log(json);
      generateFromTemplate(json);
    }
  });
}

$(document).ready(function() {
  fetchData();
  setInterval(fetchData, 30000);
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


function getCurrentTime(){
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

  today = yyyy+'-'+mm+'-'+dd+'T'+hours+':'+minutes+':'+seconds;
  String(today);
  return today;

}


function writeToDoc(){
  var test = $(".lineRef").html("22");
  console.log(buss1_lineRef.innerHTML);
}


function generateFromTemplate(json){
  //Create an array containing all the bus information formatted correctly
  var busArray = [];

  //Loop over all the busses, retrieve the relevant information and format it.
  for (var i = 0; i < json['StopMonitoringDelivery']['MonitoredStopVisit'].length; i++) {
  
    if (json['StopMonitoringDelivery']['MonitoredStopVisit'][i]['MonitoredVehicleJourney']['Monitored'] == true){
      busArray.push(
      {
        lineRef: json['StopMonitoringDelivery']['MonitoredStopVisit'][i]['MonitoredVehicleJourney']['LineRef'],
        busName: json['StopMonitoringDelivery']['MonitoredStopVisit'][i]['MonitoredVehicleJourney']['DestinationName'],
        timeEst: getArrivalMinutes(json['StopMonitoringDelivery']['MonitoredStopVisit'][i]['MonitoredVehicleJourney']['MonitoredCall'])
      }
        );
    }
  }
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

      
}

//window.onload = fetchData();
//window.onload = writeToDoc();

