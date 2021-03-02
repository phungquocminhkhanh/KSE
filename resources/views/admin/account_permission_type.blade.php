@extends('admin.dashboard')
@section('admin_content')
   <body>

    <div style="clear: both; height: 61px;"></div>
    <div class="wrapper wrapper-content animated fadeInRight">

         <div class="row">
            <div class="col-sm-6">
               <div class="inqbox">
                  <div class="inqbox-content">
                           <span class="text-muted small pull-right"></span>
                           <h2>Danh sách quyền hạn</h2>
                           <div class="clients-list">

                              <div class="tab-content" >

                                 <div id="tab-category" class="tab-pane active" >
                                    <div class="full-height-scroll">
                                       <div class="table-responsive">
                                          <table class="table table-striped table-hover">
                                              <tr>
                                                <td>Quyền hạn</td>
                                                <td>Mô tả</td>
                                              </tr>
                                             <tbody id="content-per">

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



            <div class="col-sm-6">
                <div class="inqbox">
                   <div class="inqbox-content">
                            <span class="text-muted small pull-right"></span>
                            <h2>Danh sách loại tài khoản</h2>
                            <div class="clients-list">

                               <div class="tab-content" >

                                  <div id="tab-category" class="tab-pane active" >
                                     <div class="full-height-scroll">
                                        <div class="table-responsive">
                                           <table class="table table-striped table-hover">
                                               <tr>
                                                 <td>Loại tài khoản</td>
                                                 <td>Mô tả</td>
                                               </tr>
                                              <tbody id="content-type">

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

    </div>
    <meta name="csrf-token-get-type22" content="{{ csrf_token() }}" />
    <meta name="csrf-token-get-permission22" content="{{ csrf_token() }}" />







    </body>
    <script src="{{ asset('backend/js/jquery-3.5.0.min.js') }}"></script>
    <script src="{{ asset('backend/js/main/admin_account_permission.js') }}"></script>
@endsection
