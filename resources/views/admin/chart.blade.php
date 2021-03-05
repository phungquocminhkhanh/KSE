
 @extends('admin.dashboard_chart')
 @section('js')
    <script src="{{ asset('backend/js/socket.js') }}"></script>
    <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
    <script src="//cdn.amcharts.com/lib/4/plugins/rangeSelector.js"></script>


{{-- <script src="https://cdn.jsdelivr.net/npm/hammerjs@2.0.8"></script> --}}
{{-- <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@0.7.7"></script> --}}
    <script src="{{ asset('backend/js/main/admin_local.js') }}"></script>
    <script src="{{ asset('backend/js/main/admin_chart.js') }}"></script>
 @endsection
 @section('chart_content')
 <style>
     canvas {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}


.chat-btn {
    position: absolute;
    right: 14px;
    bottom: 30px;
    cursor: pointer
}

.chat-btn .close {
    display: none
}

.chat-btn i {
    transition: all 0.9s ease
}

#check:checked~.chat-btn i {
    display: block;
    pointer-events: auto;
    transform: rotate(180deg)
}

#check:checked~.chat-btn .comment {
    display: none
}

.chat-btn i {
    font-size: 22px;
    color: #fff !important
}

.chat-btn {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background-color: blue;
    color: #fff;
    font-size: 22px;
    border: none
}
.chat-form {
    padding: 15px
}
.x {
    position: absolute;
    right: 20px;
    bottom: 100px;
    width: 300px;
    background-color: #fff;
    border-radius: 5px;
    opacity: 0;
    transition: all 0.4s
}

#check:checked~.x {
    opacity: 1
}

.y {
    padding: 13px;
    background-color: blue;
    border-radius: 5px 5px 0px 0px;
    margin-bottom: 10px;
    color: #fff
}
.chat-form input,
textarea,
button {
    margin-bottom: 10px
}

.chat-form textarea {
    resize: none
}

.form-control:focus,
.btn:focus {
    box-shadow: none
}


#check {
    display: none !important
}
#selectordiv {
  width: 100%;
  height: 30px;
}
 </style>
<body>
    {{-- <?php $idbussin = Auth::user()->id_business;
    ?> --}}
    <div style="clear: both; height: 61px;"></div>
    <div class="wrapper wrapper-content animated fadeInRight" >

         <div class="row" style="background-color: #2A2B30">

            <div class="col-sm-10">
                <div id="chartdiv" style="width: 100%;height: 570px;"></div>
                <div id="selectordiv"></div>
            </div>
            <div class="col-sm-2">
                <div class="inqbox " style="background-color: #2A2B30;height:500px;">
                   <div class="inqbox-content" style="background-color: #2A2B30;">
                     <div class="tab-content" style="background-color: #">
                        <table style="background-color:#2A2B30;width: 100%;
                                         height: 60px;border-radius: 4%;
                                         color: cornsilk">
                            <tr>
                                 <td>Số tiền</td>
                                 <td>+</td>
                            </tr>
                            <tr>
                                 <td>đ 152000</td>
                                 <td>-</td>
                          </tr>
                        </table>
                        <br />
                        <table style="background-color:#2A2B30;width: 100%;
                                         height: 60px;border-radius: 4%;
                                         color: cornsilk"">
                            <tr>
                                 <td>Số tiền</td>
                                 <td>+</td>
                            </tr>
                            <tr>
                                 <td>đ 152000</td>
                                 <td>-</td>
                          </tr>
                        </table>
                      </div>
                      <br />
                      <div class="tab-content" id="detail-account">
                         <button type="button" id="updatec" onclick="trade('top')" style="height: 60px ; width: 100%;" class="btn btn-success">Lên</button>
                         <br />
                         <button type="button" onclick="trade('bot')" style="height: 60px ; width: 100%;" class="btn btn-danger">Xuống</button>
                      </div>

                   </div>
                </div>
             </div>
         </div>

    </div>
    <input type="checkbox" id="check"> <label class="chat-btn" for="check"> <i class="fa fa-commenting-o comment"></i> <i class="fa fa-close close"></i> </label>
    <div class="x">
        <div class="y">
            <h6>Tổng đài hổ trợ</h6>
        </div>
        <div class="text-center p-2"> <span>Điền nội dung cần hổ trợ</span> </div>
        <div class="chat-form"> <input type="text" class="form-control" placeholder="Name"> <input type="text" class="form-control" placeholder="Email"> <textarea class="form-control" placeholder="Your Text Message"></textarea> <button class="btn btn-success btn-block">Submit</button> </div>
    </div>


    </body>




  {{-- <script src="{{ asset('backend/js/socket.js') }}"></script> --}}
  {{-- <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
  <script src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js"></script> --}}


@endsection
