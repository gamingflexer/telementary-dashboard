let mapOptions = {
    center:[18.9890344,73.0793375],
    zoom:10
}


let map = new L.map('map' , mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

let marker = new L.Marker([18.9890344,73.0793375]);
marker.addTo(map);


var data = [{
    type:'scattermapbox',
    lat:['44.968046'],
    lon:['-94.420307'],
    mode:'markers',
    marker: {
      size:14
    },
    text:['Montreal']
  }]
  
  var layout = {
    autosize: true,
    hovermode:'closest',
    mapbox: {
      bearing:0,
      center: {
        lat:45,
        lon:-73
      },
      pitch:0,
      zoom:5
    },
  }
  
  Plotly.setPlotConfig({
    mapboxAccessToken: "your access token"
  })
  
  Plotly.newPlot('myDiv', data, layout)
  