 var array_order = {};

 function fileValidation() {
     var fileInput = document.getElementById('customer_cert_img');
     var filePath = fileInput.value; //lấy giá trị input theo id
     var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; //các tập tin cho phép
     //Kiểm tra định dạng
     if (!allowedExtensions.exec(filePath)) {
         alert('Vui lòng thêm các icon có định dạng: .jpeg/.jpg/.png/.gif only.');
         fileInput.value = '';
         return false;
     } else {
         //Image preview
         if (fileInput.files && fileInput.files[0]) {
             var reader = new FileReader();
             reader.onload = function(e) {
                 document.getElementById('cert_img').innerHTML = '<img style="width:150px;height:150px;" src="' + e.target.result + '"/>';
             };
             reader.readAsDataURL(fileInput.files[0]);
         }
     }
 }

 function fileValidation2() {
     var fileInput = document.getElementById('customer_account_img');
     var filePath = fileInput.value; //lấy giá trị input theo id
     var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; //các tập tin cho phép
     //Kiểm tra định dạng
     if (!allowedExtensions.exec(filePath)) {
         alert('Vui lòng thêm các icon có định dạng: .jpeg/.jpg/.png/.gif only.');
         fileInput.value = '';
         return false;
     } else {
         //Image preview
         if (fileInput.files && fileInput.files[0]) {
             var reader = new FileReader();
             reader.onload = function(e) {
                 document.getElementById('payment_img').innerHTML = '<img style="width:150px;height:150px;" src="' + e.target.result + '"/>';
             };
             reader.readAsDataURL(fileInput.files[0]);
         }
     }
 }

 function numberWithCommas(x) {
     x = x.toString();
     var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
         x = x.replace(pattern, "$1,$2");
     return x;
 }

 function show_customer() {
     $.ajax({
         url: urlapi,
         method: "POST",
         data: { detect: 'list_customer_customer' }, // chuyen vao bien name vs du lieu cua input do
         dataType: "json",
         success: function(response) {
             output = "";
             console.log(response.data);
             $.each(response.data, function(k, v) {
                 output += `
                 <tr>
                 <th style="width:2%;"></th>
                 <td>${v.customer_name}</td>
                 <td>${v.customer_phone}</td>
                 <td>${v.customer_cert_no}</td>


                 <td><button type="button"  class="btn btn-secondary btn-sm"><i class="fa fa-history"></i></button> &nbsp <button type="button" data-toggle="modal" data-target="#detail_customer" class="btn btn-secondary btn-sm"><i class="fa fa-pencil-square"></i></button></td>
             </tr>
                `;

             });
             $("#content-customer").html(output)
         }
     });
 }

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
 var list_bank = [];

 function get_list_bank() {
     $.ajax({
         url: urlapi,
         method: "POST",
         data: {
             detect: "list_bank",
         },
         dataType: "json",
         success: function(response) {
             let outputbank = ``;
             if (response.success == 'true') {
                 list_bank = response.data;
                 $.each(response.data, function(k, v) {
                     outputbank += `<option value="${v.id_bank}">${v.bank_short_name}</option>`
                 });
                 $('#id_bank').html(outputbank);
             } else {

             }

         }
     });
 }
 $(document).ready(function() {
     show_customer();
     get_list_bank();
     $('#insert_customer_form').on("submit", function(event) {
         event.preventDefault();
         //  if (check_input() == false) {

         //  } else {
         $.ajax({
             url: urlapi,
             method: "post",
             data: new FormData(this),
             dataType: 'JSON',
             contentType: false,
             cache: false,
             processData: false,
             success: function(data) {
                 if (data.success == "true") {
                     alert(data.message);
                     show_account();
                     $('#close_modol_insert').click();
                 } else {
                     alert(data.message);
                 }
             }
         });
         //}


     });
 });
