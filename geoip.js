function geoIpHandler(data, tab) {
    var text = data.selectionText;

    if(text !== '' && isValidIp(text)) {
        getGeoIpInfo(text);
    } else {
	alert("Not a valid IP.");
    }
}

function isValidIp(ip) {
  var ipv4Re = /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/;
  var ipv6StdRe = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  var ipv6HexRe = /^((?:[0-9A-Fa-f]{1,4}(?::[0-9A-Fa-f]{1,4})*)?)::((?:[0-9A-Fa-f]{1,4}(?::[0-9A-Fa-f]{1,4})*)?)$/;
  
  var isValid = ipv4Re.test(ip) || ipv6StdRe.test(ip) || ipv6HexRe.test(ip);

  return isValid;
}

function getGeoIpInfo(ip) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://ip-api.com/json/" + ip, false);
  xhr.send();

  var result = JSON.parse(xhr.responseText);

  var displayText = ip + " is located in: " + result.city + ", " + result.region + ", " + result.country;

  alert(displayText);
}

var title = "Lookup geolocation for %s";

chrome.contextMenus.create({"title": title, "contexts": ["selection"], "onclick": geoIpHandler});
