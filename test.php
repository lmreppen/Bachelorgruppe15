<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script>
function fetchData() {
  $.ajax({
    url: 'test_realtime.php', 
    cache: false,
    success: function(json) {
      console.log(json);
      console.log(json['StopMonitoringDelivery']['MonitoredStopVisit'])

      for (var i = 0; i < json['StopMonitoringDelivery']['MonitoredStopVisit'].length; i++) {
        console.log(json['StopMonitoringDelivery']['MonitoredStopVisit'][i]);
      }
    }
  });
}

$(document).ready(function() {
  fetchData();
  //setInterval(fetchData, 30000);
});
</script>
</head>
<body>



</body>
</html>
