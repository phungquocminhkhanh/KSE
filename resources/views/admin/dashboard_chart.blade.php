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
    <style>
        #nav{
            background-color: #2A2B30;
        }
    </style>
    <body>
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

            <meta name="csrf-token-force-sign" content="{{ csrf_token() }}" />
            <meta name="csrf-token-force-sign2" content="{{ csrf_token() }}" />
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
                        <form action="{{ URL::to('/page/logout') }}" method="get">
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
                            <li class="dropdown hidden-xs">
                                <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                   <small style="color: white">Ví demo : 550,000,253 VND</small>
                                </a>

                            </li>
                            <li class="dropdown hidden-xs">
                                <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                                    <button onclick="ff()" type="button" class="btn btn-warning">Nạp tiền</button>
                                </a>

                            </li>
                            <li class="dropdown pull-right">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                    <span class="pl15"><img src="{{ asset('images/iconuser.png') }}" height="20px" width="30px" alt="">

                                    </span>
                                    <span class="caret caret-tp"></span>
                                    {{-- <input type="hidden" id="id_bu" value="{{ Auth::user()->id_business }}">
                                    <input type="hidden" id="id_ac" value="{{ Auth::user()->id }}"> --}}
                                </a>
                                <ul class="dropdown-menu animated m-t-xs">
                                    <li><a  class="animated animated-short fadeInUp" onclick="clear_data_pass()" data-toggle="modal" data-target="#change_password_dashboard_account_Modal">Đổi mật khẩu</a></li>
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
            @yield('js')
            <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
            <script src="{{ asset('backend/js/laravel_echo.js') }}"></script>


            <script src="{{ asset('backend/js/jquery-2.1.1.js')}}"></script>
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
