var geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'properties': {},
                'coordinates': [
                    [77.5413398,28.3668904],
                    [77.539459,28.366560],
                    [77.539575,28.364733],
                    [77.539296,28.363374],
                    [77.538180,28.363166],
                    [77.537150,28.362817],
                    [77.536818,28.362571],
                    [77.537719,28.363043],
                    [77.537024,28.362695],
                    [77.535717,28.361053],
                    [77.531390,28.357569],
                    [77.529916,28.354996],
                    [77.529927,28.353136],
                    [77.529808,28.351502],
                    [77.531111,28.350309],
                    [77.532174,28.350286],
                    [77.5329031,28.350494]
                ]
            }
        }
    ]
};

var map = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=pSrPGQipuQ3fvmTiyA5p',
    center: [77.537024,28.362695],
    zoom: 12
});

map.on('load', function () {
    map.addSource('LineString', {
        'type': 'geojson',
        'data': geojson
    });
    map.addLayer({
        'id': 'LineString',
        'type': 'line',
        'source': 'LineString',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#BF93E4',
            'line-width': 5
        }
    });

    document
        .getElementById('zoomto')
        .addEventListener('click', function () {
            var coordinates = geojson.features[0].geometry.coordinates;
            var bounds = coordinates.reduce(function (bounds, coord) {
                return bounds.extend(coord);
            }, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));

            map.fitBounds(bounds, {
                padding: 20
            });
        });
});