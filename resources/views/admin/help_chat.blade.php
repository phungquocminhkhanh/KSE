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
  .example1 {
        border: 1px solid #0080FF;
        border-radius: 20px 20px 20px 0px;
        background-color: #3DDBE0;
        color: black;
        width: 100%;
        height: 100%;
        padding: 10px;
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
                       
                    </div>
                    <div class="clients-list">
                        <div class="tab-content" >
                            <div id="tab-account" class="tab-pane active" >
                            <div class="full-height-scroll">
                                <div class="table-responsive">
                                    <table class="table table-striped table-hover">
                                    <tr>
                                        <th style="width:30px;"></th>
                                        <th style="width:42%;"><i class="fa fa-user"></i> Khách hàng</th>
                                        <th>Nội dung</th>
                                        <td style="width:30px;"></td>
                                    </tr>
                                        <tbody id="content_officer_chat">
                                        {{--  <tr>
                                            <td style="width:30px;"></td>
                                            <td>Nguyễn Văn A</td>
                                            <td>Yêu cầu chuyển tiền đi broooooooooooooo </td>
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
                <div class="inqbox ">
                   <div class="inqbox-content" id="id_chat">
                    <div id="contact-1" class="tab-pane active" >
                    {{--  <center><h1><i class="fa fa-user"></i></h1></center>
                     <center><h2><strong>Nguyễn Van A </strong></h2> </center>
                      <center><h3><strong>0123456789 </strong></h3> </center>
                        <hr>  --}}
                    </div>
                    <div class="tab-content" id="content-order" style="width: 100%;height: 380px;overflow: auto;">
                        {{--  <table>
                            <tr >
                                <td><p class="example1"> Tôi muốn đổi tiền brooooooooooooo Tôi muốn đổi tiền brooooooooooooo </p></td>                              
                            </tr>
                        </table>  --}}
                    </div>
                    <div id="btn_finish">
                    {{--  <button class="btn btn-danger btn-lg btn-block"> Kết thúc </button>  --}}
                    </div>
                   </div>
                </div>
            </div>
         </div>

  
    
    
    </div>
    </body>
    <script src="{{ asset('backend/js/jquery-3.5.0.min.js') }}"></script>
    <script src="{{ asset('backend/js/main/admin_local.js') }}"></script>
    <script src="{{ asset('backend/js/admin_han/itemModel.js') }}"></script>
    <script src="{{ asset('backend/js/admin_han/admin_officer_chat.js') }}"></script>
@endsection
