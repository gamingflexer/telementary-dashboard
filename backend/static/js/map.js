
let mapcordi = [];
// let x = mapcordi;
  for (let i = 0; i < 11; i++) 
  {
  y=[mapcordi[i]['longitude'],mapcordi[i]['latitude']]
  console.log(mapcordi)
  }

  var geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'properties': {},
                'coordinates': [mapcordi]
            }
        }
    ]
};
console.log('btwn',mapcordi)

var map = new maplibregl.Map({
    container: 'map',
    style:
        'https://api.maptiler.com/maps/streets/style.json?key=pSrPGQipuQ3fvmTiyA5p',
    center: [-77.0366048812866, 38.89873175227713],
    zoom: 12
});

map.on('load', function () {
    map.addSource('LineString', {
        'type': 'geojson',
        'data': y
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

// async function fetchData9() {
//     const url = "https://retoolapi.dev/BysnBZ/data";
//     const response = await fetch(url);
//     const datapoints = await response.json();
//     return datapoints;
// }
    
fetch('https://retoolapi.dev/0ZmVOz/data').then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    mapcordi = data;
    console.log(mapcordi)
  }).catch(err => {
    // Do something for an error here
  });


// var z = setInterval(fetchData9(),1000)
// console.log(z);


