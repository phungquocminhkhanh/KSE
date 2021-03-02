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
                              <div class="tab-content" >

                                 <div id="tab-account" class="tab-pane active" >
                                    <div class="full-height-scroll">
                                       <div class="table-responsive">
                                          <table class="table table-striped table-hover">
                                            <tr>
                                                <td><a data-toggle="tab" class="client-link">Tên</a></td>
                                                <td>Số điện thoại</td>
                                                <td>Mã lệnh</td>
                                                <td>Ngày giao dịch</td>
                                            </tr>
                                             <tbody id="content-customer">
                                                <tr>
                                                    <td><a data-toggle="tab" class="client-link">Nguyen Van A</a></td>
                                                    <td>0336819000</td>
                                                    <td>ML52503346</td>
                                                    <td>24/05/2021</td>
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
    </body>
    <script src="{{ asset('backend/js/jquery-3.5.0.min.js') }}"></script>
    <script src="{{ asset('backend/js/main/admin_local.js') }}"></script>
    <script src="{{ asset('backend/js/main/admin_help_deal.js') }}"></script>
@endsection
