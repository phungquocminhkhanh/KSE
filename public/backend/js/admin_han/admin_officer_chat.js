
var arr=[];
$( document ).ready(function() {
    list_officer_chat();
});
function list_officer_chat()
{
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'officer_support',type_manager:'list_support',limit:'100'},
        dataType: 'json',
        success: function (response) 
        { 
            var output =``;
            var tam="";
            let i=0;
            response.data.forEach(function (item) {
                arr.push(item);
               if (item.support_status != "finished"){
                    output +=`
                    <tr>
                        <td style="width:30px;"></td>
                        <td>${item.customer_name}</td>
                        <td>${item.support_request}</td>
                        <td><button onClick="detail_officer_chat(${i})"
                         class="btn btn-info btn-sm" ><i class="fa fa-info"></i> Chi tiết</button></td>
                    </tr>`;
                }
                i++;
            });
            $('#content_officer_chat').html(output);
        }
    });
}
function detail_officer_chat(item)  
{
    var id  = arr[item].id_support_customer;
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'officer_support',type_manager:'processing', id_support_customer:id},
        dataType: 'json',
        success: function (response) 
        { 
            list_officer_chat();
        }
    });
    
    var output_header =`
    <center><h1><i class="fa fa-user"></i></h1></center>
        <center><h2><strong>${arr[item].customer_name}</strong></h2> </center>
        <center><h3><strong>${arr[item].customer_phone} </strong></h3> </center>
        <hr>`;
    var output_list_chat =  `
        <table>
            <tr >
                <td><p class="example1"> ${arr[item].support_request} </p></td>                              
            </tr>
            <tr >
                <td><p class="example1"> ${arr[item].support_category} </p></td>                              
            </tr>
        </table>`;
    var output_finish_chat =`<button class="btn btn-danger btn-lg btn-block" onClick="finish_support(${id})"> Kết thúc </button>`;
    $('#btn_finish').html(output_finish_chat);
    $('#contact-1').html(output_header);
    $('#content-order').html(output_list_chat);
}
function finish_support(id)
{
    console.log(id);
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: {detect:'officer_support' , type_manager:'finished', id_support_customer:id,},
        dataType: 'json',
        success: function (response) 
        {
            list_officer_chat();
        }
    });

}