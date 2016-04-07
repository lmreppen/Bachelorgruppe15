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
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:siri="http://www.siri.org.uk/siri">
   <soapenv:Header/>
   <soapenv:Body>
      <siri:GetVehicleMonitoring>
         <ServiceRequestInfo>
            <siri:RequestTimestamp>' . $this->variables['RequestTimestamp'] . '</siri:RequestTimestamp>
            <siri:RequestorRef>' . $this->variables['RequestorRef'] . '</siri:RequestorRef>
         </ServiceRequestInfo>
         <Request version="1.4">
            <siri:RequestTimestamp>' . $this->variables['RequestTimestamp'] . '</siri:RequestTimestamp>
             <siri:VehicleRef>' . $this->variables['VehicleRef'] . '</siri:VehicleRef> 
         </Request>
         <RequestExtension>
            <!--You may enter ANY elements at this point-->
         </RequestExtension>
      </siri:GetVehicleMonitoring>
   </soapenv:Body>
</soapenv:Envelope>';
    return parent::__doRequest($request, $location, $action, $version);
  }
}

$hehe = $_POST['time'];
$tihi = $_POST['bussID'];

$array = array();
$array['RequestTimestamp'] = $hehe;
$array['RequestorRef'] = 'Lars';
$array['VehicleRef'] = $tihi;
$client = new SoapClientHax("http://st.atb.no/VMWS/VMService.svc?wsdl", array(
  'encoding' => 'UTF-8', 
  'trace' => 1, 
  'exceptions' => 1, 
  'connection_timeout' => 50000));
$client->setVars($array);
try {
  $data = $client->GetVehicleMonitoring('');
  $data = $data['Answer'];
}
catch (Exception $e) {
  $data = $e->getMessage();
}
echo json_encode($data);
?>