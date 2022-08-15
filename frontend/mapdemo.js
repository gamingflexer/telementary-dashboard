function map() {
    var dataPoints = [];
    $.getJSON("/api/heartbeat", function (data) {
        $.each(data, function (key, value) {
            dataPoints.push({ x: value[0], y: parseInt(value[1]) });
        });
        var geojson = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'properties': {},
                        'coordinates': [dataPoints]
                    }
                }
            ]
        };
        
        map.render();
        updateChart();
    });
    function updateChart() {
        $.getJSON("/api/heartbeat", function (data) {
            $.each(data, function (key, value) {
                console.log(dataPoints)
                dataPoints.push({
                    x: parseInt(value[0]),
                    y: parseInt(value[1])
                });
            });
            map.render();

        });
    }
}


var map = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=pSrPGQipuQ3fvmTiyA5p',
    center: [dataPoints],
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
