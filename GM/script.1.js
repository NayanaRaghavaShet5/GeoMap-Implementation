mapboxgl.accessToken = 'pk.eyJ1IjoibmF5YW5hc2hldCIsImEiOiJja25vdDc2dngwMDE2MnZsYW81Ync4cjlhIn0.tYvYY0vuoKW2GN_E-JXefQ';

var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [99.71750,52.60459]
        },
        properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.'
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [100.66025,51.88434]
        },
        properties: {
            title: 'Mapbox',
            description: 'San Francisco, California'
        }
    }]
};



navigator.geolocation.getCurrentPosition(successLocation, errorLocation,
    { enableHighAccuracy: true })

function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
    setupMap([-2.34, 25.35]);
}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 15,
        center: center
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    const directions = new MapboxDirections({
        accessToken: 'pk.eyJ1IjoibmF5YW5hc2hldCIsImEiOiJja25vdDc2dngwMDE2MnZsYW81Ync4cjlhIn0.tYvYY0vuoKW2GN_E-JXefQ',
    })
    map.addControl(directions);

    geojson.features.forEach(function (marker) {
        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                '<h3>' +
                marker.properties.title +
                '</h3><p>' +
                marker.properties.description +
                '</p>'
                )
            )
            .addTo(map);
    });
}
