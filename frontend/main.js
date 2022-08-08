const url = "https://raw.githubusercontent.com/gamingflexer/telementary-dashboard/main/backend/data/heartbeat.csv";

async function getData() {

    const response = await fetch(url);

    const rawData = await response.text();

    document.getElementById("csv"),innerHTML = rawData;

    console.log(rawData);
    console.log("rawData type : "+ typeof rawData);

    let arrayOne = rawData.split("\n");
    let header = arrayOne[0].split(",");
    let noOfRow = arrayOne.length;
    let noOfCol = header.length;
    let jsonData = [];
    let i = 0;
    let j = 0; 

    for (i = 0; i < noOfRow ; i++) {
        let obj = {};
        let myNewLine = arrayOne[i].split(",");

        for (j = 0; j < noOfCol; j++) {
            obj[header[j]] = myNewLine[j];
        };

        jsonData.push(obj);
    };


//document.getElementById("json").innerHTML = jsonData;

console.log(jsonData);
console.table(jsonData);
console.log("jsonData type : " + typeof jsonData);

jsonString = JSON.stringify(jsonData);
console.log(jsonString);
console.log("jsonString type : " + typeof jsonString);


let time = [];

for (i in jsonData){
    let item = jsonData[i];
    time.push(item.timestamp);
}

let beat = [];

for (i in jsonData){
    let item = jsonData[i];
    beat.push(item.sensor);
}


let p = document.getElementById("myPlot");

let plotData = [
    {
        x: time,
        y: beat
    }
];

let layout = {
    title : "heartbeat",
    xaxis : { title: "time"},
    yaxis : { title: "pulse rate"}
};

Plotly.newPlot(p, plotData, layout);

console.log(time);
console.log(beat);
console.log(Plotly.newPlot(p, plotData, layout));
console.log("plot type: " +typeof Plotly.newPlot(p, plotData, layout));
}

getData();