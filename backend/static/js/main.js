window.onload = function () {
    var dataPoints = [];
    var chart;
    $.getJSON("/api/heartbeat", function (data) {
        $.each(data, function (key, value) {
            dataPoints.push({ x: value[0], y: parseInt(value[1]) });
        });
        chart = new CanvasJS.Chart("chartContainer", {
            data: [{
                type: "line",
                dataPoints: dataPoints,
            }]
        });
        chart.render();
        updateChart();
    });
    function updateChart() {
        $.getJSON("/api/heartbeat", function (data) {
            $.each(data, function (key, value) {

                console.log(value);
                dataPoints.push({
                    x: parseInt(value[0]),
                    y: parseInt(value[1])
                });
            });
            chart.render();
            setTimeout(function () { updateChart() }, 1000);
        });
    }
}

// Get call for single Heart beat

async function fetchData2() {
    const url = "api/heartbeat-single";
    const response = await fetch(url);
    const datapoints = await response.text();
    console.log(datapoints)
    document.getElementById('heartratesingle').innerText = datapoints + ' bpm';
    return datapoints;
}

var timer = setInterval(fetchData2,1000)
dataheartbeat = fetchData2();
