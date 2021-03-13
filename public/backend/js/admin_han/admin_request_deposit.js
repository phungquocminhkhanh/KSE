function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
$( document ).ready(function() {
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'list_request_deposit', type_manager:'admin',limit:'100'},
        dataType: 'json',
        success: function (response) 
        {
            var output =``; 
         
            response.data.forEach(function (item) {
                output +=`
                <tr>
                    <td>${item.customer_name}</td>
                    <td>${item.request_code}</td>
                    <td>${formatNumber(item.request_value)} VND</td>
                    <td>${item.request_created}</td>
                    <td><button class="btn btn-primary btn-sm" onClick="detail_deposit(${item.id_request})" ><i class="fa fa-info"></i> Chi tiết</button></td>
                </tr> `; 
            });
          
            $('#content-deposit').html(output);
        }
    });
});

function detail_deposit(id)
{
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'list_deposit_detail' , id_request:id},
        dataType: 'json',
        success: function (response) 
        {
          
           var item = response.data[0];
           var output =`
           <div class="inqbox-content">
           <div id="contact-1" class="tab-pane active">
               <center><h3><strong>Chi tiết yêu cầu giao dịch</strong></h3></center>
          </div>
          
           <div class="tab-content" id="content-order" style="width: 100%;height: 557px;overflow: auto;">
           
           <table class="detai_deal">
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
                       <td><p>${item.request_time_complete}</p></td>
                   </tr>
                   <tr> 
                       <td><p style="color:green">Nạp tiền:</p></td>
                       <td><p style="color:green">${formatNumber(item.request_value)} VND</p></td>
                   </tr>
               </table>
                <hr>
            </div>
            </div>
            `;
           var a = `<input type="text" hidden id="id_request" value="${item.id_request}">`;
           $('#id_request_text').html(a);
           $('#detail_deposit').fadeOut().html(output);
           $('#detail_deposit').fadeIn().html(output);  
        }
    });
}
function filter_payment()
{
    var favDialog = document.getElementById('filter_deposit1');
    favDialog.showModal();
}
function filter_request_deposit()
{
    var start_time = $('#start_time_request').val();
    var finish_time= $('#finish_time_request').val();
 
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'list_request_deposit', type_manager:'admin', date_begin:start_time, date_end:finish_time,limit:'100' },
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
                    <td><button class="btn btn-primary btn-sm" onClick="detail_deposit(${item.id_request})" ><i class="fa fa-info"></i> Chi tiết</button></td>
                </tr>`;
            });
            $('#content-deposit').html(output);
            }
        }
    });

}
function create_deposit()
{
           var output =`
           <div class="inqbox-content">
           <div id="contact-1" class="tab-pane active">
               <center><h3><strong>Tạo lệnh xác nhận nạp tiền</strong></h3></center>
          </div>
          
           <div class="tab-content" id="content-order" style="width: 100%;height: 557px;overflow: auto;">
           
           <div>
                <tr>
                    <td><p>Tên khách hàng: <a onClick="list_customer()" data-toggle="modal" data-target="#request_deposit"><img src="../backend/icon_trading/chon.svg"></a></p></td>
                    <td><p><input type="text" placeholder="Tên khách hàng" class="form-control"></p></td>
                </tr>
                <tr>
                    <td><p>Số tiền nạp momo(VND):</p></td>
                    <td><p><input type="text" placeholder="40.000.00" class="form-control"></p></td>
                </tr>

            </div>
            <hr>
            </div>
            </div>
            `;
           $('#detail_deposit').fadeOut().html(output);
           $('#detail_deposit').fadeIn().html(output);  
}
function list_customer()
{
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'list_customer_customer',limit:'100' },
        dataType: 'json',
        success: function (response) 
        {
            var output =``;
            response.data.forEach(function (item) {
                output+=`
                <tr>
                    <td>${item.customer_name}</td>
                    <td>${item.customer_phone}</td>
                    <td>${item.customer_cert_no}</td>
                    <td><input type="radio" name="radio" value="${item.id_customer}" ></td>
                </tr> `;
            });
            $('#list_customer').html(output);
        }
    });
    
}
function search_customer()
{
    var  key_seach = $('#id_customer_search').val();
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'list_customer_customer',limit:'100',filter:key_seach},
        dataType: 'json',
        success: function (response) 
        {
            var output =``;
            response.data.forEach(function (item) {
                output+=`
                <tr>
                    <td>${item.customer_name}</td>
                    <td>${item.customer_phone}</td>
                    <td>${item.customer_cert_no}</td>
                    <td><input type="radio" name="radio" value="${item.id_customer}" ></td>
                </tr> `;
            });
            $('#list_customer').html(output);
        }
    });
}
function choose_customer()
{
    var id_customer = $(':radio:checked').val();

    if(typeof(id_customer) == "undefined")
    {
        alert('Bạn chưa chọng khách hàng');
    }else{
        $.ajax({
            url: urlapi,
            type: 'POST',
            data: {detect:'list_customer_detail',id_customer:id_customer},
            dataType: 'json',
            success: function (response) 
            {
                var output =`
                <div class="inqbox-content">
                <div id="contact-1" class="tab-pane active">
                    <center><h3><strong>Tạo lệnh xác nhận nạp tiền</strong></h3></center>
                </div>
                <div class="tab-content" id="content-order" style="width: 100%;height: 557px;overflow: auto;">
                <div>
                    <tr>
                    <input type="text" hidden  value="${response.data[0].id_customer}">
                        <td><p>Tên khách hàng: <a onClick="list_customer()" data-toggle="modal" data-target="#request_deposit"><img src="../backend/icon_trading/chon.svg"></a></p></td>
                        <td><p><input type="text" value="${response.data[0].customer_name}" placeholder="Tên khách hàng" class="form-control"></p></td>
                    </tr>
                    <tr>
                        <td><p>Số tiền nạp momo(VND):</p></td>
                        <td><p><input type="number" min="1" id="depoit_money" placeholder="40.000.00" class="form-control"></p></td>
                        <small id="mess_deposit" style="color:red"></small>
                        </tr>
                </div>
                <hr>
                <button class="btn btn-danger btn-sm btn-block" onClick="create_request_comfirm(${id_customer})">Tạo mới</button>
                </div>
                </div>
                    `;
                $('#detail_deposit').fadeOut().html(output);
                $('#detail_deposit').fadeIn().html(output);
            }
        });
       
    }
}
function create_request_comfirm(id_customer)
{

  //  var r = confimr('Xác nhận lại số tiền muốn chuyển');
    var request_value = $('#depoit_money').val();
    if(request_value == ``)
    {
        var a = `Vui lòng nhập giá trị tiền muốn nạp`;
        $('#mess_deposit').html(a);
    
    }else{
        $('#mess_deposit').html(``);
        var r = confirm('Kiểm tra thông tin trước khi xác nhận');
        if (r == true)
        {
            $.ajax({
                url: urlapi,
                type: 'POST',
                data: {detect:'deposit_manager',type_manager:'create_request_comfirm', request_value:request_value ,id_customer:id_customer},
                dataType: 'json',
                success: function (response) 
                {
                    alert('Nạp tiền thành công');
                }
            });
        }else{}
        

    }
   
}
// tìm kiếm nạp tiền
function search_request_deposit()
{
    var  key_seach1 = $('#key_seach_deposit').val();
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'list_request_deposit', type_manager:'admin', filter:key_seach1},
        dataType: 'json',
        success: function (response) 
        {
            var output =``; 
            response.data.forEach(function (item) {
                output +=`
                <tr>
                    <td>${item.customer_name}</td>
                    <td>${item.request_code}</td>
                    <td>${formatNumber(item.request_value)} VND</td>
                    <td>${item.request_created}</td>
                    <td><button class="btn btn-primary btn-sm" onClick="detail_deposit(${item.id_request})" ><i class="fa fa-info"></i> Chi tiết</button></td>
                </tr> `; 
            });
          
            $('#content-deposit').html(output);
        }
    });

}