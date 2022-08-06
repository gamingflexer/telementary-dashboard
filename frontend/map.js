let mapOptions = {
    center:[18.9890344,73.0793375],
    zoom:10
}


let map = new L.map('map' , mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

let marker = new L.Marker([18.9890344,73.0793375]);
marker.addTo(map);