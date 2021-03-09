//window.io = io(urlsocket, { transport: ['websocket'] });
am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;

    chart.padding(0, 0, 0, 0);

    chart.zoomOutButton.enabled = true;

    var data = [];
    var data2 = [];
    var visits = 10;
    var g = 10;
    var i = 0;
    var flag = 0;
    var dateG = 0;
    var flagpop = 0;
    var len = 3000; // t là độ dài của chart
    var time = new Date().getTime();




    // visits -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
    // data.push({ date2: new Date(time), date3: new Date(time + 7000), value1: visits, value2: g, value3: g, value4: -20 }); //1:line,2:duongG,3:focus,4:ket qua


    // visits -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
    // data.push({ date2: new Date(time + 21000), date3: new Date(time + 7000), value1: visits, value2: g, value3: g, value4: 20 }); //1:line,2:duongG,3:focus,4:ket qua


    // window.addEventListener('online', () => {
    // });
    async function get_data() {
        await $.ajax({
            type: "post",
            url: urlapi,
            data: { detect: 'get_coordinate' },
            dataType: "json",
            success: function(response) {
                console.log(response);
                if (response.success == 'false') {
                    //data.push({ date1: new Date().setSeconds(0), date2: new Date().setSeconds(0), value1: 0, value2: 0, value3: 0 });
                } else {
                    phien = response.data[31];
                    arr = JSON.parse(phien.coordinate_xy);
                    gg = JSON.parse(phien.coordinate_g);
                    g = 9.385 //gg.y;
                    data.push({ date2: new Date(phien.time_open * 1000), date3: new Date(phien.time_close * 1000), value2: g, value3: g, value4: g - 0.5 }); //1:line,2:duongG,3:focus,4:ket qua
                    data.push({ date2: new Date(phien.time_close * 1000), date3: new Date(phien.time_close * 1000), value2: g, value3: g, value4: g + 0.5 }); //1:line,2:duongG,3:focus,4:ket qua
                    for (let i = 0; i < arr.length; i++) {
                        //data.push({ date1: new Date(arr[i].x * 1000), value1: arr[i].y });
                    }
                }
                //  chart.data = data;
            }
        });
        series.events.on("validated", function() {
            bullet.moveTo(series.dataItems.last.point);
            bullet.validatePosition();
        });
        start_socket();
    }

    chart.data = data;
    console.log(chart.data);
    chart.background.fill = 'rgb(0,0,0)'
    chart.background.opacity = 0.5


    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 30;
    dateAxis.dateFormats.setKey("second", "ss");
    dateAxis.periodChangeDateFormats.setKey("second", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("minute", "[bold]h:mm a");
    dateAxis.periodChangeDateFormats.setKey("hour", "[bold]h:mm a");
    dateAxis.renderer.inside = true;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.interpolationDuration = 100;
    valueAxis.rangeChangeDuration = 100;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.minLabelPosition = 0.05;
    valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis.renderer.axisFills.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;



    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date1";
    series.dataFields.valueY = "value1";
    series.interpolationDuration = 500;
    series.defaultState.transitionDuration = 0;
    series.tensionX = 0.8;
    series.showOnInit = false;


    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.dateX = "date2";
    series2.strokeWidth = 0.5;
    series2.stroke = series.stroke;
    series2.stroke = am4core.color("#FFFFFF");


    var series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = "value3";
    series3.dataFields.dateX = "date2";
    series3.strokeWidth = 0.3;
    series3.stroke = series.stroke;

    var series4 = chart.series.push(new am4charts.LineSeries());
    series4.dataFields.valueY = "value4";
    series4.dataFields.dateX = "date3";
    series4.strokeWidth = 0.5;
    series4.stroke = series.stroke;
    series4.stroke = am4core.color("#EC5565");
    var x = 6;





    chart.scrollbarX = new am4core.Scrollbar();


    // 0


    dateAxis.interpolationDuration = 500;
    dateAxis.rangeChangeDuration = 500;



    // add data
    var interval;
    var flag_update = 0;
    // interval = setInterval(function() {
    //     x = 6;
    //     var lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
    //     g = lastdataItem.valueY;
    //     // var datefinal = new Date().setSeconds(10);
    //     for (let i = 0; i < 2; i++) {
    //         series2.dataItems.getIndex(i).valueY = lastdataItem.valueY;
    //     }
    //     let d2 = new Date(new Date().getTime() + 21000);
    //     let d3 = new Date(new Date().getTime() + 7000);
    //     let val_ser4 = series.dataItem.lastdataItem
    //     series2.dataItems.getIndex(1).dateX = d2 // duong G, cho điểm cuối dài thêm 60s

    //     series3.dataItems.getIndex(1).dateX = d3 // duong focus, cho điểm cuối dài thêm 60s

    //     series4.dataItems.getIndex(0).dateX = d3 // di dời đường final đi 60s
    //     series4.dataItems.getIndex(1).dateX = d3
    //     series4.dataItems.getIndex(0).valueY = lastdataItem.valueY - 15
    //     series4.dataItems.getIndex(1).valueY = lastdataItem.valueY + 15

    // }, 7000); // ham ay de reset lai dien G, diem G la diem de xem biet win hay thua

    // function startInterval() {
    //     interval = setInterval(function() {
    //         var lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
    //         //if (flag_update == 3) {
    //         visits = visits + Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
    //         chart.addData({ date1: new Date(new Date().getTime() + 1000), value1: visits },
    //             0
    //         );
    //         var label_final = series4.bullets.push(new am4charts.LabelBullet()); //value cột final
    //         label_final.label.text = x--;
    //         label_final.label.fontSize = 20;
    //         label_final.label.background.fill = am4core.color("#eee");

    //         for (let i = 0; i < 2; i++) {
    //             series3.dataItems.getIndex(i).valueY = visits;
    //         }
    //         if (visits < g)
    //             series3.stroke = am4core.color("#EC5565"); //red
    //         else
    //             series3.stroke = am4core.color("#2C6E49"); //green

    //         flag_update = 0;
    //         // } else {
    //         //     lastdataItem.valueY = visits + Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
    //         //     flag_update++;
    //         //     for (let i = 0; i < 2; i++) {
    //         //         series3.dataItems.getIndex(i).valueY = lastdataItem.valueY;
    //         //     }
    //         //     if (lastdataItem.valueY < g)
    //         //         series3.stroke = am4core.color("#EC5565"); //red
    //         //     else
    //         //         series3.stroke = am4core.color("#2C6E49"); //blue
    //         // }

    //     }, 1000);
    // }
    //startInterval();

    io.on('block-trading', async function(res) {

    });
    io.on('unlock-trading', async function(res) {

    });

    function start_socket() {
        io.on('coordinates_real', async function(res) {
            data = JSON.parse(res);
            console.log(new Date(data.x * 1000));
            //var lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
            // if (flag_update == 3) {

            chart.addData({ date1: new Date(data.x * 1000), value1: data.y },
                0
            );
            // var label_final = series4.bullets.push(new am4charts.LabelBullet()); //value cột final
            // label_final.label.text = x--;
            // label_final.label.fontSize = 20;
            // label_final.label.background.fill = am4core.color("#eee");

            // for (let i = 0; i < 2; i++) {
            //     series3.dataItems.getIndex(i).valueY = data.y;
            // }
            // if (data.y < data.g)
            //     series3.stroke = am4core.color("#EC5565"); //red
            // else
            //     series3.stroke = am4core.color("#2C6E49"); //green

            flag_update = 0;
            // } else {
            //     lastdataItem.valueY = data.y;
            //     flag_update++;
            //     for (let i = 0; i < 2; i++) {
            //         series3.dataItems.getIndex(i).valueY = lastdataItem.valueY;
            //     }
            //     if (lastdataItem.valueY < g)
            //         series3.stroke = am4core.color("#EC5565"); //red
            //     else
            //         series3.stroke = am4core.color("#2C6E49"); //blue
            // }
        })
    }
    get_data();



    // all the below is optional, makes some fancy effects
    // gradient fill of the series
    series.fillOpacity = 1;
    var gradient = new am4core.LinearGradient();
    gradient.addColor(chart.colors.getIndex(0), 0.2);
    gradient.addColor(chart.colors.getIndex(0), 0);
    series.fill = gradient;

    // this makes date axis labels to fade out
    dateAxis.renderer.labels.template.adapter.add("fillOpacity", function(fillOpacity, target) {
        var dataItem = target.dataItem;
        return dataItem.position;
    })

    // need to set this, otherwise fillOpacity is not changed and not set
    dateAxis.events.on("validated", function() {
        am4core.iter.each(dateAxis.renderer.labels.iterator(), function(label) {
            label.fillOpacity = label.fillOpacity;
        })
    })

    // this makes date axis labels which are at equal minutes to be rotated
    dateAxis.renderer.labels.template.adapter.add("rotation", function(rotation, target) {
        var dataItem = target.dataItem;
        if (dataItem.date && dataItem.date.getTime() == am4core.time.round(new Date(dataItem.date.getTime()), "minute").getTime()) {
            target.verticalCenter = "middle";
            target.horizontalCenter = "left";
            return -90;
        } else {
            target.verticalCenter = "bottom";
            target.horizontalCenter = "middle";
            return 0;
        }
    })
    dateAxis.events.on("startchanged", dateAxisChanged);
    dateAxis.events.on("endchanged", dateAxisChanged);

    function dateAxisChanged(ev) {
        //console.log("DateAxis zoomed!");
    }
    // bullet at the front of the line
    var bullet = series.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 5;
    bullet.fillOpacity = 1;
    bullet.fill = chart.colors.getIndex(0);
    bullet.isMeasured = false;




    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineY.stroke = am4core.color("#8F3985");
    chart.cursor.lineY.strokeWidth = 5;
    chart.cursor.lineY.strokeOpacity = 0.2;
    chart.cursor.lineY.strokeDasharray = "";

    chart.cursor.lineX.stroke = am4core.color("#8F3985");
    chart.cursor.lineX.strokeWidth = 5;
    chart.cursor.lineX.strokeOpacity = 0.2;
    chart.cursor.lineX.strokeDasharray = "";


});