// list sàn
function list_exchange()
{
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'exchange_manager',type_manager:'list_exchange'},
        dataType: 'json',
        success: function (response) 
        {   
            var output =``;
            response.data.forEach(function (item) {
                output +=`
                <tr>
                    <th style="width:20px"></th>
                    <input type="text" id="id_exchange" value="${item.id_exchange}" >
                    <td>${item.exchange_open}</td>
                    <td>${item.exchange_close}</td>
                    <td>${item.exchange_period}</td>
                    <td>${item.exchange_quantity}</td>`;
                    if(item.exchange_active == 'N')
                    output +=`
                    <td>
                    <div class="switch">
                        <div class="onoffswitch">
                            <input type="checkbox" checked="" onChange="service_exchange()" class="onoffswitch-checkbox" id="example1">
                            <label class="onoffswitch-label" for="example1">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
                    </td>`;
                    else
                    output +=`
                    <td>
                    <div class="switch">
                        <div class="onoffswitch">
                            <input type="checkbox" onChange="service_exchange()" class="onoffswitch-checkbox" id="example1">
                            <label class="onoffswitch-label" for="example1">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </div>
                    </td>`;
                    output +=`   
                </tr>`;
            });
            $('#content_session').html(output);
        }
    });
}
// chi tiết sàn
function detail_exchange_trade1()
{
    /// chưa lất được id_exchange
    var id_exchange = $('#id_exchange').val();
    console.log(id_exchange);
    $.ajax({
        url: urlapi, 
        type: 'POST',
        data: {detect:'exchange_manager',type_manager:'detail_exchange_trade',id_exchange:5 },
        dataType: 'json',
        success: function (response) 
        {
            if(response.success == 'false')
            {
                var output =`<tbody>
                <tr>
                    <td><p class="example1"> 0 &nbsp&nbsp<img src="../backend/icon_trading/up.svg" height="18px"></p></td> 
                    <td><p class="example1"> 0 </p></td>
                </tr>
                <tr>
                    <td><p class="example2"> 0 &nbsp&nbsp<img src="../backend/icon_trading/down.svg" height="18px"></p></td> 
                    <td><p class="example2"> 0 </p></td>
                </tr>
            </tbody>`;
            }else{
            var output =`
            <tbody>
                <tr>
                    <td><p class="example1"> ${response.data[0].total_people_up} &nbsp&nbsp<img src="../backend/icon_trading/up.svg" height="18px"></p></td> 
                    <td><p class="example1">${formatNumber(response.data[0].total_money_up)} </p></td>
                </tr>
                <tr>
                    <td><p class="example2"> ${response.data[0].total_people_down} &nbsp&nbsp<img src="../backend/icon_trading/down.svg" height="18px"></p></td> 
                    <td><p class="example2">${formatNumber(response.data[0].total_money_down)} </p></td>
                </tr>
            </tbody>`;
            }

            $('.now_session').html(output);
        }
    });
}
setInterval(function () {
    detail_exchange_trade1();
}, 5000); 
$( document ).ready(function() {
    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear()  + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + (currentdate.getDate() +1)
            
    document.getElementById("myDate1").value = datetime;
    document.getElementById("myDate2").value = datetime;
    
    
    list_exchange();
    detail_exchange_trade1();
});
const formatedTimestamp = ()=> {
    const d = new Date()
    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    return `${date} ${time}`
  }
  var start_time1 = 0;
  var finish_time1 = 0;
  var session_time1 = 0;
function tomorrow_stock()
{
    var currentdate = new Date(); 
    var datetime =currentdate.getFullYear()   + "-"
    + (currentdate.getMonth()+1)  + "-" 
    +  (currentdate.getDate() +1)
    return datetime;
}

function check_text()
{
    var datetime = tomorrow_stock();
   
    var flag = 0;
    var start_time = datetime + ' ' +$('#start_time').val() + ':00';
    var finish_time = datetime + ' ' +$('#finish_time').val() + ':00'; 
    var session_time = $('#session_time').val();
    if($('#start_time').val() == ``)
    {
        var output = `Vui lòng chọn thời gian cụ thể`;
        $('#message_start').html(output);
        flag =1;
    }else{$('#message_start').html(``);}
    if($('#finish_time').val() == ``)
    {
        var output = `Vui lòng chọn thời gian cụ thể`;
        $('#message_finish').html(output);
        flag =1;
    }else{$('#message_finish').html(``);}
    if(finish_time<start_time)
    {
        var output = `Thời gian kết thúc phải lớn hơn thời gian bắt đầu`;
        $('#message_finish').html(output);
        flag =1;
    }else{$('#message_finish').html(``);}
    if(session_time < 2)
    {
        var output = `Mỗi phiên hoạt động tối thiểu là 2 phút`;
        $('#message_session').html(output);
        flag =1;
    }else{$('#message_session').html(``);}
    var start_time1 = Math.floor(Date.parse(start_time)/1000);
    var finish_time1 = Math.floor(Date.parse(finish_time)/1000);
    var session_time1 =session_time*60 ;
    var stock = finish_time1 - start_time1;
    var total_session = Math.floor(stock/session_time1);
    $('#total_session').html(total_session);
    return flag;
}
//cập nhật sàn
function update_stock()
{
     //var exchange_updated_by = id_admin_nguoi cuoi cung update,
    var exchange_open = start_time1;
    var exchange_close = finish_time1;
    var exchange_period = session_time1;
    var id_account = $('#id_account').val();
    var a=check_text();
    if( a == 1)
    {
        alert('Vui lòng chọn mốc thời gian đúng theo quy định')
    }else{ 
        var r = confirm('Bạn có muốn cập nhật thời gian hoạt động của sàn ?')
        if(r=true)
        {
            $.ajax({
                url: urlapi, 
                type: 'POST',
                data: {detect:'exchange_manager',type_manager:'update',id_exchange:1,id_account:1,
                exchange_open:exchange_open,exchange_period:exchange_period,exchange_close:exchange_close},
                dataType: 'json',
                success: function (response) 
                {
                    list_exchange();
                }
            });
        }else{}
        
    }
}
///bảo trì sàn
function service_exchange()
{
    //var exchange_updated_by = id_admin,
    var  active = $('#example1').prop('checked');
    if(active == false)
    {
        var r = confirm('Bạn có muốn bảo trì hệ thống không ?');
        if(r == true)
        {
            $.ajax({
                url: urlapi,    
                type: 'POST',
                data: {detect:'service_exchange', exchange_active:'Y'},
                dataType: 'json',
                success: function (response) 
                {
                    
                }
            });
        }else{ 
            var output =`<div class="onoffswitch">
                            <input type="checkbox" checked="" onChange="service_exchange()" class="onoffswitch-checkbox" id="example1">
                            <label class="onoffswitch-label" for="example1">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                            </label>
                        </div>`;
            $('.switch').html(output); }
    }else{
        
        var r = confirm('Bạn đã sẵn sàng mở bảo trì hệ thống chưa ?');
        if(r == true)
        {
            $.ajax({
                url: urlapi, 
                type: 'POST',
                data: {detect:'service_exchange',exchange_active:'N'},
                dataType: 'json',
                success: function (response) 
                {
                   
                }
            });
        }else{ 
            var output =`<div class="onoffswitch">
                            <input type="checkbox" onChange="service_exchange()" class="onoffswitch-checkbox" id="example1">
                            <label class="onoffswitch-label" for="example1">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                            </label>
                        </div>`;
            $('.switch').html(output); }
    }

}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }