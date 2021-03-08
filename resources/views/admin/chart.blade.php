
 @extends('admin.dashboard_chart')
 @section('js')
    <script src="{{ asset('backend/js/socket.js') }}"></script>
    <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
    <script src="//cdn.amcharts.com/lib/4/plugins/rangeSelector.js"></script>


{{-- <script src="https://cdn.jsdelivr.net/npm/hammerjs@2.0.8"></script> --}}
{{-- <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@0.7.7"></script> --}}
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
<script src="{{ asset('backend/js/main/admin_local.js') }}"></script>
<script src="{{ asset('backend/js/main/admin_chart.js') }}"></script>
<script src="{{ asset('backend/js/main/admin_trading.js') }}"></script>
 @endsection
 @section('chart_content')
 <style>
     .lich_su_phien tr td:nth-child(2){
        align-content: flex-end;

    }
    .lich_su_phien{
        border-collapse:separate;
    border-spacing: 0 20px;

    }
    .scrollbox {
  width: 10em;
  height: 10em;
  overflow: auto;
  visibility: hidden;
}

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
                        <button type="button" class="btn btn-secondary">Lịch sử phiên</button>
                        <br />
                        <br />
                        <table style="background-color:#2A2B30;width: 100%;
                                         height: 60px;border-radius: 4%;">
                            <tr>
                                 <td>Số tiền cược</td>
                            </tr>
                            <tr>
                                 <td><input type="number" style="height: 40px ; width: 100%;" placeholder="0,000 VND"></td>
                          </tr>
                        </table>
                      </div>
                      <br />
                      <div class="tab-content" id="detail-account">
                         <button type="button" id="tradetop" onclick="trade('top')" style="height: 50px ; width: 100%;" class="btn btn-success">Lên</button>
                         <br />
                         <br />
                        <button style="background-color: slategrey; float: inherit;"><img height="20px" width="20px" src="{{ asset('images/clock.png') }}" alt=""></button>
                         <br />
                         <button type="button" id="tradebot" onclick="trade('bot')" style="height: 50px ; width: 100%;" class="btn btn-danger">Xuống</button>
                      </div>

                   </div>
                   <div id="lsphien_thaotacphien">
                    <h3>Lịch sử phiên</h3>
                    <div style="width: 100%;height: 250px;overflow-y: scroll;">

                        <table class="lich_su_phien"  cellspacing= "10">
                            <tr>
                                <td>15/02/2020 - 20:07</td>
                                <td><img src="{{ asset('images/len.png') }}" width="30px" height="30px" alt=""></td>
                            </tr>
                            <tr>
                                <td>15/02/2020 - 20:07</td>
                                <td><img src="{{ asset('images/xuong1.png') }}" width="30px" height="30px" alt=""></td>
                            </tr>
                            <tr>
                                <td>15/02/2020 - 20:07</td>
                                <td><img src="{{ asset('images/xuong1.png') }}" width="30px" height="30px" alt=""></td>
                            </tr>
                            <tr>
                                <td>15/02/2020 - 20:07</td>
                                <td><img src="{{ asset('images/xuong1.png') }}" width="30px" height="30px" alt=""></td>
                            </tr>
                            <tr>
                                <td>15/02/2020 - 20:07</td>
                                <td><img src="{{ asset('images/xuong1.png') }}" width="30px" height="30px" alt=""></td>
                            </tr>
                            <tr>
                                <td>15/02/2020 - 20:07</td>
                                <td><img src="{{ asset('images/xuong1.png') }}" width="30px" height="30px" alt=""></td>
                            </tr>
                            <tr>
                                <td>15/02/2020 - 20:07</td>
                                <td><img src="{{ asset('images/xuong1.png') }}" width="30px" height="30px" alt=""></td>
                            </tr>

                        </table>
                       </div>
                   </div>


                </div>
             </div>
         </div>

    </div>


    </body>




  {{-- <script src="{{ asset('backend/js/socket.js') }}"></script> --}}
  {{-- <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
  <script src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js"></script> --}}


@endsection
