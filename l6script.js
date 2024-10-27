// initialize map and center on US
var map = L.map('map').setView([32.0, -95.0], 5);

// adds openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// generates random coordinates
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

var coordinates = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
];

// gets locality from API
function getLocality(lat, lng, index) {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            var locality = data.locality || "Locality not found";
            document.getElementById(`marker-info-${index}`).innerHTML += `<br>Locality: ${locality}`;
        })
        .catch(error => {
            console.error('Error fetching locality:', error);
        });
}

// adds and displays marker details
coordinates.forEach((coord, index) => {
    var marker = L.marker([coord.lat, coord.lng]).addTo(map);
    marker.bindPopup(`Marker ${index + 1}: Latitude: ${coord.lat}, Longitude: ${coord.lng}`).openPopup();

    var markerInfo = document.createElement('div');
    markerInfo.className = 'marker-info';
    markerInfo.id = `marker-info-${index}`;
    markerInfo.innerHTML = `Marker ${index + 1}: Latitude: ${coord.lat}, Longitude: ${coord.lng}`;
    document.getElementById('marker-details').appendChild(markerInfo);

    getLocality(coord.lat, coord.lng, index);
});
