$( document ).ready(function() {
    // truyen them id account cho thằng sale
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'sale_support_customer',type_target:'list_customer', type_manager:'list_customer',limit:'200'},
        dataType: 'json',
        success: function (response) 
        { 
            console.log(response);
            var output = `
            <tr>
                <th>Hiện tại: </th>
                <th></th>  
                <th></th>
                <th><i class="fa fa-user"> ${response.total}</i></th>
                <th style="width:30px"></th>   
            </tr>
            <tr>
                <th>Tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Giao dịch gần nhất</th>
                <th>Tỉ lệ thắng</th>
                <th style="width:30px"></th>    
            </tr>`;
            var output_body=``;
            $('#content-customer').html(``);
            response.data.forEach(function (item) {
               output_body+=`
                <tr> 
                    <td><p>${item.customer_name}</p></td>
                    <td><p>${item.customer_phone}</p></td>
                    <td><p>${item.trading_log}</p></td>
                    <td><p>${item.percent_win}</p></td>
                    <td><button type="button" onClick="sales_detail(${item.id_customer})" class="btn btn-primary btn-sm">Chi tiết</button></td>
                </tr>`;
            });
            $('#list_sales').html(output);
            $('#content-customer').html(output_body);
        }
    });
});

function sales_detail(id)
{
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'sale_support_customer',type_manager:'list_customer',id_customer:id,type_target:'list_customer' },
        dataType: 'json',
        success: function (response) 
        { 
            var output=``;
            response.data.forEach(function (item) {

                if(item.id_customer==id)
                {
                output +=`<center><h3>${item.customer_name}</h3></center>
                <table class="detai_deal">
                    <tr>
                        <td><p>Số điện thoại:</p></td>
                        <td><p>${item.customer_phone}</p></td>
                    </tr>
                    <tr>
                        <td><p>Ngày giao dịch gần nhất:</p></td>
                        <td><p>${item.trading_log}</p></td>
                    </tr>
                </table>
                <hr>
                <h2><strong style="color:black">Danh sách giao dịch</strong></h2>
                    <table class="detail_cus">
                        <tr>
                            <td><strong>Tổng giao dịch</br>${item.total_trade}</strong></td>
                            <td></td>
                            <td><strong>Tỉ lệ %</br>${item.percent_win}</strong></td>
                        </tr>
                    </table>
                    <hr>
                    <input type="text" hidden id="id_customer" value="${item.id_customer}">
                    <input type="date" style="height :30px ;width:45% ;" id="ngaybatdau" > -
                    <input type="date" style="height :30px ;width:45% ;" id="ngayketthuc" >
                
                    <form >
                    <h4>Loại giao dịch: </h4>
                    <input type="radio" checked id="all" value="" name="gender">
                    <label for="female">All</label> &nbsp&nbsp
                    <input type="radio" id="lose" name="gender" value="lose">
                    <label for="female">Tiền thua</label> &nbsp&nbsp
                    <input type="radio" id="win" name="gender" value="win">
                    <label for="other">Tiền thắng</label>
                    </form>
                    <center><button type="button" onClick="filter_history()" class="btn btn-success btn-sm">Tìm kiếm</button></center>
                    <hr>`;   
                }
            
            });   
            $('#contact-1').html(output).fadeOut();   
            $('#contact-1').html(output).fadeIn();   
            filter_history();
        }
       
    });
    
}
function filter_history()
{
    if(document.getElementById('win').checked) {
        var trading_result =$('#win').val();
    }else if(document.getElementById('lose').checked) {
        var trading_result =$('#lose').val();
    }else if(document.getElementById('all').checked) {
        var trading_result =$('#all').val();
    } 
    var id = $('#id_customer').val();
    var date_begin= $('#ngaybatdau').val();
    var date_end= $('#ngayketthuc').val();
   // truyền thêm id account 
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'list_customer_history',type_manager:'admin',id_customer:id,
        date_begin:date_begin,date_end:date_end,trading_result:trading_result, limit:'200' },
        dataType: 'json',
        success: function (response) 
        {
            var output_history =``;
            if(response.success == 'false')
            {
                 output_history+=`<center><h2><strong style="color:red">Lịch sử trống</strong></tr></h2></center>`;
                $('#history_trading').html(output_history).fadeOut();   
                $('#history_trading').html(output_history).fadeIn();
            }
  
           
            response.data.forEach(function (item) {
                output_history  +=` 
                <tr>
                    <td><strong>${item.trading_log}</strong></td>
                    <td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
                    <td><strong>Số tiền: </strong></td>`;
                    if(item.trading_result=="win")
                output_history +=`
                    <td><strong style="color:green">&nbsp + ${item.trading_bet}</strong></td>`;
                    else
                output_history +=`
                <td><strong style="color:red">&nbsp - ${item.trading_bet}</strong></td>`;
                
                output_history +=`</tr>`;
            });    
            $('#history_trading').html(output_history).fadeOut();   
            $('#history_trading').html(output_history).fadeIn();   
        }
    });
}
function type_sort()
{
    var type_sort = $('#type_sort').val();
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'sale_support_customer',type_target:'list_customer', type_manager:'list_customer',limit:'200',type_sort:type_sort},
        dataType: 'json',
        success: function (response) 
        { 
            
            var output = `
            <tr>
                <th>Hiện tại: </th>
                <th></th> 
                <th></th>
                <th><i class="fa fa-user"> ${response.total}</i></th>
                <th style="width:30px"></th>   
            </tr>
            <tr>
                <th>Tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Giao dịch gần nhất</th>
                <th>Tỉ lệ thắng</th>
                <th style="width:30px"></th>    
            </tr>`;
            var output_body=``;
            $('#content-customer').html(``);
            response.data.forEach(function (item) {
               output_body+=`
                <tr> 
                    <td><p>${item.customer_name}</p></td>
                    <td><p>${item.customer_phone}</p></td>
                    <td><p>${item.trading_log}</p></td>
                    <td><p>${item.percent_win}</p></td>
                    <td><button type="button" onClick="sales_detail(${item.id_customer})" class="btn btn-primary btn-sm">Chi tiết</button></td>
                </tr>`;
            });
            $('#list_sales').html(output);
            $('#content-customer').html(output_body);
        }
    });
}
function search_sales()
{
    var key_search = $('#key_seach').val();
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'sale_support_customer',type_target:'list_customer', type_manager:'list_customer',filter:key_search,limit:'200'},
        dataType: 'json',
        success: function (response) 
        { 

            var output = `
            <tr>
                <th>Hiện tại: </th>
                <th></th>  
                <th></th>
                <th><i class="fa fa-user"> ${response.total}</i></th>
                <th style="width:30px"></th>   
            </tr>
            <tr>
                <th>Tên khách hàng</th>
                <th>Số điện thoại</th>
                <th>Giao dịch gần nhất</th>
                <th>Tỉ lệ thắng</th>
                <th style="width:30px"></th>    
            </tr>`;
            var output_body=``;
            $('#content-customer').html(``);
            response.data.forEach(function (item) {
               output_body+=`
                <tr> 
                    <td><p>${item.customer_name}</p></td>
                    <td><p>${item.customer_phone}</p></td>
                    <td><p>${item.trading_log}</p></td>
                    <td><p>${item.percent_win}</p></td>
                    <td><button type="button" onClick="sales_detail(${item.id_customer})" class="btn btn-primary btn-sm">Chi tiết</button></td>
                </tr>`;
            });
            $('#list_sales').html(output);
            $('#content-customer').html(output_body);
        }
    });

}