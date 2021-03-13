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
                              <input type="text" placeholder="Nhập tên, Mã lệnh" onkeyup="search_request_payment()" id="key_seach" class="input form-control">
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
                                                <th>Rút tiền</th>
                                                <th>Ngày giao dịch</th>
                                                <th>Trạng thái</th>
                                                <th style="width:5%"></th>
                                            </tr>
                                             <tbody id="content-deal">
                                                <tr>
                                                    <td>Nguyễn Gia Hân</td>
                                                    <td>ML51622666</td>
                                                    <td>-300.0000.000 VND</td>
                                                    <td>24/05/2021 - 20:08</td>
                                                    <td>Tạo lệnh</td>
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
                <div class="inqbox" id='detail_deal' hidden>
                 <div class="inqbox-content">
                    <div id="contact-1" class="tab-pane active">
                        <center><h3><strong>Chi tiết lệnh rút tiền</strong></h3></center>
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
                       <center><h3><strong>Phương thức thanh toán</strong></h3></center>
                        <table class="detai_deal">
                            <tr>
                                <td><p>Tên ngân hàng:</p></td>
                                <td><p>Viettinbank</p></td>
                            </tr>
                            <tr>
                                <td><p>Tên chủ thẻ:</p></td>
                                <td><p>Ng Gia Hân</p></td>
                            </tr>
                            <tr>
                                <td><p>Số tài khoản:</p></td>
                                <td><p>ML51622666</p></td>
                            </tr>
                            <tr>
                                <td colspan="2"><p>Hình thẻ ngân hàng măt trước:</p></td>
                            </tr>
                            <tr>
                                <td colspan="2"><img src="{{asset ('backend/icon/cash in hand.svg')}}" height="120px" width="99%"></td>
                            </tr>
                            <tr>
                                <td colspan="2"><p>Hình cmnd mặt trước:</p></td>
                            </tr>
                            <tr>
                                <td colspan="2"><img src="{{asset ('backend/icon/cash in hand.svg')}}" height="120px" width="99%"></td>
                            </tr>
                            <tr>
                                <td style="height:20px"></td>
                            </tr>
                        </table>
                   </div>
                    <button type="button" data-toggle="modal" data-target="#reason_refuse" class="btn btn-secondary btn-sm btn-block">Từ chối</button>
                    <button class="btn btn-danger btn-sm btn-block"> Xác nhận</button>
                </div>
             </div>
         </div>
{{-----  dialog filter request payment  --}}
            <dialog id="filter_payment1">
            <form method="dialog">
                <p><label>Lọc trạng thái:</label></p>
                 <select class="form-control" id="status_payment">
                    <option>Trạng thái</option>
                    <option value=1>Tạo lệnh</option>
                    <option value=2>Chờ xác nhận</option>
                    <option value=3>Hoàn tất</option>
                    <option value=4>Hủy lệnh</option>
                </select>
                <p><label>Thời gian bắt đầu:</label></p>
                <input type="Date" class="form-control" id="start_time_request"> 
                <p><label>Thời gian kết thúc:</label></p>
                <input type="Date" class="form-control" id="finish_time_request"> 
                <center><menu class="menu">
                <button class="btn btn-secondary">Hủy </button>
                <button class="btn btn-danger" onClick="filter_request_payment()">Tìm kiếm</button>
                </menu></center>
            </form>
            </dialog>
         {{-- ---------------------------  --}}
{{--  Model_detail_customer  --}}
        <div id="reason_refuse" class="modal fade">
            <div class="modal-dialog">
             <div class="modal-content">
              <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal">&times;</button>
               <center><h2 class="modal-title"style="color:black"><strong>Lý do từ chối</strong></h2></center>
              </div>
              <div class="modal-body">
               <form id="id_reason_refuse">
                {{ csrf_field() }}
                <center><img src="{{asset ('backend/icon_trading/icons8_cheap_2_1 1.svg')}}"></center>
                <textarea rows="8" cols="73" placeholder="Lý do..." id="reason_cancel"></textarea>
                <div id="id_request_text"></div>
                <input type="button" onClick="cancel_money()" name="insert" id="insert_customer" value="Hoàn tất" class="btn btn-success btn-sm btn-block" />
               </form>
              </div>
              <div class="modal-footer">
              </div>
             </div>
            </div>
           </div>
{{--  -------------------------------------------------------------  --}}

    </div>
    </body>
    <script src="{{ asset('backend/js/jquery-3.5.0.min.js') }}"></script>
    <script src="{{ asset('backend/js/main/admin_local.js') }}"></script>
    <script src="{{ asset('backend/js/admin_han/admin_request_payment.js') }}"></script>
@endsection
