@extends('admin.dashboard')
@section('admin_content')
   <body>
    {{-- <?php $idbussin = Auth::user()->id_business;
    ?> --}}
    <div style="clear: both; height: 61px;"></div>
    <div class="wrapper wrapper-content animated fadeInRight">

         <meta name="csrf-token-detail-order" content="{{ csrf_token() }}" />
         <meta name="csrf-token-show-order" content="{{ csrf_token() }}" />
        <meta name="csrf-token-show-order-type" content="{{ csrf_token() }}" />
        <meta name="csrf-token-product-detail" content="{{ csrf_token() }}" />
         <div class="row">
            <div class="col-sm-12">
               <div class="inqbox">
                  <div class="inqbox-content">
                           <span class="text-muted small pull-right"><i class="fa fa-clock-o"></i></span>
                           <h2>Yêu cầu nạp tiền</h2>
                           <div class="input-group">
                            <input type="text" placeholder="Nhập tên khách hàng, mã lệnh" id="key_seach_code" value="" class="input form-control">
                            <span class="input-group-btn">
                            <button type="button" class="btn btn btn-primary" onclick="seach_code_deal()"> <i class="fa fa-search"></i>Tìm kiếm</button>
                            </span>
                         </div>
                           <div class="clients-list">
                              <ul class="nav nav-tabs tab-border-top-danger">
                                    <li class="active"><a data-toggle="tab" href="#tab-account"><i class="fa fa-user"></i>Tạo lệnh</a></li>
                                    <li class="active"> <button type="button" onclick="clear_data()" name="x" id="x" data-toggle="modal" data-target="#add_load_money" class="btn btn-warning">+</button></li>
                                  <div class="form-group col-md-2" id="start_date">

                                    <label for="inputState">ngày bắt đầu</label>
                                    <input type="date"  id="ngaybatdau" onchange="seach_order()">

                                  </div>

                                  <div class="form-group col-md-2" id="end_date">
                                    <label for="inputState"> ngày kết thúc</label>
                                    <input type="date" id="ngayketthuc" onchange="seach_order()">
                                  </div>

                              </ul>

                              <div class="tab-content" >

                                 <div id="tab-account" class="tab-pane active" >
                                    <div class="full-height-scroll">
                                       <div class="table-responsive">
                                          <table class="table table-striped table-hover">
                                            <td>STT</td>
                                            <td>Mã lệnh</td>
                                            <td>Tên</td>
                                            <td>Nạp tiền</td>
                                            <td>Ngày tháng</td>
                                             <tbody id="content-order">
                                                 <tr>
                                                    <td>1</td>
                                                    <td>KSE01201548</td>

                                                    <td>Nguyen Van A</td>
                                                    <td style="color: green">4500000</td>
                                                    <td>20:48 25/12/2021</td>
                                                 </tr>
                                                 <tr>
                                                    <td>1</td>
                                                    <td>KSE01201548</td>

                                                    <td>Nguyen Van Aaaaaaaaaaa</td>
                                                    <td style="color: green">4500000</td>
                                                    <td>20:48 25/12/2021</td>
                                                 </tr>
                                             </tbody>
                                          </table>
                                          <nav aria-label="Page navigation example">
                                            <ul class="pagination" id="content_phantrang">
                                              <li class="page-item"><a class="page-link" onclick="back_phantrang()" ><<</a></li>
                                              <li class="page-item"><a class="page-link" onclick="phantrang(1)" href="#">1</a></li>
                                              <li class="page-item"><a class="page-link" onclick="phantrang(2)" href="#">2</a></li>
                                              <li class="page-item"><a class="page-link" onclick="phantrang(3)" href="#">3</a></li>
                                              <li class="page-item"><a class="page-link" onclick="phantrang(4)" href="#">4</a></li>
                                              <li class="page-item"><a class="page-link" onclick="phantrang(5)" href="#">5</a></li>
                                              <li class="page-item"><a class="page-link" onclick="next_phantrang()" id="next_trang" >>></a></li>
                                            </ul>
                                          </nav>

                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                  </div>
               </div>

            </div>
            <meta name="csrf-token-cancel-order" content="{{ csrf_token() }}" />

         </div>
    </div>
    <div id="add_load_money" class="modal fade">
        <div class="modal-dialog">
         <div class="modal-content">
          <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal">&times;</button>
           <h4 class="modal-title">Cập nhật sàn</h4>
          </div>
          <div class="modal-body">
            <meta name="csrf-token-insert" content="{{ csrf_token() }}" />
            <form method="post" id="insert_account_form">
                <label>Tên khách hàng (<font style="color: red">*</font>)</label>
                <input type="text" name="account_username" id="username" class="form-control" />
                <small id="erusername" class="text-danger"></small>
                <br />
                <label>Số tiền nạp (VND) (<font style="color: red">*</font>)</label>
                <input type="number" name="account_username" id="username" class="form-control" />
                <small id="erusername" class="text-danger"></small>
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
    {{-- <script src="{{ asset('backend/js/main/admin_order.js') }}"></script> --}}
@endsection
