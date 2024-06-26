var map = L.map('map').setView([54.9783, -1.6174], 13); // Centered around Newcastle Upon Tyne

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function onMapClick(e) {
    // Create a new marker at clicked location
    pin = L.marker(e.latlng, {draggable:true}).addTo(map);
    pin.on('click', onPinClick);
    pins.push(pin);
    pin.bindPopup("<form action='/newPin', method='post'>\n" +
        "<div class=\"input-container\">\n" +
        "          <input type=\"text\" id=\"locName\" name=\"locName\" placeholder=\"Location Name\" />\n" +
        "</div>\n" +
        "<div class=\"input-container\">\n" +
        "          <input type=\"text\" id=\"openTimes\" name=\"openTimes\" placeholder=\"Opening Times\" />\n" +
        "</div>\n" +
        "<div class=\"input-container\">\n" +
        "          <input type=\"submit\" value=\"Submit\" />\n" +
        "</div>\n" +
        "</form>").openPopup();

    // e.latlng.toString()
}


// Define current location marker
var currentLocationMarker;

// Define the variable to hold the current route line
var currentRoute;

// Create an array to hold existing pins
var pins = [];

var currentLocationIcon = L.icon({
    iconUrl: 'icons/loc.svg', // Relative path to the SVG file
    iconSize: [28, 85],
    popupAnchor: [-3, -76]
});

// Function to handle pin click event
function onPinClick(e) {
    var clickedPin = e.target;
    console.log(clickedPin)
    // Calculate and draw route from current location to clicked pin
    if (currentLocationMarker) {
        // Remove the current route line if it exists
        if (currentRoute) {
            map.removeLayer(currentRoute);
        }
        calculateAndDrawRoute(currentLocationMarker.getLatLng(), clickedPin.getLatLng());
    }
}

// Function to calculate and draw route between two points
function calculateAndDrawRoute(start, end) {
    // You can use any routing service API here, like OpenRouteService, OSRM, etc.
    // For example, you can use OpenRouteService:
    var url = 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248e6d12c19c2ae4097ae4cb6a9bac49f75&start=' +
        start.lng + ',' + start.lat + '&end=' + end.lng + ',' + end.lat;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Draw the route on the map
            currentRoute = L.geoJSON(data.features[0].geometry).addTo(map);
        })
        .catch(error => {
            console.error('Error fetching route:', error);
        });
}

// Create existing pins and add them to the map
var pin1 = L.marker([54.9783, -1.6174]).addTo(map); // Newcastle Upon Tyne
pin1.bindPopup("<b>Newcastle Upon Tyne</b><br>Click me to calculate route.").openPopup();
pin1.on('click', onPinClick);
pins.push(pin1);

var pin2 = L.marker([54.9783, -1.6224]).addTo(map); // Near Newcastle University
pin2.bindPopup("<b>Near Newcastle University</b><br>Click me to calculate route.").openPopup();
pin2.on('click', onPinClick);
pins.push(pin2);

var pin3 = L.marker([54.9751, -1.6174]).addTo(map); // Near Gateshead
pin3.bindPopup().openPopup();
pin3.on('click', onPinClick);
pins.push(pin3);

// Get current location of the user
navigator.geolocation.getCurrentPosition(function (position) {
    var latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    // Add a marker for the current location
    currentLocationMarker = L.marker(latlng, {icon: currentLocationIcon}).addTo(map);
    currentLocationMarker.bindPopup("Your Current Location").openPopup();
}, function (error) {
    console.error('Error getting current location:', error);
});

map.on('click', onMapClick);