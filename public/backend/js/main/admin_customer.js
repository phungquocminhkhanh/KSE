 var array_order = {};

 function numberWithCommas(x) {
     x = x.toString();
     var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
         x = x.replace(pattern, "$1,$2");
     return x;
 }

 function show_customer() {}

 function seach_customer() {
     $.ajax({
         url: "../admin/customer-seach",
         method: "POST",
         headers: {
             'X-CSRF-TOKEN': $('meta[name="csrf-token-seach"]').attr('content')
         },
         data: { key_seach: $('#key_seach').val() }, // chuyen vao bien name vs du lieu cua input do
         dataType: "json",
         success: function(response) {
             let output = "";
             $.each(response.data, function(k, v) {
                 output += `
                <tr>
                <td onclick="show_list_order_in_customer(${v.id})"<a data-toggle="tab" href="#contact-1" class="client-link">${v.customer_name}</a></td>
                <td onclick="show_list_order_in_customer(${v.id})">${v.customer_phone}</td>
                <td onclick="show_list_order_in_customer(${v.id})">${v.customer_point}</td>
                <td class="client-status"><button onclick="edit_customer(${v.id})" class="label label-primary" data-toggle="modal" data-target="#edit_customer_Modal" >Sửa</button>
                <button onclick="delete_customer(${v.id})" class="label label-primary">Xóa</button>
                </td>

                </tr>
                `;
             });
             $("#content-customer").html(output)

         }
     });
 }
 $(document).ready(function() {
     //show_customer();
     console.log(urlapi);

 });