@extends('admin.dashboard')
@section('admin_content')
<style>
    .detail_cus{
        width: 100%;
        height: 60px;border-radius: 4%
    }
    .detail_cus td:nth-child(1),.detail_cus td:nth-child(3){
        background-color:#FFE4E1;
        width: 45%  ;
        text-align: center;
    }
    .example1 {
        border: 2px solid green;
        border-radius: 10px 10px 10px 10px;
        background-color: #1F2933;
        color: white;
        width: 80%;
        height: 100%;
        padding: 17px;
        text-align: center;
   }
   .example2 {
        border: 2px solid red;
        border-radius: 10px 10px 10px 10px;
        background-color: #1F2933;
        color: white;
        width: 80%;
        height: 100%;
        padding: 17px;
        text-align: center;
   }
   .now_session{
        margin-left: 10%;
        margin-right: 10%;
       // background-color: #1F2933;
   }
</style>
   <body>
    {{-- <?php $idbussin = Auth::user()->id_business;
    ?> --}}
    <div style="clear: both; height: 61px;"></div>
    <div class="wrapper wrapper-content animated fadeInRight">

         <div class="row">
            <div class="col-sm-8">
               <div class="inqbox">
                  <div class="inqbox-content">
                           <span class="text-muted small pull-right"><i class="fa fa-clock-o"></i></span>
                           <h2></h2>
                           <div class="input-group">
                              <input type="text" placeholder="Nhập tên, số điện thoại, email, mã khách hàng" id="key_seach" value="" class="input form-control">
                              <span class="input-group-btn">
                              <button type="button" class="btn btn btn-primary" onclick="seach_customer()"> <i class="fa fa-search"></i>Tìm kiếm</button>
                              </span>
                           </div>
                           <div class="clients-list">
                            <ul class="nav nav-tabs tab-border-top-danger">
                                <li class="active"><a data-toggle="tab" href="#tab-account"><i class="fa fa-user"></i>Sàn giao dịch</a></li>
                            
                             </ul>
                              <div class="tab-content" >

                                 <div id="tab-account" class="tab-pane active" >
                                    <div class="full-height-scroll">
                                       <div class="table-responsive">
                                          <table class="table table-striped table-hover">
                                            <tr>
                                                <th style="width:20px"></th>
                                                <th>Thời gian bắt đầu</th>
                                                <th>Thời gian kết thúc</th>
                                                <th>Thời gian 1 phiên</th>
                                                <th>Tổng phiên</th>
                                                <th>Bảo trì</th>
                                             
                                                 
                                            </tr>
                                             <tbody id="content_session">
                                                {{--  <tr>
                                                    <th style="width:20px"></th>
                                                    <td>4/05/2021</td>
                                                    <td>24/05/2021</td>
                                                    <td>4/05/2021</td>
                                                    <td>12312</td>
                                                    <th style="width:20px"></th>
                                                </tr>  --}}
                                             </tbody>
                                          </table>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                  </div>
               </div>
            </div>
            <input type="text" hidden value="1" id="id_account">
            <div class="col-sm-4">
                <div class="inqbox ">
                   <div class="inqbox-content"><div id='content_detail_customer'>
                    <div id="contact-1" class="tab-pane active">
                    
                    <label>Thời gian bắt đầu (<font style="color: red">*</font>)</label>
                    <input type="text" id="myDate1" class="form-control" readonly style="width:50%">
                    <input type="time" onchange="check_text()" id="start_time" style="width:50%" class="form-control">
                    <small id="message_start" class="text-danger"></small>
                    <br />
                    <label>Thời gian kết thúc (<font style="color: red">*</font>)</label>
                    <input type="text" id="myDate2" class="form-control" readonly style="width:50%">
                    <input type="time" onchange="check_text()" id="finish_time" style="width:50%" class="form-control">
                    <small id="message_finish" class="text-danger"></small>
                    <br />
                    <label>Thời gian 1 phiên (phút) (<font style="color: red">*</font>)</label>
                    <input type="number" onchange="check_text()" id="session_time" style="width:20%" class="form-control" min="2">
                    <small id="message_session" class="text-danger"></small>
                    <br />
                    <label>Tổng phiên:</label>
                    <div  id="total_session" style="width:20%" class="form-control"></div>
                    <small id="message_session" class="text-danger"></small>
                    <br />
                    <div><button type="button" onclick="update_stock()" value="Cập nhật"  class="btn btn-danger btn-sm btn-block"  />Cập nhật</button></div>
                    <hr>
                   </div>
                    <div class="tab-content" id="content-order" style="width: 100%;height: 300px;overflow: auto; ">
                        <center><h3><label>Xem phiên hiện tại</label></h3></center>
                      <table class="now_session" style="width:100%">
                        <tbody >
                        <tr>
                            <td><p class="example1"> 20 &nbsp&nbsp<img src="{{asset ('backend/icon_trading/up.svg')}}" height="18px"></p></td> 
                            <td><p class="example1">600.000.00 </p></td>
                        </tr>
                        <tr>
                            <td><p class="example2"> 30 &nbsp&nbsp<img src="{{asset ('backend/icon_trading/down.svg')}}" height="18px"></p></td> 
                            <td><p class="example2">600.000.00 </p></td>
                        </tr>
                        </tbody>
                        </table>
                     </div>
                     
                   </div>
                </div>
             </div>
          </div>
    </div>
    
    
    </div>
    </body>

    <script src="{{ asset('backend/js/jquery-3.5.0.min.js') }}"></script>
    <script src="{{ asset('backend/js/main/admin_local.js') }}"></script>
    <script src="{{ asset('backend/js/admin_han/admin_exchange_management.js') }}"></script>
@endsection
