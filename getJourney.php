<?php
// Funksjon
function get_avganger($url) {
	// cURL greier
	$ch = curl_init();  
	curl_setopt($ch, CURLOPT_URL, 'http://rp.atb.no' . $url);  
	curl_setopt($ch, CURLOPT_HEADER, 0);  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  

	// Kjør cURL og fjern whitespace
	$all = preg_replace('/\s+/', ' ', curl_exec($ch));
	curl_close($ch);

	// Skaff alle avgangene (fjern alt annet dritt)
	$departure = explode('<div id="tm-triplist">', $all);

	// Split listen
	$list = explode('<h3>', $departure[1]);

	// Fix last
	$list[count($list) - 1] = explode('</ol>', $list[count($list) - 1]);
	$list[count($list) - 1] = $list[count($list) - 1][0];

	// Remove first
	unset($list[0]);

	// Array til å lagre alle linkene
	$clean = array();

	// Loop alle avgangene
	foreach ($list as $v) {
		// Holdeplassnavn
		$temp_holdeplass1 = explode('<span class="tm-inline-block tm-tripmenu-hpl">', $v);
		$temp_holdeplass2 = explode('</span>', $temp_holdeplass1[1]);
		$holdeplass = trim($temp_holdeplass2[0]);

		// Avgang
		$temp_avgang1 = explode('<span class="tm-tripmenu-planlagt">', $v);
		$temp_avgang2 = explode('</span>', $temp_avgang1[1]);
		$avgang = trim($temp_avgang2[0]);

		// Legg til i lista
		$clean[] = array('holdeplass' => $holdeplass, 'tid' => $avgang);
	}

	// Echo json her
	return $clean;
}

// folk.ntnu.no/larsmell/buddybus/thomas.php?date=03.05.2016&time=16%3A15&code=16010030&num=8

// Set header
header('Content-Type: application/json');

// Linjenummer to get
$linenum_to_find = $_GET['num'];

//URL of targeted site
$date = $_GET['date'];
$time = $_GET['time'];
$code = $_GET['code'];
$url = "http://rp.atb.no/scripts/TravelMagic/TravelMagicWE.dll/svar?referrer=&lang=no&dep1=1&theme=&Date=$date&Time=$time&now=1&direction=1&from=$code&to=&search=S%C3%B8k&GetTR0=1&GetTR1=1&GetTR2=1&GetTR3=1&GetTR4=1&GetTR5=1&GetTR6=1&GetTR7=1&through=&throughpause=&changepenalty=1&changepause=0&linjer=&destinations=";  
$ch = curl_init();  

// set URL and other appropriate options  
curl_setopt($ch, CURLOPT_URL, $url);  
curl_setopt($ch, CURLOPT_HEADER, 0);  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  

// Kjør cURL og fjern whitespace
$all = preg_replace('/\s+/', ' ', curl_exec($ch));
curl_close($ch);  

// Skaff alle avgangene (fjern alt annet dritt)
$departure = explode('<div id="tm-departurelist">', $all);

// Split listen
$list = explode('<li class="ui-state-default', $departure[1]);

// Fix last
$list[count($list) - 1] = explode('</ul></div>', $list[count($list) - 1]);
$list[count($list) - 1] = $list[count($list) - 1][0];

// Remove first
unset($list[0]);

// Array til å lagre alle linkene
$clean = array();

// Loop alle avgangene
foreach ($list as $v) {
	// Find line number
	$line_number_temp = explode('<strong class="tm-departurelist-linename">', $v);
	$line_number_temp2 = explode(' </strong>', $line_number_temp[1]);
	$line_number = (int) $line_number_temp2[0];

	if ($line_number == $linenum_to_find) {
		$temp = explode('<a href="', $v);
		$temp_clean = explode('<div class="tm-departurelist-wrapper">', $temp[1]);
		$clean[] = htmlspecialchars_decode(trim(str_replace('">', '', $temp_clean[0])));
	}
}

// Dette er den første linken :)
// Clean inneholder alle linkene nedover etter når ankomsten er
$first_link = $clean[0]; 

// Get avganger
$avganger = get_avganger($first_link);

// Output JSON
echo json_encode($avganger);	
?>