$( document ).ready(function() {
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'list_request_payment', type_manager:'admin',limit:'100'},
        dataType: 'json',
        success: function (response) 
        {
            
            var output =``; 
            response.data.forEach(function (item) {
                output +=`
                <tr>
                    <td>${item.customer_name}</td>
                    <td>${item.request_code}</td>
                    <td> - ${item.request_value} VND</td>
                    <td>${item.request_created}</td>
                    <td id="${item.id_request}_id_request">${request_status(item.request_status)}</td>
                    <td><button class="btn btn-primary btn-sm" onClick="detail_payment(${item.id_request})" ><i class="fa fa-info"></i> Chi tiết</button></td>
                </tr> `; 
            });
          
            $('#content-deal').html(output);
        }
    });

    // $( '#insert_news_form' ).click(function ( e ) {
    //     var data;
    //     data = new FormData();
    //     data.append( 'file', $( '#file' )[0].files[0] );
    //     console.log(data);
    //     // $.ajax({
    //     //     url: urlapi,
    //     //     data: data,
    //     //     processData: false,
    //     //     type: 'POST',
    //     //     success: function ( data ) {
    //     //         alert( data );
    //     //     }
    //     // });
     
    //     e.preventDefault();
    // });

});
function request_status(status)
{
    if(status == 1)
    {
        return 'Tạo lệnh';
    }
    if(status == 2)
    {
        return 'Chờ xác nhận';
    }
    if(status == 3)
    {
        return 'Hoàn tất'
    }
    if(status == 4)
    {
        return 'Hủy lệnh';
    }
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
function detail_payment(id)
{
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'list_payment_detail' , id_request:id},
        dataType: 'json',
        success: function (response) 
        {
           var item = response.data[0];
           var output =`
           <form id="insert_news_form" enctype="multipart/form-data">
       
           <div class="inqbox-content">
           <div id="contact-1" class="tab-pane active">
               <center><h3><strong>Chi tiết lệnh rút tiền</strong></h3></center>
          </div>
          
           <div class="tab-content" id="content-order" style="width: 100%;height: 557px;overflow: auto;">
           
           <table class="detai_deal">
                   <tr>
                       <td><p>Trạng thái:</p></td>
                       <td id = "id_status"><p>${request_status(item.request_status)}</p></td>
                   </tr>
                   <tr>
                       <td><p>Họ & Tên:</p></td>
                       <td><p>${item.customer_name}</p></td>
                   </tr>
                   <tr>
                       <td><p>Mã lệnh:</p></td>
                       <td><p>${item.request_code}</p></td>
                   </tr>
                   <tr>
                       <td><p>Thời gian:</p></td>
                       <td><p>${item.request_created}</p></td>
                   </tr>
                   <tr>
                       <td><p>Hạn mức:</p></td>
                       <td><p>${formatNumber(item.customer_limit_payment)} VND</p></td>
                   </tr>
                   <tr>
                       <td><p>Đã giao dịch:</p></td>
                       <td><p>${formatNumber(item.customer_paymented)}</p></td>
                   </tr>
                   <tr> 
                       <td><p style="color:red">Rút tiền:</p></td>
                       <td><p style="color:red"> - ${formatNumber(item.request_value)} VND</p></td>
                   </tr>
               </table>
                <hr>
              <center><h3><strong>Phương thức thanh toán</strong></h3></center>
               <table class="detai_deal">
                   <tr>
                       <td><p>Tên ngân hàng:</p></td>
                       <td><p>${item.bank_name}</p></td>
                   </tr>
                   <tr>
                       <td><p>Tên chủ thẻ:</p></td>
                       <td><p>${item.customer_account_holder}</p></td>
                   </tr>
                   <tr>
                       <td><p>Số tài khoản:</p></td>
                       <td><p>${item.customer_account_no}</p></td>
                   </tr>`;
                   if(item.request_status == 2)
                   output+=`
                   <tr>
                       <td style="height:20px"></td>
                   </tr>
                   <tr>
                       <td>
                       <label class="custom-file-upload">
                            <input type="file" id="id_img" onchange="preview_image(event,${item.id_request})" class="form-control" multiple="multiple" accept="image/png, image/jpeg"/>
                            <i class="fa fa-upload"> Chọn file </i>
                        </label>
                       </td>
                   </tr>
                   <tr><td><img id="output_image" width="100%"/></td></tr>
                   `;
                   if(item.request_status == 4)
                   output+=`
                   <tr>
                       <td><strong style="color:red">Lý do:</strong></td>
                   </tr>
                   <tr>
                       <td><strong style="color:red">${item.request_comment}</strong></td>
                   </tr>
                   `;
                   output+=`
               </table>
          </div>`;
          if(item.request_status==2)
           output+=`<div id="${item.id_request}_btn">
           <button type="button" onClick="check_img()" class="btn btn-secondary btn-sm btn-block"> Hoàn tất</button>
           </div>`;
           output+=`</div></form>`
           var a = `<input type="text" hidden id="id_request" value="${item.id_request}">`;
           $('#id_request_text').html(a);
           $('#detail_deal').fadeOut().html(output);
           $('#detail_deal').fadeIn().html(output);  
        }
    });
}
/// hien thị hình
function preview_image(event,id) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('output_image');
      output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    var btn =`<button type="button" onClick="final_reuqest_payment()"  class="btn btn-danger btn-sm btn-block"> Hoàn tất</button>`;
    $('#'+id+'_btn').html(btn);
}
function check_img()
{
    alert('Bạn chưa thêm hình ảnh');
}
function final_reuqest_payment(id)
{
    
   

    // var r = confirm('Kiểm tra thông tin trước khi xác nhận');
    // if(r==true)
    // {
    //     $.ajax({
    //         url: urlapi,
    //         type: 'POST',
    //         data: {detect:'payment_manager' , type_manager:'update_img_payment', id_request:id, request_img:request_img },
    //         dataType: 'json',
    //         success: function (response) 
    //         {
    //             alert('Thêm hình ảnh thành công');

    //         }
    //     });
    // }else{}
}

function search_request_payment()
{
    var key_seach = $('#key_seach').val();
    console.log(key_seach);
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {type_manager:'admin',detect:'list_request_payment',limit:'100',filter:key_seach},
        dataType: 'json',
        success: function (response) 
        {
            console.log(response);
            var output =``; 
            response.data.forEach(function (item) {
                output +=`
                <tr>
                    <td>${item.customer_name}</td>
                    <td>${item.request_code}</td>
                    <td> - ${item.request_value} VND</td>
                    <td>${item.request_created}</td>
                    <td id="${item.id_request}_id_request">${request_status(item.request_status)}</td>
                    <td><button class="btn btn-primary btn-sm" onClick="detail_payment(${item.id_request})" ><i class="fa fa-info"></i> Chi tiết</button></td>
                </tr>`;
            });
            $('#content-deal').html(output);
        }
    });
}
function filter_payment()
{
    var favDialog = document.getElementById('filter_deposit1');
    favDialog.showModal();
}
function filter_request_payment()
{
    var start_time = $('#start_time_request').val();
    var finish_time= $('#finish_time_request').val();
    var status_payment= $('#status_payment').val();
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'list_request_payment', type_manager:'admin', date_begin:start_time, date_end:finish_time,filter_status:status_payment,},
        dataType: 'json',
        success: function (response) 
        {
           if(response.success =="false")
           {
                alert('Không tìm thấy yếu cầu !');
           }else{
            var output =``; 
            response.data.forEach(function (item) {
                output +=`
                <tr>
                    <td>${item.customer_name}</td>
                    <td>${item.request_code}</td>
                    <td> - ${item.request_value} VND</td>
                    <td>${item.request_created}</td>
                    <td id="${item.id_request}_id_request">${request_status(item.request_status)}</td>
                    <td><button class="btn btn-primary btn-sm" onClick="detail_payment(${item.id_request})" ><i class="fa fa-info"></i> Chi tiết</button></td>
                </tr>`;
            });
            $('#content-deal').html(output);
            }
        }
    });

}
