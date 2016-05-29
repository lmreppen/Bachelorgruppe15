<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
class SoapClientHax extends SoapClient {
  private $variables;
  public function setVars($array) {
    $this->variables = $array;
  }
  public function __doRequest($request, $location, $action, $version) {   
    $request = '
    <soapenv:Envelope xmlns:siri="http://www.siri.org.uk/siri" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
      <siri:GetStopMonitoring>
         <ServiceRequestInfo>
            <siri:RequestTimestamp>' . $this->variables['RequestTimestamp'] . '</siri:RequestTimestamp>
            <siri:RequestorRef>' . $this->variables['RequestorRef'] . '</siri:RequestorRef>
         </ServiceRequestInfo>
         <Request version="1.4">
            <siri:RequestTimestamp>' . $this->variables['RequestTimestamp'] . '</siri:RequestTimestamp>
            <siri:MonitoringRef>' . $this->variables['MonitoringRef'] . '</siri:MonitoringRef>
            <siri:StopMonitoringDetailLevel>' . $this->variables['StopMonitoringDetailLevel'] . '</siri:StopMonitoringDetailLevel>
         </Request>
         <RequestExtension>
            <!--You may enter ANY elements at this point-->
         </RequestExtension>
      </siri:GetStopMonitoring>
   </soapenv:Body>
</soapenv:Envelope>';
    return parent::__doRequest($request, $location, $action, $version);
  }
}

$hehe = $_POST['time'];
$tihi = $_POST['holdeplass'];

$array = array();
$array['RequestTimestamp'] = $hehe;
$array['RequestorRef'] = 'Lars';
$array['MonitoringRef'] = $tihi;
$array['StopMonitoringDetailLevel'] = 'normal';
$client = new SoapClientHax("http://st.atb.no/SMWS/SMService.svc?wsdl", array(
  'encoding' => 'UTF-8', 
  'trace' => 1, 
  'exceptions' => 1, 
  'connection_timeout' => 50000));
$client->setVars($array);
try {
  $data = $client->GetStopMonitoring('');
  $data = $data['Answer'];
}
catch (Exception $e) {
  $data = $e->getMessage();
}
echo json_encode($data);
?>