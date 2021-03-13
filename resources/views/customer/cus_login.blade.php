
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CÔNG TY CỔ PHẦN INFORMATICS QTC</title>
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

    </head>
  <body background="{{ asset('images/bglogin.png') }}">
    <div class="loginColumns animated fadeInDown">
        <div class="row">
           <div class="col-md-6">

              <p>
                  <Button style="width: 250px;height: 250px;" >Trãi nghiệm</Button>
              </p>
              <p>
              </p>


           </div>
           <div class="col-md-6">
              <div class="inqbox-content">
                 <form class="m-t" role="form" method="POST" action="{{ URL::to('/customer/cus-login') }}">
                    {{ csrf_field() }}

                    <div class="form-group">
                       <input type="text" name="account_username" class="form-control" placeholder="Tên đăng nhập" required="">

                    </div>
                    <div class="form-group">
                       <input type="password" name="account_password" class="form-control" placeholder="Mật khẩu" required="">
                       <small class="text-danger"><?php $me=Session::get('mess') ;echo $me ?></small>
                    </div>

                    <button type="submit" class="btn btn-primary block full-width m-b">Đăng nhập</button>
                    <a  class="animated animated-short fadeInUp" data-toggle="modal" data-target="#diglog_phone">{{-- khoi phuc pass --}}
                     Đăng ký
                    </a>
                    <button type="button"  id="btn_new_cus" data-toggle="modal" data-target="#new_customer"></button>
                    <button type="button"  id="btn_otp" data-toggle="modal" data-target="#diglog_otp"></button>
                 </form>
                 <p class="m-t">
                    <small></small>
                 </p>
              </div>
           </div>
        </div>
        <hr/>
        <div class="row">
           <div class="col-md-6">
           </div>
           <div class="col-md-6 text-right">
              <small></small>
           </div>
        </div>
     </div>
     <div id="diglog_phone" class="modal fade">
        <div class="modal-dialog">
         <div class="modal-content">
          <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal">&times;</button>
           <h4 class="modal-title">Đăng ký tài khoản</h4>
          </div>
          <div class="modal-body">

            {{ csrf_field() }}

            <label>Nhập số điện thoại</label>
            <input type="text"  id="phone_tam" class="form-control" />
            <small id="ercategory_title" class="text-danger"></small>
            <br/>
            <br/>
            <input type="button" onclick="push_phone()" id="btn_phone" value="Tiếp theo" class="btn btn-success" />

          </div>
          <div class="modal-footer">
           <button type="button" id="close_modol_phone" class="btn btn-default" data-dismiss="modal">Đóng</button>
          </div>
         </div>
        </div>
       </div>
       <div id="diglog_otp" class="modal fade">
        <div class="modal-dialog">
         <div class="modal-content">
          <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal">&times;</button>
           <h4 class="modal-title">Đăng ký tài khoản</h4>
          </div>
          <div class="modal-body">

            {{ csrf_field() }}

            <label>Nhập mã số điện thoại</label><br/>
            <small id="otp" class="text-danger">Mã số được gửi về tin nhắn SMS của bạn</small>
            <input type="text" class="form-control" />
            <small id="ercategory_title" class="text-danger"></small>
            <br/>
            <br/>
            <input type="button" onclick="push_otp()" id="btn_otp" value="Tiếp theo" class="btn btn-success" />

          </div>
          <div class="modal-footer">
           <button type="button" id="close_modol_otp" class="btn btn-default" data-dismiss="modal">Đóng</button>
          </div>
         </div>
        </div>
       </div>

     <div id="new_customer" class="modal">
        <div class="modal-dialog">
         <div class="modal-content">
          <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal">&times;</button>
           <h4 class="modal-title">Đăng ký tài khoản</h4>
          </div>
          <div class="modal-body">
           <form id="insert_customer_form" enctype="multipart/form-data">
            <input type="hidden" value="register" name="detect">
            <input type="hidden" value="customer" name="type_customer">
            <input type="hidden" value="" id="customer_phone" name="customer_phone">
            <label>Mã giới thiệu</label>
            <input type="text" name="customer_introduce" id="customer_introduce" class="form-control" />
            <small  class="text-danger"></small>

            <label>Họ và tên (<font style="color: red">*</font>)</label>
            <input type="text" name="customer_name" id="customer_name" class="form-control" />
            <small  class="text-danger"></small>

            <label>Mật khẩu (<font style="color: red">*</font>)</label>
            <input type="password" name="customer_password" id="password" class="form-control" />
            <small  class="text-danger"></small>

            <label>Nhập lại mật khẩu (<font style="color: red">*</font>)</label>
            <input type="password"  id="password2" class="form-control" />
            <small  class="text-danger"></small>

            <label>Nhập số CMND(<font style="color: red">*</font>)</label>
            <input type="text" name="customer_cert_no" id="cmnd" class="form-control" />
            <small id="ercategory_title" class="text-danger"></small>

            <label><label>Hình CMND mặt trước (<font style="color: red">*</font>)</label>
                <input type="file" id="cmnd_icon" onChange="return fileValidation()" name="customer_cert_img" class="form-control" placeholder="Hình ảnh">
            </label>
            <small  class="text-danger"></small>
            <br/>
                <span id="upload_ed_image"></span>
            <br/>
            <br/>
            <input type="submit" name="insert" id="insert_category" value="Thêm" class="btn btn-success" />
           </form>
          </div>
          <div class="modal-footer">
           <button type="button" id="close_modol_insert" class="btn btn-default" data-dismiss="modal">Đóng</button>
          </div>
         </div>
        </div>
       </div>
  </body>
  <script src="{{ asset('backend/js/jquery-2.1.1.js')}}"></script>
  <script src="{{ asset('backend/js/bootstrap.min.js')}}"></script>
  <script src="{{ asset('backend/js/plugins/metisMenu/jquery.metisMenu.js')}}"></script>
  <script src="{{ asset('backend/js/plugins/slimscroll/jquery.slimscroll.min.js')}}"></script>
  <!-- Morris -->

  <script src="{{ asset('backend/js/plugins/morris/morris.js')}}"></script>
  <!-- Chartist -->

  <!-- Custom and plugin javascript -->
  <script src="{{ asset('backend/js/main.js')}}"></script>
  <script src="{{ asset('backend/js/plugins/pace/pace.min.js')}}"></script>
  <!-- Jvectormap -->
  <script src="{{ asset('backend/js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js')}}"></script>
  <script src="{{ asset('backend/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js')}}"></script>
  <!-- Sparkline -->
  <script src="{{ asset('backend/js/plugins/sparkline/jquery.sparkline.min.js')}}"></script>
  <!-- Sparkline demo data  -->
  <script src="{{ asset('backend/js/demo/sparkline-demo.js')}}"></script>
  <script src="{{ asset('backend/js/plugins/chartJs/Chart.min.js')}}"></script>

  <script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-analytics.js"></script>

  <script src="{{ asset('backend/js/jquery-3.5.0.min.js') }}"></script>
  <script src="{{ asset('backend/js/main/admin_local.js') }}"></script>
    <script src="{{ asset('backend/js/main/customer_login.js') }}"></script>
</html>
