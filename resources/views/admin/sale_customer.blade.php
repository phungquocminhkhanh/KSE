@extends('admin.dashboard')
@section('admin_content')
<style>
    .detail_cus{
        width: 100%;
        height: 60px;border-radius: 4%
    }
    .detail_cus td:nth-child(1),.detail_cus td:nth-child(3){
        background-color:orange;
        width: 45%  ;
        text-align: center;
    }
    .detai_deal{
        width: 100%;
        cel
    }
    .detai_deal tr>td:nth-child(2){
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
                              <input type="text" onkeyup="search_sales()" placeholder="Nhập tên, số điện thoại, email, mã khách hàng" id="key_seach" class="input form-control">
                              <span class="input-group-btn">
                              <select id="type_sort" class="btn btn-primary" onChange="type_sort()"> 
                              <option value='0'>Lọc</option>
                              <option value='desc'>KH giao dịch nhiều</option>
                              <option value='asc'>KH giao dịch ít</option>
                              </select>
                              </span>
                           </div>
                           <div class="clients-list">
                              <div class="tab-content" >

                                 <div id="tab-account" class="tab-pane active" >
                                    <div class="full-height-scroll">
                                       <div class="table-responsive">
                                          <table  class="table table-striped table-hover">
                                           <tbody id="list_sales">
                                           <tr>
                                                <th>Hiện tại: </th>
                                                <th></th>
                                                <th></th>
                                                <th><i class="fa fa-user"> 12222</i></th>
                                            </tr>
                                            <tr>
                                                <th>Tên khách hàng</th>
                                                <th>Số điện thoại</th>
                                                <th> <a  class="client-link">Giao dịch gần nhất <i class="glyphicon glyphicon-sort"></i></a></th>
                                                <th>Tỉ lệ thắng</th>
                                            </tr>
                                            <tbody>
                                            <tbody id="content-customer">
                                            {{--  <tr>
                                                <td><a data-toggle="tab" class="client-link">Nguyen Van A</a></td>
                                                <td>0336819000</td>
                                                <td>24/05/2021</td>
                                                <td>80%</td>
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
            <div class="col-sm-4">
                <div class="inqbox">
                   <div class="inqbox-content">
                    <div id="contact-1" class="tab-pane active">
                    
                        {{--  <center><h3>Nguyễn Van A</h3></center>  --}}
                        <table class="detai_deal">
                            {{--  <tr>
                                <td><p>Số điện thoại:</p></td>
                                <td><p>0123456789</p></td>
                            </tr>
                            <tr>
                                <td><p>Ngày giao dịch gần nhất:</p></td>
                                <td><p>25/12/2020 - 08:20</p></td>
                            </tr>  --}}
                        </table>
                        {{--  <hr>
                        <h2><strong style="color:black">Danh sách giao dịch</strong></h2>  --}}
                              <table class="detail_cus">
                                {{--  <tr>
                                    <td><strong>Tổng giao dịch</br>80</strong></td>
                                    <td></td>
                                    <td><strong>Tỉ lệ %</br>78</strong></td>
                                </tr>  --}}
                            </table>
                            {{--  <hr>
                            <input type="date" style="height :30px ;width:45% ;" id="ngaybatdau"> -
                            <input type="date" style="height :30px ;width:45% ;" id="ngayketthuc">  --}}
                         
                            {{--  <form >
                            <h3>Loại giao dịch: </h3>
                            <input type="radio" checked id="male" name="gender" value="male">
                            <label for="male">Tất cả </label> &nbsp&nbsp
                            <input type="radio" id="female" name="gender" value="female">
                            <label for="female">Tiền thua</label> &nbsp&nbsp
                            <input type="radio" id="other" name="gender" value="other">
                            <label for="other">Tiền thắng</label>
                            </form>  --}}
                             
                            {{--  <center><button type="button"  class="btn btn-success btn-sm">Tìm kiếm</button></center>

                            <hr>  --}}
                  
                   </div>
                    <div class="tab-content" id="content-order" style="width: 100%;height: 300px;overflow: auto;">
                        <div id="history_trading">
                           
                            {{--  <tr>
                                <td><strong>15/03/2001 - 20:21</strong></td>
                                <td>&nbsp&nbsp&nbsp&nbsp</td>
                                <td><strong>Số tiền: </strong></td>
                                <td><strong style="color:red">&nbsp +450,000,000</strong></td>
                            </tr>  --}}
                        
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
    <script src="{{ asset('backend/js/admin_han/admin_sales.js') }}"></script>
@endsection
