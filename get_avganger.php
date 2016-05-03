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
		// Holdeplassnavn
		$temp_holdeplass1 = explode('<span class="tm-departurelist-destination tm-alpha6"> ', $v);
		$temp_holdeplass2 = explode('</span> </span>', $temp_holdeplass1[1]);
		$holdeplass = trim($temp_holdeplass2[0]);

		// Avgang
		$temp_avgang1 = explode('<span class="tm-block-float tm-departurelist-time"> ', $v);
		$temp_avgang2 = explode('</span> </span>', $temp_avgang1[1]);
		$avgang = trim($temp_avgang2[0]);

		// Sjekk om vi må parse om 'xx min' til klokkeslett
		if (strpos($avgang, ':') !== false) {
			// TODO
		}

		// Legg til i lista
		$clean[] = array('holdeplass' => $holdeplass, 'tid' => $avgang);
	}

	// Echo json her
	return $clean;
}
?>