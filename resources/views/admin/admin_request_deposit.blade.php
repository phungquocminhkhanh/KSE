@extends('admin.dashboard')
@section('admin_content')
<style>
    .detai_deal{
        width: 100%;
        cel
    }
    .detai_deal tr>td:nth-child(2){
        text-align: right;
    }
    a:hover {
    background-color: yellow;
    }
    .menu {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
   }
   input[type="file"] {
    display: none;
   }
   .btn-confirm
   {
      padding:20px;
       text-align: right;
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
                           <span class="text-muted small pull-right"></span>
                           <h2></h2>
                           <div class="input-group">
                              <input type="text" placeholder="Nhập tên, Mã lệnh" onkeyup="search_request_deposit()" id="key_seach_deposit" class="input form-control">
                              <span class="input-group-btn">
                              
                              <button type="button" class="btn btn btn-primary" onclick="filter_payment()"> <i class="fa fa-filter"></i></button>
                              </span>
                           </div>
                           <div class="clients-list">
                              <div class="tab-content" >
                                 <div id="tab-account" class="tab-pane active" >
                                    <div class="full-height-scroll">
                                       <div class="table-responsive">
                                          <table class="table table-striped table-hover">
                                            <tr>
                                                <th>Họ và tên</th>
                                                <th>Mã lệnh</th>
                                                <th>Nạp tiền</th>
                                                <th>Ngày giao dịch</th>
                                                <th><center><a onClick="create_deposit()"><img src="{{asset ('backend/icon_trading/plus.svg')}}" ></a></center></th>
                                              
                                            </tr>
                                             <tbody id="content-deposit">
                                                <tr>
                                                    <td>Nguyễn Gia Hân</td>
                                                    <td>ML51622666</td>
                                                    <td>-300.0000.000 VND</td>
                                                    <td>24/05/2021 - 20:08</td>
                                                    
                                                    <td><button class="btn btn-info btn-sm" ><i class="fa fa-info"></i> Chi tiết</button></td>
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
            </div>
            <div class="col-sm-4">
                <div class="inqbox" id='detail_deposit' hidden>
                 <div class="inqbox-content">
                    <div id="contact-1" class="tab-pane active">
                        <center><h3><strong>Chi tiết yêu cầu giao dịch</strong></h3></center>
                   </div>
                    <div class="tab-content" id="content-order" style="width: 100%;height: 557px;overflow: auto;">
                    <table class="detai_deal">
                            <tr>
                                <td><p>Trạng thái:</p></td>
                                <td><p>Tạo lệnh</p></td>
                            </tr>
                            <tr>
                                <td><p>Họ & Tên:</p></td>
                                <td><p>Ng Gia Hân</p></td>
                            </tr>
                            <tr>
                                <td><p>Mã lệnh:</p></td>
                                <td><p>ML51622666</p></td>
                            </tr>
                            <tr>
                                <td><p>Thời gian:</p></td>
                                <td><p>05/05/2020 - 02:25</p></td>
                            </tr>
                            <tr>
                                <td><p>Hạn mức:</p></td>
                                <td><p>400.000.000 VND</p></td>
                            </tr>
                            <tr>
                                <td><p>Đã giao dịch:</p></td>
                                <td><p>40.000.000 VND</p></td>
                            </tr>
                            <tr> 
                                <td><p style="color:red">Rút tiền:</p></td>
                                <td><p style="color:red">40.000.000 VND</p></td>
                            </tr>
                        </table>
                         <hr>
                       
                   </div>
                    <button type="button" data-toggle="modal" data-target="#reason_refuse" class="btn btn-secondary btn-sm btn-block">Từ chối</button>
                    <button class="btn btn-danger btn-sm btn-block"> Xác nhận</button>
                </div>
             </div>
         </div>
{{-----  dialog filter request payment  --}}
            <dialog id="filter_deposit1">
            <form method="dialog">
                <p><label>Thời gian bắt đầu:</label></p>
                <input type="Date" class="form-control" id="start_time_request"> 
                <p><label>Thời gian kết thúc:</label></p>
                <input type="Date" class="form-control" id="finish_time_request"> 
                <center><menu class="menu">
                <button class="btn btn-secondary">Hủy </button>
                <button class="btn btn-danger" onClick="filter_request_deposit()">Tìm kiếm</button>
                </menu></center>
            </form>
            </dialog>
         {{-- ---------------------------  --}}
{{--  Model_detail_customer  --}}
        <div id="request_deposit" class="modal fade">
            <div class="modal-dialog">
             <div class="modal-content">
              <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal">&times;</button>
               <center><h2 class="modal-title"style="color:black"><strong>Chọn: </strong></h2></center>
              </div>
              <div class="modal-body">
        <input type="text" width="35px" placeholder="Tên khách hàng, số tk, sdt" onkeyup="search_customer()" id="id_customer_search" class="form-control">
               <form id="form_request_deposit">
                {{ csrf_field() }}

                <div class="tab-content" id="content-order" style="width: 100%;height: 300px;overflow: auto;">
                <table class="table table-striped table-hover">
                    <tr>
                        <th>Họ và tên</th>
                        <th>Số điện thoại</th>
                        <th>Số tài khoản</th>
                        <th style="20px"></th>
                    </tr>
                        <tbody id="list_customer">
                        
                        {{--  <tr>
                            <td>Nguyễn Gia Hân</td>
                            <td>ML51622666</td>
                            <td>-300.0000.000 VND</td>
                            <td>24/05/2021 - 20:08</td>
                        </tr>  --}}
                        
                        </tbody>
                    </table>
                </div>
               </form>
                <div class="btn-confirm">
                <input type="button" onClick="choose_customer()" value="Ok" class="btn btn-danger btn-sm" /></div>
              <div class="modal-footer">
              </div>
             
              </div>
             </div>
            </div>
           </div>
{{--  -------------------------------------------------------------  --}}

    </div>
    </body>
    <script src="{{ asset('backend/js/jquery-3.5.0.min.js') }}"></script>
    <script src="{{ asset('backend/js/main/admin_local.js') }}"></script>
    <script src="{{ asset('backend/js/admin_han/admin_request_deposit.js') }}"></script>
@endsection
