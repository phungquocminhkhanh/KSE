window.io = io(urlsocket, { transport: ['websocket'] });
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
    var visits = 22533;
    var visits2 = 22533;
    var i = 0;

    for (i = 0; i <= 30; i++) {
        visits -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
        data.push({ date: new Date().setSeconds(i - 30), value: visits });
    }

    // window.addEventListener('online', () => {
    //     $.ajax({
    //         type: "post",
    //         url: urlapi,
    //         data: { detect: 'get_coordinate' },
    //         dataType: "json",
    //         success: function(response) {
    //             if (response.success == 'false') {

    //             } else {
    //                 arr = JSON.parse(response.data[response.data.length - 1].coordinate_xy);
    //                 console.log(arr);
    //                 for (let i = 0; i < arr.length; i++) {
    //                     data.push({ date: new Date().setSeconds(i - 30), value: arr[i].y })
    //                 }
    //             }
    //             chart.data = data;

    //         }
    //     });
    // });
    // $.ajax({
    //     type: "post",
    //     url: urlapi,
    //     data: { detect: 'get_coordinate' },
    //     dataType: "json",
    //     success: function(response) {
    //         if (response.success == 'false') {

    //         } else {
    //             arr = JSON.parse(response.data[response.data.length - 1].coordinate_xy);
    //             console.log(arr);
    //             for (let i = 0; i < arr.length; i++) {
    //                 data.push({ date: new Date().setSeconds(i - 30), value: arr[i].y })
    //             }
    //         }
    //         chart.data = data;

    //     }
    // });
    chart.data = data
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
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.interpolationDuration = 500;
    series.defaultState.transitionDuration = 0;
    series.tensionX = 0.8;

    // var series2 = chart.series.push(new am4charts.LineSeries());
    // series2.dataFields.valueY = "value2";
    // series2.dataFields.dateX = "date2";
    // series2.strokeWidth = 2;
    // series2.strokeDasharray = "3,4";
    // series2.stroke = series.stroke;

    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);



    chart.events.on("datavalidated", function() {
        dateAxis.zoom({ start: 1 / 15, end: 2.0 }, true, true);
    });



    dateAxis.interpolationDuration = 500;
    dateAxis.rangeChangeDuration = 500;

    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            if (interval) {
                clearInterval(interval);

            }
        } else {
            startInterval();

        }
    }, false);

    // add data
    var interval;

    function startInterval() {
        interval = setInterval(function() {
            visits = visits + Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
            var lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
            chart.addData({ date: new Date(lastdataItem.dateX.getTime() + 1000), value: visits },
                1
            );

            // dateAxis.zoom({ start: 1 / 15, end: 2.0 }, false, true);
        }, 1000);
    }
    startInterval();

    // function startInterval() {
    //     io.on('toa-do', data => {
    //         var lastdataItem = series.dataItems.getIndex(series.dataItems.length - 1);
    //         chart.addData({ date: new Date(lastdataItem.dateX.getTime() + 1000), value: data.y },
    //             0
    //         );

    //         dateAxis.zoom({ start: 1 / 15, end: 2.0 }, false, true);
    //     });
    // }
    // setTimeout(function() {
    //     startInterval();
    // }, 3000)


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

    chart.cursor.events
    chart.cursor.events = series.events.on("validated", function() {
        bullet.moveTo(series.dataItems.last.point);
        bullet.validatePosition();


    });

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
