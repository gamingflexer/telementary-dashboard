drawChart();
async function drawChart() {
    const ctx = document.getElementById('linechart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '25', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
            datasets: [{
                label: 'Heartbeat',
                data: [100, 160, 110, 150, 90, 170, 100, 140, 90, 160, 120, 160, 180, 100, 160],
                backgroundColor: [
                    '#68A4F1',

                ],
                borderColor: [
                    '#061E47',

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

let stopped = false
let isstopped = 1;

async function fetchData() {
    const url = "api/heartbeat";
    const response = await fetch(url);
    const datapoints = await response.text();
    console.log(datapoints)
}
function chartheart (){
while (!stopped) {
    isstopped = isstopped +1 ;
    if (isstopped > 100) {
        stopped = true;
    fetchData();
    };
}
}

var timer = setInterval(fetchData,3000)
fetchData();