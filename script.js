# Redirect http to https
var host = "lmreppen.github.io/Bachelorgrupp15";
if ((host == window.location.host) && (window.location.protocol != "https:"))
window.location.protocol = "https";
