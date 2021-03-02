window.io = io('http://192.168.100.11:1998/', { transport: ['websocket'] });
io.on('connect', function() {
    console.log(1111111111111111);
});
io.on('disconnect', function() {
    console.log('ngat ket noi');
});
var dataPoints = [];
var dataPoints2 = []; // duong thang thua
var dataPoints3 = []; // duong ke di theo trade
var datatrade = {
    type: "line",
    dataPoints: dataPoints,
    color: [
        'blue', // color for data at index 0
    ],

};
var dataclient = {
    type: "line",
    dataPoints: dataPoints2,
    color: [
        'red', // color for data at index 0
    ],

};
var datadiemdau = {
    type: "line",
    dataPoints: dataPoints3,
    color: [
        'rgb(2,137,16)', // color for data at index 0
    ],

};
var dataset = [
    datatrade, datadiemdau, dataclient
];
var xValue = 0;
var yValue = 0;
var newDataCount = 6;
var ytrade = 0;
var xtrade = 0
var arrtrade = { len: 0, xuong: 0 };





$(document).ready(function() {
    // var options = {
    //     theme: "light2",
    //     animationEnabled: true,
    //     animationDuration: 10000,
    //     title: {
    //         text: "Live Data"
    //     },
    //     data: dataset,


    // };
    var chart = new CanvasJS.Chart("chartContainer", {
        // animationEnabled: true,
        // animationDuration: 3000, //change to false
        title: {
            text: "Chart with Animation Enabled"
        },
        data: dataset
    });
    chart.render();

    //$("#chartContainer").CanvasJSChart(options);
    io.on('toa-do', data => {
        console.log(data);
        var time = data.x;
        var date = new Date(time);

        //// d.toLocaleString(); //     "7/25/2016, 1:35:07 PM"

        // // d.toLocaleDateString()"7/25/2016"

        // // d.toDateString(); //        "Mon Jul 25 2016"

        ////d.toTimeString(); //        "13:35:07 GMT+0530 (India Standard Time)"
        // // console.log(date.toLocaleTimeString()); //13:35:07
        // // console.log(date.toTimeString()); //13:35:07
        dataPoints.push({ x: data.x, y: data.y, markerSize: 1 });

        dataPoints2.shift(); // duong quyet dinh thang thua
        dataPoints2.shift();
        dataPoints2.push({ x: dataPoints[0].x, y: 7, markerSize: 1 }, { x: data.x + 30000, y: 7, markerSize: 1 })

        dataPoints3.shift(); // duong di theo trade
        dataPoints3.shift();
        dataPoints3.push({ x: dataPoints[0].x, y: data.y, markerSize: 1 }, { x: data.x + 30000, y: data.y, markerSize: 1 })
        if (dataPoints.length == 50) {
            dataPoints2.shift(); // duong thang thua
            dataPoints2.shift();
            dataPoints2.push({ x: dataPoints[1].x, y: 7, markerSize: 1 }, { x: data.x + 30000, y: 7, markerSize: 1 })

            dataPoints3.shift(); // duong di theo trade
            dataPoints3.shift();
            dataPoints3.push({ x: dataPoints[1].x, y: data.y, markerSize: 1 }, { x: data.x + 30000, y: data.y, markerSize: 1 })
            dataPoints.shift();
        }
        var chart = new CanvasJS.Chart("chartContainer", {
            //animationEnabled: true,
            // animationDuration: 3000, //change to false
            title: {
                text: "Chart with Animation Enabled"
            },
            data: dataset
        });
        chart.render();
        //$("#chartContainer").CanvasJSChart().render();

    })
});
