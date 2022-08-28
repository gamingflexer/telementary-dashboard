var geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'properties': {},
                'coordinates': [
                    [-77.0366048812866, 38.89873175227713],
                    [-77.03364372253417, 38.89876515143842],
                    [-77.03364372253417, 38.89549195896866],
                    [-77.02982425689697, 38.89549195896866],
                    [-77.02400922775269, 38.89387200688839],
                    [-77.01519012451172, 38.891416957534204],
                    [-77.01521158218382, 38.892068305429156],
                    [-77.00813055038452, 38.892051604275686],
                    [-77.00832366943358, 38.89143365883688],
                    [-77.00818419456482, 38.89082405874451],
                    [-77.00815200805664, 38.88989712255097]
                ]
            }
        }
    ]
};

var map = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=pSrPGQipuQ3fvmTiyA5p',
    center: [-77.0214, 38.897],
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