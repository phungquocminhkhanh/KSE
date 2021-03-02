window.io = io(urlsocket, { transport: ['websocket'] });
var arr = [];
io.on('block-tradeing', data => {
    if (data.notification)
        console.log('block')
    else
        console.log('open')
});
var x = 0;
window.addEventListener('online', () => {
    window.location.replace("../chart2");
});
window.addEventListener('offline', () => console.log('came offline'));
$(document).ready(function() {
    $.ajax({
        type: "post",
        url: urlapi,
        data: { detect: 'get_coordinate' },
        dataType: "json",
        success: function(response) {
            if (response.success == "false") {

            } else {
                arr = JSON.parse(response.data[response.data.length - 1].coordinate_xy)
            }
        }
    });
});
setTimeout(function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    var list_point = [];
    var chart = new Chart(ctx, {
        animationEnabled: true,
        animationDuration: 10000,
        data: {
            type: "line",
            datasets: [{
                yAxisID: 'A',
                label: 'Temperature',
                type: 'line',
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                data: arr,
            }]
        },
        options: {
            animation: {
                duration: 500 * 1.5,
                easing: 'linear'
            },
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Zoom each scale separately'
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    offset: true,
                    scaleLabel: { display: true, labelString: 'x axis' }
                }],
                yAxes: [{
                    id: 'A',
                    offset: true,
                    position: 'left',
                    scaleLabel: { display: true, labelString: 'Analog' }
                }, {
                    id: 'B',
                    position: 'right',
                    scaleLabel: { display: true, labelString: 'Digital' },
                    ticks: { max: 2, min: -1, stepSize: 1 }
                }]
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy',
                        overScaleMode: 'y'
                    },
                    zoom: {
                        enabled: true,
                        mode: 'xy',
                        overScaleMode: 'y'
                    }
                }
            }
        }
    });
    io.on('toa-do', data => {
        //  if (x = 3) {
        //      chart.data.datasets[0].data.push({ x: data.x, y: data.y, markerSize: 1 })
        //      chart.update();
        //      x = 0;
        //  } else {
        //      console.log(chart.data.datasets[0].data.lenght - 1)
        //          //  chart.data.datasets[0].data[].y = data.x;
        //          //  chart.update();
        //          //  x++;
        //  }
        chart.data.datasets[0].data.push({ x: data.x, y: data.y, markerSize: 1 })
        chart.update();
        //chart.data.datasets[1].data[1].x = data.x + 10;

    });
}, 5000);
