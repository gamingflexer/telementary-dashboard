const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255,255,255)',
    borderColor: '#192841',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};
const config = {
  type: 'line',
  data,
  options: {}
};
var myChart = new Chart(
  document.getElementById('myChart'),
  config
);