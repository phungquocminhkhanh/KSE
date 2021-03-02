
 <link href="{{ asset('backend/css/bootstrap.min.css') }}" rel="stylesheet">
 <link href="{{ asset('backend/fonts/font-awesome/css/font-awesome.css')}}" rel="stylesheet">
 <!-- Toastr style -->
 <link href="{{ asset('backend/css/plugins/toastr/toastr.min.css')}}" rel="stylesheet">
 <!-- Gritter -->
 <link href="{{ asset('backend/js/plugins/gritter/jquery.gritter.css')}}" rel="stylesheet">
 <!-- morris -->
 <link href="{{ asset('backend/css/plugins/morris/morris-0.4.3.min.css')}}" rel="stylesheet">
 <link href="{{ asset('backend/css/animate.css')}}" rel="stylesheet">
 <link href="{{ asset('backend/css/style.css')}}" rel="stylesheet">
 <link href="{{ asset('backend/css/forms/kforms.css')}}" rel="stylesheet">
<body>

    <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
            <div class="col-sm-12" style="background-color: red;height: 50px;">
            </div>
        </div>
         <div class="row" style="background-color:#3F4044 ">
            <div class="col-sm-10">
               <div class="inqbox">
                  <div class="inqbox-content">
                           <span class="text-muted small pull-right"><i class="fa fa-clock-o"></i></span>
                           <h2>KSE</h2>

                           <div class="clients-list">
                              <div class="tab-content" >

                                 <div id="tab-account" class="tab-pane active" >

                                       <div class="table-responsive">
                                        <div id="chartContainer" style="width:100%; height:500px;"></div>
                                       </div>

                                 </div>
                              </div>
                           </div>
                  </div>
               </div>
            </div>
            <div class="col-sm-2">
               <div class="inqbox " style="background-color: #3F4044;height:500px;">
                  <div class="inqbox-content" style="background-color: #3F4044;">
                    <div class="tab-content" style="background-color: #3F4044">
                       <table style="background-color:#909090;width: 100%;
                                        height: 60px;border-radius: 4%;
                                        ">
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
                       <table style="background-color:#909090;width: 100%;
                                        height: 60px;border-radius: 4%;
                                        ">
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
                        <button type="button" style="height: 60px ; width: 100%;" class="btn btn-success">Lên</button>
                        <br />
                        <button type="button" style="height: 60px ; width: 100%;" class="btn btn-danger">Xuống</button>
                     </div>

                  </div>
               </div>
            </div>
         </div>

    </div>


    </body>


  <script src="{{ asset('backend/js/socket.js') }}"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
  <script src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js"></script>
{{-- <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
<script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
<script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script> --}}
<script src="{{ asset('backend/js/main/admin_local.js') }}"></script>
<script src="{{ asset('backend/js/main/admin_chart2.js') }}"></script>

