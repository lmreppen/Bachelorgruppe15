function fetchData() {
  var time = getCurrentTime();
  $.ajax({
    type: 'POST',
    url: 'test_realtime.php', 
    data: {time:time,holdeplass:'16010404'},
<<<<<<< HEAD
=======
    //var lineRef = $(".holdeplass")"Solsiden";
>>>>>>> 9573f02f284aa581bbe4cbbd767d9aa6aa021052
    cache: false,
    success: function(json) {
      console.log(json);
      //console.log(json['StopMonitoringDelivery']['MonitoredStopVisit'][0]['MonitoredVehicleJourney']['DestinationName'])

      for (var i = 0; i < json['StopMonitoringDelivery']['MonitoredStopVisit'].length; i++) {
        console.log(json['StopMonitoringDelivery']['MonitoredStopVisit'][i]['MonitoredVehicleJourney']['DestinationName']);
        console.log(json['StopMonitoringDelivery']['MonitoredStopVisit'][i]['MonitoredVehicleJourney']['LineRef']);

        //Inneholder destinasjonsnavnet på bussen.
        var destination = json['StopMonitoringDelivery']['MonitoredStopVisit'][i]['MonitoredVehicleJourney']['DestinationName'];

        //Nummeret på bussen
        var lineNr = json['StopMonitoringDelivery']['MonitoredStopVisit'][i]['MonitoredVehicleJourney']['LineRef'];

        //Forventet avgangstid fra valgt stopp
        var arrivalTime = json['StopMonitoringDelivery']['MonitoredStopVisit'][i]['MonitoredVehicleJourney']['MonitoredCall']['ExpectedDepartureTime'];

        //Statusen til bussen (Delayed / onTime)
        try {
        var status = json['StopMonitoringDelivery']['MonitoredStopVisit'][i]['MonitoredVehicleJourney']['MonitoredCall']['DepartureStatus'];
      } catch(err){
        var status = 'Ingen informasjon tilgjengelig';
      }

<<<<<<< HEAD
        //document.write(destination + ' - Annkomst: '+ arrivalTime +' - Status: ' + status + '<BR/>');
        //document.write(lineNr + '<BR/>' + '<BR/>');
        //var lineRef = $(".lineRef").html(json['StopMonitoringDelivery']['MonitoredStopVisit'][0]['MonitoredVehicleJourney']['LineRef']);
        //var lineRef = $(".busName").html(json['StopMonitoringDelivery']['MonitoredStopVisit'][0]['MonitoredVehicleJourney']['DestinationName']);
        generateFromTemplate(json);
      }
=======

        //document.write(destination + ' - Annkomst: '+ arrivalTime +' - Status: ' + status + '<BR/>');
        //document.write(lineNr + '<BR/>' + '<BR/>');
        var lineRef = $(".lineRef").html(json['StopMonitoringDelivery']['MonitoredStopVisit'][0]['MonitoredVehicleJourney']['LineRef']);
        var lineRef = $(".busName").html(json['StopMonitoringDelivery']['MonitoredStopVisit'][0]['MonitoredVehicleJourney']['DestinationName']);
        
      }

    //goes through all the bus stops and gives the class "xbusName" a value.   
    for (p=0; p<json['StopMonitoringDelivery']['MonitoredStopVisit'].length; p++){
     var lineRef = $("."+p+"busName").html(json['StopMonitoringDelivery']['MonitoredStopVisit'][p]['MonitoredVehicleJourney']['DestinationName']);

     //does the same for bus Numbers on the form xbusNr
     var lineRef = $("."+p+"busNr").html(json['StopMonitoringDelivery']['MonitoredStopVisit'][p]['MonitoredVehicleJourney']['LineRef']);

     //does the same for arrival time
     var arrTime=getArrivalMinutes(json['StopMonitoringDelivery']['MonitoredStopVisit'][p]['MonitoredVehicleJourney']['MonitoredCall']['ExpectedDepartureTime']);
     var lineRef = $("."+p+"arrTime").html(arrTime);

     
     }
    //gives the class "rangeOfList" the value of the number of bus lists. Not sure if we need this, would be easier to just do it in the html file when we generate the menu. 
    var lineRef = $(".rangeOfList").html(json['StopMonitoringDelivery']['MonitoredStopVisit'].length);
    
>>>>>>> 9573f02f284aa581bbe4cbbd767d9aa6aa021052
    }
  });
}

$(document).ready(function() {
  fetchData();
  //setInterval(fetchData, 30000);
  //writeToDoc();
});

<<<<<<< HEAD
=======
//Returns how many minute untill the bus will arrive
function getArrivalMinutes(time){

  //getsCurrentTime
  var now = new Date();
  var busTime = String(time);

  //splits the date to get the minutes of the day
  var timeSDay = busTime.split("T");
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

>>>>>>> 9573f02f284aa581bbe4cbbd767d9aa6aa021052
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

<<<<<<< HEAD
=======

>>>>>>> 9573f02f284aa581bbe4cbbd767d9aa6aa021052
function writeToDoc(){
  var test = $(".lineRef").html("22");
  console.log(buss1_lineRef.innerHTML);
}

<<<<<<< HEAD
function generateFromTemplate(json){
  //Create an array containing all the bus information formatted correctly
  var busArray = [];

  //Loop over all the busses, retrieve the relevant information and format it.
  for (var i = 0; i < json['StopMonitoringDelivery']['MonitoredStopVisit'].length; i++) {
    busArray.push(
    {
      lineRef: json['StopMonitoringDelivery']['MonitoredStopVisit'][i]['MonitoredVehicleJourney']['LineRef'],
      busName: json['StopMonitoringDelivery']['MonitoredStopVisit'][i]['MonitoredVehicleJourney']['DestinationName'],
      timeEst: '2 <br> min'
    }
      );
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
=======
//window.onload = fetchData();
//window.onload = writeToDoc();
>>>>>>> 9573f02f284aa581bbe4cbbd767d9aa6aa021052
