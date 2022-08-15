function chart() {
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
                dataPoints.push({
                    x: parseInt(value[0]),
                    y: parseInt(value[1])
                });
            });
            chart.render();

            var cnt = 0;
            setTimeout(function () { 
                updateChart() 
                if (dataPoints.length > 10) {
                    dataPoints.shift()
                }
                cnt++;
                if(cnt > 40){
                    plotly.relayout('chart',{
                        xaxis: {
                            range: [cnt , cnt - 40]
                        }
                        
                    });
                }
            }, 1000);
        });
    }
}


// Get call for single Heart beat

async function fetchData2() {
    const url = "api/heartbeat-single";
    const response = await fetch(url);
    const datapoints = await response.text();
    document.getElementById('heartratesingle').innerText = datapoints + ' bpm';
    return datapoints;
}
 var timer = setInterval(fetchData2,1000)
dataheartbeat = fetchData2();

async function fetchData3() {
    const url = "api/heartbeat-single";
    const response = await fetch(url);
    const datapoints = await response.text();
    document.getElementById('temp1').innerText = datapoints;
    return datapoints;
}
var timer = setInterval(fetchData3,1000)
dataheartbeat = fetchData3();

async function fetchData4() {
    const url = "api/heartbeat-single";
    const response = await fetch(url);
    const datapoints = await response.text();
    document.getElementById('temp2').innerText = datapoints;
    return datapoints;
}
var timer = setInterval(fetchData4,1000)
dataheartbeat = fetchData4();

async function fetchData5() {
    const url = "api/heartbeat-single";
    const response = await fetch(url);
    const datapoints = await response.text();
    document.getElementById('temp3').innerText = datapoints;
    return datapoints;
}
var timer = setInterval(fetchData5,1000)
dataheartbeat = fetchData5();

async function fetchData6() {
    const url = "api/heartbeat-single";
    const response = await fetch(url);
    const datapoints = await response.text();
    document.getElementById('temp4').innerText = datapoints;
    return datapoints;
}
var timer = setInterval(fetchData6,1000)
dataheartbeat = fetchData6();

async function fetchData7() {
    const url = "api/heartbeat-single";
    const response = await fetch(url);
    const datapoints = await response.text();
    document.getElementById('temp5').innerText = datapoints;
    return datapoints;
}
var timer = setInterval(fetchData7,1000)
dataheartbeat = fetchData7();

async function fetchData8() {
    const url = "api/heartbeat-single";
    const response = await fetch(url);
    const datapoints = await response.text();
    document.getElementById('temp6').innerText = datapoints;
    return datapoints;
}
var timer = setInterval(fetchData8,1000)
dataheartbeat = fetchData8();