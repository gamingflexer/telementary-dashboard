var xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
            var yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

            new Chart("myCha", {
              type: "line",
              data: {
                labels: xValues,
                datasets: [{
                  fill: false,
                  lineTension: 0,
                  backgroundColor: "#ffffff",
                  borderColor: "#192841",
                  data: yValues
                }]
              },
              options: {
                legend: { display: false },
                scales: {
                  yAxes: [{ ticks: { min: 6, max: 16 } }],
                }
              }
            });