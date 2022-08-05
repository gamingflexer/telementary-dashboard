let mapOptions = {
    center:[19.0868, 72.998],
    zoom:10
}


let map = new L.map('map' , mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

let marker = new L.Marker([19.0868, 72.998]);
marker.addTo(map);