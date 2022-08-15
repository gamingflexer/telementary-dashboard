function map() {
    var dataPoints = [];
    

    $.getJSON("https://retoolapi.dev/BysnBZ/data", function (data) {
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
                        'coordinates': dataPoints
                    }
                }
            ]
        };
        var map = new maplibregl.Map({
            container: 'map',
            style:
                'https://api.maptiler.com/maps/streets/style.json?key=pSrPGQipuQ3fvmTiyA5p',
            center: dataPoints,
            zoom: 12
        });
        
        map.render();
        updatemap();
    });
    function updatemap() {
        $.getJSON("https://retoolapi.dev/BysnBZ/data", function (data) {
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
        .getElementById('zoomTo')
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
}

async function fetchData9() {
    const url = "https://retoolapi.dev/BysnBZ/data";
    const response = await fetch(url);
    const datapoints = await response.text();
    console.log(datapoints)
    document.getElementById('map').innerText = datapoints;
    return datapoints;
}
var timer = setInterval(fetchData9,1000)
dataheartbeat = fetchData9();
