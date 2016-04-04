function fetchData() {
  var time = getCurrentTime();
  $.ajax({
    type: 'POST',
    url: 'test_realtime.php', 
    data: {time:time,holdeplass:'16010404'},
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

        //document.write(destination + ' - Annkomst: '+ arrivalTime +' - Status: ' + status + '<BR/>');
        //document.write(lineNr + '<BR/>' + '<BR/>');
        var lineRef = $(".lineRef").html(json['StopMonitoringDelivery']['MonitoredStopVisit'][0]['MonitoredVehicleJourney']['LineRef']);
        var lineRef = $(".busName").html(json['StopMonitoringDelivery']['MonitoredStopVisit'][0]['MonitoredVehicleJourney']['DestinationName']);
        
      }
    }
  });
}

$(document).ready(function() {
  fetchData();
  //setInterval(fetchData, 30000);
  //writeToDoc();
});

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

//window.onload = fetchData();
//window.onload = writeToDoc();