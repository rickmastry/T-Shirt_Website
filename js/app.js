function openSideMenu(){
    document.getElementById('side-menu').style.width = '250px';
   
}
function closeSideMenu(){
    document.getElementById('side-menu').style.width = '0';
   
}

mapboxgl.accessToken = 'pk.eyJ1IjoiamFocmlrIiwiYSI6ImNrMDM3dGhzaDBjZ3gzaG54OTR2c3FsY3AifQ.heM_Q5Kt9MGtEP9r4-UEzg';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-77.899680, 34.034980],
zoom: 13.15
});
map.on('load', function () {
// Add a layer showing the places.
map.addLayer({
"id": "places",
"type": "symbol",
"source": {
"type": "geojson",
"data": {
"type": "FeatureCollection",
"features": [{
"type": "Feature",
"properties": {
"description": "<strong>Don The Mons Irie Items</strong><p><a href=\"http://www.donthemonsirieitems.com/\" target=\"_blank\" title=\"Opens in a new window\">Don The Mons Irie Items</a> is a screenprinting shop at its finest - 8:00a.m.- 6:00 p.m.</p>",
"icon": "theatre"
},
"geometry": {
"type": "Point",
"coordinates": [-77.899680, 34.034980]
}
}]
}
},
"layout": {
"icon-image": "{icon}-15",
"icon-allow-overlap": true
}
});

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'places', function (e) {
var coordinates = e.features[0].geometry.coordinates.slice();
var description = e.features[0].properties.description;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}

new mapboxgl.Popup()
.setLngLat(coordinates)
.setHTML(description)
.addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'places', function () {
map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'places', function () {
map.getCanvas().style.cursor = '';
});
});