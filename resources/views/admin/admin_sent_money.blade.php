@extends('admin.dashboard')
@section('admin_content')
   <body>

    <div style="clear: both; height: 61px;"></div>
    <div class="wrapper wrapper-content animated fadeInRight">

         <meta name="csrf-token-detail-order" content="{{ csrf_token() }}" />
         <meta name="csrf-token-show-order" content="{{ csrf_token() }}" />
        <meta name="csrf-token-show-order-type" content="{{ csrf_token() }}" />
        <meta name="csrf-token-product-detail" content="{{ csrf_token() }}" />
         <div class="row">
            <div class="col-sm-8">
               <div class="inqbox">
                  <div class="inqbox-content">
                           <span class="text-muted small pull-right"><i class="fa fa-clock-o"></i></span>
                           <h2>Yêu cầu giao dịch</h2>
                           <div class="input-group">
                            <input type="text" placeholder="Nhập mã đơn hàng" id="key_seach_code" value="" class="input form-control">
                            <span class="input-group-btn">
                            <button type="button" class="btn btn btn-primary" onclick="seach_code_deal()"> <i class="fa fa-search"></i>Tìm kiếm</button>
                            </span>
                         </div>
                           <div class="clients-list">
                              <ul class="nav nav-tabs tab-border-top-danger">
                                <li class="active"><a onclick="show_deal_type('all')">All</a></li>
                                <li class="active"><a onclick="show_deal_type('eat-in')">Nạp tiền</a></li>
                                <li class="active"><a onclick="show_deal_type('carry-out')">Rút tiền</a></li>
                                <div class="form-group col-md-8">
                                    <label for="inputState">Trạng thái</label>
                                    <select id="inputStatee" class="form-control" onchange="seach_order()">
                                        <option selected value="0">Tất cả</option>
                                        <option value="1">Tạo lệnh</option>
                                        <option value="2">Chờ xác nhận</option>
                                        <option value="3">Hoàn tất</option>
                                        <option value="4">Hủy lệnh</option>
                                    </select>
                                  </div>
                                  <div class="form-group col-md-4" id="start_date">
                                    <label for="inputState">ngày bắt đầu</label>
                                    <input type="date"  id="ngaybatdau" onchange="seach_order()">

                                  </div>

                                  <div class="form-group col-md-4" id="end_date">
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
                                            <td>Trạng thái</td>
                                            <td>Tên</td>
                                            <td>Rút tiền</td>
                                            <td>Ngày tháng</td>
                                             <tbody id="content-order">
                                                 <tr>
                                                    <td>1</td>
                                                    <td>KSE01201548</td>
                                                    <td>Hoàn thành</td>
                                                    <td>Nguyen Van A</td>
                                                    <td style="color: red">4,500,000</td>
                                                    <td>20:48 25/12/2021</td>
                                                 </tr>
                                                 <tr>
                                                    <td>1</td>
                                                    <td>KSE01201548</td>
                                                    <td>Hoàn thành</td>
                                                    <td>Nguyen Van Aaaaaaaaaaa</td>
                                                    <td style="color: red">4,500,000</td>
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
         <div class="col-sm-4">
            <div class="inqbox ">
               <div class="inqbox-content">
                  <div class="tab-content" id="detail-account">

                  </div>
               </div>
            </div>
         </div>
    </div>


    </body>
    <script src="{{ asset('backend/js/jquery-3.5.0.min.js') }}"></script>
    {{-- <script src="{{ asset('backend/js/main/admin_order.js') }}"></script> --}}
@endsection
