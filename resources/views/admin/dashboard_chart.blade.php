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
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    </head>
    <style>
        #nav{
            background-color: #2A2B30;
        }
        .modal.left .modal-dialog,
	.modal.right .modal-dialog {
		position: fixed;
		margin: auto;
		width: 220px;
		height: 100%;
		-webkit-transform: translate3d(0%, 0, 0);
		    -ms-transform: translate3d(0%, 0, 0);
		     -o-transform: translate3d(0%, 0, 0);
		        transform: translate3d(0%, 0, 0);
	}

	.modal.left .modal-content,
	.modal.right .modal-content {
		height: 100%;
	}

	.modal.left .modal-body,
	.modal.right .modal-body {
		padding: 15px 15px 80px;
	}

/*Left*/
	.modal.left.fade .modal-dialog{
		left: -320px;
		-webkit-transition: opacity 0.3s linear, left 0.3s ease-out;
		   -moz-transition: opacity 0.3s linear, left 0.3s ease-out;
		     -o-transition: opacity 0.3s linear, left 0.3s ease-out;
		        transition: opacity 0.3s linear, left 0.3s ease-out;
	}

	.modal.left.fade.in .modal-dialog{
		left: 0;
	}

/*Right*/
	.modal.right.fade .modal-dialog {
		right: -320px;
		-webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
		   -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
		     -o-transition: opacity 0.3s linear, right 0.3s ease-out;
		        transition: opacity 0.3s linear, right 0.3s ease-out;
	}

	.modal.right.fade.in .modal-dialog {
		right: 0;
	}

/* ----- MODAL STYLE ----- */
	.modal-content {
		border-radius: 0;
		border: none;
        background-color: #2A2B30;
	}



/* ----- v CAN BE DELETED v ----- */
body {
	background-color: #78909C;
}

.demo {
	padding-top: 60px;
	padding-bottom: 110px;
}




    </style>
    <body>
        <?php $customer=Session::get('data_customer') ?>
        <div id="wrapper">
            <nav   class="navbar-default navbar-static-side fixed-menu" role="navigation" style="background-color: #2A2B30">
                <div class="sidebar-collapse" style="background-color: #2A2B30">
                    <div id="hover-menu"></div>
                    <ul class="nav metismenu" id="side-menu" style="background-color: #2A2B30">


                        <li>
                            <!-- START : Left sidebar -->
                            <div class="nano left-sidebar" style="background-color: #2A2B30">
                                <div class="nano-content">
                                    <div class="tab-content" id="content-order" style="
                                         width: 100%;
                                        height: 100%;
                                          overflow: auto;">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">
                                        <img src="{{ asset('images/chart1.png') }}" width="100%" height="100px" alt="">

                                     </div>

                                </div>
                            </div>
                            <!-- END : Left sidebar -->
                        </li>
                    </ul>
                </div>
            </nav>
            <input type="hidden" id="id_cus" value="{{ $customer->id }}">
            <meta name="csrf-token-force-sign" content="{{ csrf_token() }}" />
            <meta name="csrf-token-force-sign2" content="{{ csrf_token() }}" />



            <div class="modal left fade" id="myModal-left" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">

                        <div class="modal-header">

                            <h3 class="modal-title" id="myModalLabel" style="text-align: center">Lịch sử giao dịch</h3>

                            <br />
                            <div style="width: 100%;text-align: center">
                                <a onclick="back_history()" style="width: 10%;color: white;font-size: 15px"><<</a>
                                <button  style="width: 40%;" onclick="history_payment(1)" type="button" class="btn btn-warning">Rút tiền</button>
                                <button  style="width: 40%;" onclick="history_deposit(1)" type="button" class="btn btn-secondary">Nạp tiền</button>
                            </div>

                        </div>

                        <style>
                            .history-deal{
                                color: white;
                            }
                            .history-deal td
                            {
                                width: 100%;
                            }
                            .page-link{
                                width: 20px;
                                height: 25px;
                                font-size: 13px;
                                text-align: center;
                                font-weight: bold;
                            }
                            .detail_his td:nth-child(2){
                                text-align:right;
                                font-size: 10px;

                            }
                            .detail_his td:nth-child(1){
                                text-align:left;
                                font-size: 14px;

                            }
                            a:hover {
                                color: red;
                            }
                        </style>

                        <div class="modal-body">
                            <input class="form-control" style="width: 50%;height: 30px;" id="d_start" onchange="seach_his()" type="date" id="example-datetime-local-input">
                            <input class="form-control" style="width: 50%;height: 30px;" id="d_end" onchange="seach_his()" type="date" id="example-datetime-local-input">
                            <table class="history-deal" id="history-deal">

                            </table>
                            <hr>
                            <ul class="pagination" s id="phantrang">

                              </ul>
                        </div>

                    </div>
                </div>
            </div>




            <div id="change_password_dashboard_account_Modal" class="modal fade">
                <div class="modal-dialog">
                 <div class="modal-content">
                  <div class="modal-header">
                   <button type="button" class="close" data-dismiss="modal">&times;</button>
                   <h4 class="modal-title">Đổi lại mật khẩu</h4>
                  </div>
                  <div class="modal-body">

                    <form id="change_password_dashboard_account_form">
                    <meta name="csrf-token-change-password-dashboard" content="{{ csrf_token() }}" />
                    <div class="inqbox-content">
                        <label>Mật khẩu cũ</label>
                            <div class="input-group" id="show_hide_password">
                            <input class="form-control" type="password" name="old_password" id="old_password">

                            <div class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                            </div>
                            </div>
                            <small id="erold_password" class="text-danger"></small><br /><br />

                             <label>Mật khẩu mới</label>
                            <div class="input-group" id="show_hide_password2">
                            <input class="form-control" type="password" name="account_password" id="dashpassword_change">
                            <br />
                            <div class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                            </div>
                            </div>
                            <small id="dasherpassword" class="text-danger"></small>
                            <br />
                            <br />
                        <label>Nhập lại mật khẩu</label>
                            <div class="input-group" id="show_hide_password3">
                            <input class="form-control" type="password" name="account_password" id="dashpassword_change2">

                            <div class="input-group-addon">
                                <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
                            </div>
                            </div>
                            <small id="dasherpassword2" class="text-danger"></small>
                            <br />
                            <br />
                    <input type="submit" name="edit" id="btn_change_password_dashboard_account" value="Cập nhật" class="btn btn-success" />
                    </form>
                  </div>
                  <div class="modal-footer">
                   <button type="button" id="close_modol_changge_password_dashboard" class="btn btn-default" data-dismiss="modal">Đóng</button>
                  </div>
                 </div>
                </div>
               </div>

               <div id="rut_tien_modal" class="modal fade">
                <div class="modal-dialog">
                 <div class="modal-content">
                  <div class="modal-header">
                   <button type="button" class="close" data-dismiss="modal">&times;</button>
                   <h4 class="modal-title">Rút tiền</h4>
                  </div>
                  <div class="modal-body">

                    <form id="rut_tien_form">
                        <input type="hidden" name="detect" value="customer_request_payment">
                        <input type="hidden" name="id_customer" value="{{ $customer->id }}">
                    <div class="inqbox-content">
                        <h4 id="vitaikhoan"></h4>
                        <label>Số tiền rút</label>
                            <div class="input-group" id="show_hide_password">
                            <input class="form-control" type="text" name="request_value" id="request_value">
                            <small id="ermoney" class="text-danger"></small><br /><br />
                    <input type="submit" name="edit" id="btn_rut_tien"  value="Rút tiền" class="btn btn-success" />
                    </form>
                  </div>
                  <div class="modal-footer">
                   <button type="button" id="close_modol_rut_tien"  class="btn btn-default" data-dismiss="modal">Đóng</button>
                  </div>
                 </div>
                </div>
               </div>

               <div id="nap_tien_modal" class="modal fade">
                <div class="modal-dialog">
                 <div class="modal-content">
                  <div class="modal-header">
                   <button type="button" class="close" data-dismiss="modal">&times;</button>
                   <h4 class="modal-title">Nạp tiền</h4>
                  </div>
                  <div class="modal-body">

                    <form id="nap_tien_form">
                    <meta name="csrf-token-change-password-dashboard" content="{{ csrf_token() }}" />
                    <div class="inqbox-content">
                        <div id="info_payment"></div>

                    <div><img src="{{ asset('/images/momo.png') }}" alt=""> sử dụng MoMo trên mobile để nạp tiền</div>
                    </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                   <button type="button" id="close_modol_nap_tien" class="btn btn-default" data-dismiss="modal">Đóng</button>
                  </div>
                 </div>
                </div>
               </div>
            <div id="phuong_thuc_thanh_toan_modal" class="modal fade">
            <div class="modal-dialog">
             <div class="modal-content">
              <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal">&times;</button>
               <h4 class="modal-title">Phương thức thanh toán</h4>
              </div>
              <div class="modal-body">
                <meta name="csrf-token-insert" content="{{ csrf_token() }}" />
               <form method="post" id="form_phuong_thuc_thanh_toan">
                <input type="hidden" name="detect" value="customer_method_payment">
                <input type="hidden"  name="id_customer" id="id_edit_account" value="{{$customer->id}}" >
                <label>Tên ngân hàng (<font style="color: red">*</font>)</label>
                <select id="id_bank" name="id_bank">

                </select>
                <br />
                <br />
                <label>Số tài khoản (<font style="color: red">*</font>)</label>
                <input type="text" name="customer_account_no" id="customer_account_no" class="form-control" />
                <small id="erusername" class="text-danger"></small>
                <br />
                <br />
                <label>Tên chủ thẻ(<font style="color: red">*</font>)</label>
                <input type="text" name="customer_account_holder" id="customer_account_holder" class="form-control" />
                <small id="erusername" class="text-danger"></small>
                <br />
                <br />
                <label><label>Hình thẻ ngân hàng mặt trước (<font style="color: red">*</font>)</label>
                <input type="file" id="customer_account_img" onChange="return fileValidation()" name="customer_account_img" class="form-control" multiple="multiple"  placeholder="Hình ảnh">
                </label>
                <small  class="text-danger"></small>
                <br/>
                <span id="upload_ed_image"></span>
                 <br/>
                <br />
                <input type="submit" name="insert" id="insert_payment" value="Cập nhật" class="btn btn-success" />
               </form>
              </div>
              <div class="modal-footer">
               <button type="button" id="close_modol_funciton_payment" class="btn btn-default" data-dismiss="modal">Đóng</button>
              </div>
             </div>
            </div>
           </div>

           <div id="profile_modal" class="modal fade">
            <div class="modal-dialog">
             <div class="modal-content">
              <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal">&times;</button>
               <h4 class="modal-title">Thông tin tài khoản</h4>
              </div>
              <div class="modal-body">



                <label>Mã giới thiệu</label>
                <input type="text" name="customer_introduce" id="customer_introduce" readonly class="form-control" />

                <br/>
                <label>Họ và tên </label>
                <input type="text" name="name" id="customer_names" readonly class="form-control" />

                <br/>
                <label>Số điện thoại </label>
                <input type="text" name="name" id="customer_phone" readonly class="form-control" />

                <br/>
                <label>Số CMND</label>
                <input type="text" name="customer_cert_no" id="customer_cert_no" readonly class="form-control" />

                <br/>
                <label>Hình CMND mặt trước</label>
                    <div id="cmnd_mattruoc" style="width: 100%;height: 150px;text-align: center"></div>
                </label>

              </div>
              <div class="modal-footer">
               <button type="button" id="close_modol_payment" class="btn btn-default" data-dismiss="modal">Đóng</button>
              </div>
             </div>
            </div>
           </div>

            <div class="modal" id="alert_change_pass_dashboard" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document" style="background-color: #87CEEB">
                  <div class="modal-content">
                    </div>
                    <div class="modal-body" id="content_alert_das">

                    </div>
                    <div class="modal-footer">
                      <button type="button" id="ok_alert_das" class="btn btn-secondary" data-dismiss="modal">OK</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal" id="logout-dasboard" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document" style="background-color: #87CEEB">
                  <div class="modal-content">
                    </div>
                    <div class="modal-body" id="content_alert_das">
                       <h3> Bạn có muốn đăng xuất không</h3>
                    </div>
                    <div class="modal-footer">
                        <form action="{{ URL::to('/customer/cus-logout') }}" method="get">
                            <button type="submid" class="btn btn-secondary">Yes</button>
                            <button type="button"class="btn btn-secondary" data-dismiss="modal">No</button>
                        </form>


                    </div>
                  </div>
                </div>
              </div>


              <div class="modal" id="force-sign-out-dasboard" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document" style="background-color: #A9A9A9">
                  <div class="modal-content">
                    </div>
                    <div class="modal-body">
                       <img src="{{ asset('images/force_sign_out.png') }}" alt="" width="100%">
                    </div>

                        <button type="submid" class="btn btn-secondary" style="margin-left: 30%" data-toggle="modal" data-target="#force-manage">Thoát quản lý</button>
                        <button type="button"class="btn btn-secondary" data-toggle="modal" data-target="#force-employ">Thoát nhân viên</button>


                  </div>
                </div>
              </div>
              <div class="modal" id="force-manage" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document" style="background-color: #87CEEB">
                  <div class="modal-content">
                    </div>
                    <div class="modal-body" id="content_alert_das">
                       <h3>Bạn có muốn cưỡng chế hết tài khoản quản lý trong ứng dụng này không</h3>
                    </div>
                    <div class="modal-footer">

                            <button type="button" class="btn btn-secondary" onclick="force_sign('admin')">Yes</button>
                            <button type="button"class="btn btn-secondary" id="close_force_manage" data-dismiss="modal">No</button>



                    </div>
                  </div>
                </div>
              </div>
              <div class="modal" id="force-employ" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document" style="background-color: #87CEEB">
                  <div class="modal-content">
                    </div>
                    <div class="modal-body" id="content_alert_das">
                       <h3>Bạn có muốn cưỡng chế hết tài khoản nhân viên trong ứng dụng này không</h3>
                    </div>
                    <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="force_sign('employee')">Yes</button>
                            <button type="button"class="btn btn-secondary" id="close_force_employ" data-dismiss="modal">No</button>
                    </div>
                  </div>
                </div>
              </div>

              <meta name="csrf-token-get-permission-das" content="{{ csrf_token() }}" />

            <div id="page-wrapper"  class="gray-bg" style="background-color: #2A2B30">
                <!-- BEGIN HEADER -->
                <div id="header" style="background-color:#2A2B30">
                    <nav class="navbar navbar-fixed-top white-bg show-menu-full" id="nav" role="navigation" style="margin-bottom: 0">
                        <div class="navbar-header">
                            <button id="khanhkhanh"> <img src="{{ asset('images/kse.png') }}" width="150px" height="70px" alt=""></button>
                        </div>
                        <ul class="nav navbar-top-links navbar-right">

                            <li class="dropdown pull-left">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    <span class="pl15"><small style="color: white" id="customer_wallet"></small>
                                    </span>
                                    <span class="caret caret-tp"></span>
                                    {{-- <input type="hidden" id="id_bu" value="{{ Auth::user()->id_business }}">
                                    <input type="hidden" id="id_ac" value="{{ Auth::user()->id }}"> --}}
                                </a>
                                <ul class="dropdown-menu animated m-t-xs" style="background-color:#2A2B30;color: white">
                                    <li style="text-align: center"><h4>Ví tài khoản</h4>
                                        <small style="text-align: center" id="customer_wallet2"></small>
                                    </li>
                                    <br />
                                    <li style="text-align: center"><h4>Ví rút tiền</h4>
                                        <small style="text-align: center" id="customer_wallet_payment"></small>
                                    </li>
                                    <br />
                                    <li style="text-align: center"><button  style="width: 80%;" type="button" class="btn btn-warning" data-toggle="modal" data-target="#rut_tien_modal">Rút tiền</button></li>

                                </ul>
                            </li>
                            <li class="dropdown hidden-xs">
                                <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                    <button  type="button" class="btn btn-warning" data-toggle="modal" data-target="#nap_tien_modal">Nạp tiền</button>
                                </a>

                            </li>
                            <li class="dropdown pull-right" >
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    <span class="pl15"><img src="{{ asset('images/iconuser.png') }}" height="20px" width="30px" alt="">{{$customer->customer_name}}
                                    </span>
                                    <span class="caret caret-tp"></span>
                                    {{-- <input type="hidden" id="id_bu" value="{{ Auth::user()->id_business }}">
                                    <input type="hidden" id="id_ac" value="{{ Auth::user()->id }}"> --}}
                                </a>

                                <ul class="dropdown-menu animated m-t-xs" style="background-color:#2A2B30;color: white">
                                    <li><a  class="animated animated-short fadeInUp" onclick="clear_data_pass()" data-toggle="modal" data-target="#change_password_dashboard_account_Modal">Đổi mật khẩu</a></li>
                                    <li class="divider"></li>
                                    <li><a  class="animated animated-short fadeInUp" data-toggle="modal" data-target="#profile_modal">Thông tin cá nhân</a></li>
                                    <li class="divider"></li>
                                    <li><a  class="animated animated-short fadeInUp"  data-toggle="modal" data-target="#phuong_thuc_thanh_toan_modal">Phương thức thanh toán</a></li>
                                    <li class="divider"></li>
                                    <li><a  class="animated animated-short fadeInUp" onclick="history_payment(1)"  data-toggle="modal" data-target="#myModal-left">Lịch sử giao dịch</a></li>
                                    <li class="divider"></li>
                                    <li><a href="#" class="animated animated-short fadeInUp" data-toggle="modal" data-target="#logout-dasboard"><i class="fa fa-sign-out"></i>Đăng xuất</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                @yield('chart_content')
            </div>
            <!-- Mainly scripts -->
            <script src="{{ asset('backend/js/socket.js') }}"></script>

            @yield('js')
            <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
            <script src="{{ asset('backend/js/laravel_echo.js') }}"></script>
            <script src="{{ asset('backend/js/bootstrap.min.js')}}"></script>
            <script src="{{ asset('backend/js/plugins/metisMenu/jquery.metisMenu.js')}}"></script>
            <script src="{{ asset('backend/js/plugins/slimscroll/jquery.slimscroll.min.js')}}"></script>
            <script src="{{ asset('backend/js/main/admin_dashboard_chart.js') }}"></script>
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
            <script>

            </script>

    </body>



</html>
