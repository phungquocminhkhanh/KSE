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
                                <li class="active"> <button type="button" onclick="clear_data()" name="x" id="x" data-toggle="modal" data-target="#add_deal_Modal" class="btn btn-warning">+</button></li>
                             </ul>
                              <div class="tab-content" >

                                 <div id="tab-account" class="tab-pane active" >
                                    <div class="full-height-scroll">
                                       <div class="table-responsive">
                                          <table class="table table-striped table-hover">
                                            <tr>
                                                <td>Thời gian bắt đầu</td>
                                                <td>Thời gian kết thúc</td>
                                                <td>Thời gian mỗi phiên</td>
                                                <td>Tổng phiên</td>
                                            </tr>
                                             <tbody id="content-customer">
                                                <tr>
                                                    <td>4/05/2021</td>
                                                    <td>24/05/2021</td>
                                                    <td>4/05/2021</td>
                                                    <td>100</td>
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
                <div class="inqbox ">
                   <div class="inqbox-content"><div id='content_detail_customer'>
                    <div id="contact-1" class="tab-pane active">
                        <h4>Nguyễn Van a</h4>
                        <h5>Số điện thoại: 0336819000</h5>
                        <h5>Giao dịch gần nhất: 05/02/2021</h5>
                        <hr>
                        <h4>Danh sách giao dịch</h4>
                              <table class="detail_cus">
                                <tr>
                                    <td>Tổng giao dịch</br>80</td>
                                    <td></td>
                                    <td>Tỉ lệ %</br>78</td>
                                </tr>
                            </table>
                            <h4></h4>
                            <input type="date" style="height :30px ;width:45% ;" id="ngaybatdau" onchange="seach_order()"> >>
                            <input type="date" style="height :30px ;width:45% ;" id="ngayketthuc" onchange="seach_order()">
                            <hr>
                   </div>
                    <div class="tab-content" id="content-order" style="width: 100%;height: 400px;overflow: auto;">
                        <table>
                            <tr>
                                <td>15/03/2001 20:21</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Số tiền</td>
                                <td>+450,000,000</td>
                            </tr>
                        </table>
                        <hr>
                        <table>
                            <tr>
                                <td>15/03/2001 20:21</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Số tiền</td>
                                <td>+450,000,000</td>
                            </tr>
                        </table>
                      </div>
                   </div>
                </div>
             </div>
          </div>


    </div>

    <div id="add_deal_Modal" class="modal fade">
        <div class="modal-dialog">
         <div class="modal-content">
          <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal">&times;</button>
           <h4 class="modal-title">Cập nhật sàn</h4>
          </div>
          <div class="modal-body">
            <meta name="csrf-token-insert" content="{{ csrf_token() }}" />
           <form method="post" id="insert_account_form">

            <label>Thời gian bắt đầu (<font style="color: red">*</font>)</label>
            <input type="datetime-local" id="exchange_open" class="form-control">
            <small id="erusername" class="text-danger"></small>
            <br />
            <br />
            <label>Thời gian kết thúc (<font style="color: red">*</font>)</label>
            <input type="datetime-local" id="exchange_close" class="form-control">
            <small id="erusername" class="text-danger"></small>
            <br />
            <br />
            <label>Thời gian mỗi phiên (<font style="color: red">*</font>)</label>
            <input type="number" id="exchange_period" min="5">phút
            <br />
            <br />
            <label>Tổng phiên</label>
            <input type="number" id="total_period">phút
            <br />
            <br />
            <input type="submit" name="insert" id="insert_account" value="Thêm" class="btn btn-success" />
           </form>
          </div>
          <div class="modal-footer">
           <button type="button" id="close_modol_insert" class="btn btn-default" data-dismiss="modal">Đóng</button>
          </div>
         </div>
        </div>
       </div>






    </body>

    <script src="{{ asset('backend/js/jquery-3.5.0.min.js') }}"></script>
    <script src="{{ asset('backend/js/main/admin_local.js') }}"></script>
    <script src="{{ asset('backend/js/main/admin_customer.js') }}"></script>
@endsection
