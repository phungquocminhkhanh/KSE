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
            console.log(response);
           var item = response.data[0];
           var output =`
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
                   </tr>
                   <tr>
                       <td colspan="2"><p>Hình thẻ ngân hàng măt trước:</p></td>
                   </tr>
                   <tr>
                       <td colspan="2"><img src="${urlserver+item.customer_account_img}" height="200px" width="99%"></td>
                   </tr>
                   <tr>
                       <td colspan="2"><p>Hình cmnd mặt trước:</p></td>
                   </tr>
                   <tr>
                       <td colspan="2"><img src="${urlserver+item.customer_cert_img}" height="200px" width="99%"></td>
                   </tr>`;
                   output+=`
                   <tr>
                       <td style="height:20px"></td>
                   </tr> `;
                   if(item.request_status == 4)
                   output+=`
                   <tr>
                       <td><strong style="color:red">Lý do:</strong></td>
                   </tr>
                   <tr>
                       <td><strong style="color:red">${item.request_comment}</strong></td>
                   </tr>`;
                   output+=`
               </table>
          </div>`;
          if(item.request_status==1)
           output+=`<div id="${item.id_request}_btn">
           <button type="button" data-toggle="modal" data-target="#reason_refuse" class="btn btn-secondary btn-sm btn-block">Từ chối</button>
           <button type="button" onClick="confirm_money(${item.id_request})"  class="btn btn-danger btn-sm btn-block"> Xác nhận</button>
           </div>`;
           var a = `<input type="text" hidden id="id_request" value="${item.id_request}">`;
           $('#id_request_text').html(a);
           $('#detail_deal').fadeOut().html(output);
           $('#detail_deal').fadeIn().html(output);  
        }
    }); 
}
function confirm_money(id)
{
    var r = confirm('Kiểm tra thông tin trước khi xác nhận');
    if(r==true)
    {
        $.ajax({
            url: urlapi,
            type: 'POST',
            data: {detect:'officer_payment_request' , type_manager:'confirm_request_payment', id_request:id},
            dataType: 'json',
            success: function (response) 
            {
                var output = `<p>Chờ xác nhận</p>`;
                $('#'+id+'_btn').html('');
                $('#'+id+'_id_request').html(output);
                $('#id_status').html(output);
                
            }
        });
    }
}
function cancel_money()
{
    var id_request = $('#id_request').val();
    var reason_cancel=$('#reason_cancel').val();
    var r = confirm('Bạn có muốn hủy lệnh không');
    if(r==true)
    {
        $.ajax({
            url: urlapi,
            type: 'POST',
            data: {detect:'officer_payment_request' , type_manager:'cancel_request_payment', id_request:id_request,
            request_comment:reason_cancel},
            dataType: 'json',
            success: function (response) 
            {
                var output = `<p>Hủy lệnh</p>`;
                $('#'+id_request+'_btn').html(''); //remove btn
                $('#'+id_request+'_id_request').html(output); // list
                $('#id_status').html(output); //detail
                alert('Hủy lệnh rút tiền thành công')
            }
        });
    }
    
}
function search_request_payment()
{
    var key_seach = $('#key_seach').val();
  
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {type_manager:'admin',detect:'list_request_payment',limit:'100',filter:key_seach},
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
                </tr>`;
            });
            $('#content-deal').html(output);
        }
    });
}
function filter_payment()
{
    var favDialog = document.getElementById('filter_payment1');
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