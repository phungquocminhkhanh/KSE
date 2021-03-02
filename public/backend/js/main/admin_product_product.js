var array_extra = {};
var product_dis = "";

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function fileValidation() {
    var fileInput = document.getElementById('product_img');
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
                document.getElementById('upload_ed_image').innerHTML = '<img style="width:150px;height:150px;" src="' + e.target.result + '"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}

function fileValidation2() {
    var fileInput = document.getElementById('eproduct_img');
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
                $('#check_upload_image').val(1);
                document.getElementById('eupload_ed_image').innerHTML = '<img style="width:150px;height:150px;" src="' + e.target.result + '"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}




function show_category() {
    let output1 = ""; // output gianh cho lộc sản phẩm theo danh mục hiện trên giao diện chính
    let output2 = ""; //output gianh cho select khi add product
    $.ajax({
        type: "get",
        url: "../admin/product-category",
        dataType: "json",
        success: function(response) {
            output1 += `<li class="active"><a onclick="show_product_in_category(0)">Tất cả</a></li>`;
            $.each(response, function(k, v) {
                output2 += `
                    <option value="${v.id}">${v.category_title}</option>
                `;
                output1 += `<li class="active"><a href="#" onclick="show_product_in_category(${v.id})"><p>${v.category_title}</p></a></li>`;

            });
            output1 += `<li class="active"> <button type="button" onclick="clear_data_pro()" name="x" id="x" data-toggle="modal" data-target="#add_product_Modal" class="btn btn-warning">Thêm sản phẩm</button></li>`
            $("#id_category").html(output2); //select danh mục khi add product
            //select danh mục khi edit product
            $("#content_category").html(output1);

        }
    });
}

function clear_data_pro() {
    $('#product_title').val("");
    $('#product_sales_price').val("");
    $('#product_description').val("");
    $('#product_code').val("");
    $('#product_point').val("");
    $('#upload_ed_image').html('');
}

function show_unit() {
    let output = "";
    $.ajax({
        type: "get",
        url: "../admin/product-product-unit",
        dataType: "json",
        success: function(response) {
            $.each(response, function(k, v) {
                output += `
                    <option value="${v.id}">${v.unit}</option>
                `;

            });
            $("#id_unit").html(output);

        }
    });
}

function show_product_sold_out(disable) {
    console.log(disable);
    product_dis = disable;
    let extra = "";
    let output = "";
    $.ajax({
        type: "post",
        url: "../admin/product-product-seach",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token-seach-sold-out"]').attr('content')
        },
        data: { product_sold_out: product_dis },
        dataType: "json",
        success: function(response) {
            console.log(response);
            $.each(response.data, function(k, v) {
                output += `
                <tr onclick="show_detail_product(${v.id})">
                <td class="product-avatar"><img style="border-radius: 30%;height: 163px;width: 163px;" alt="image" src="../../../${v.product_img}">
                 </td>
                <td> ${v.product_title}
                </td>
                <td> ${numberWithCommas(v.product_sales_price)} VND</td>
                <input type="hidden" id="extra${v.id}" value="${v.product_title}">
                <td class="client-status"><button onclick="edit_product(${v.id})" class="label label-primary" data-toggle="modal" data-target="#edit_product_Modal" >Sửa</button></td>
                <td class="client-status"><button onclick="id_product_extra(${v.id})" class="label label-primary" data-toggle="modal" data-target="#add_product_extra_Modal" >Thêm món kèm</button></td>
                </tr>
                `;


            });
            $.each(array_extra, function(k, e) {
                output += `<input type="hidden" id="extra${e.id}" value="${e.product_title}"></input>`
                extra += `<option value="${e.id}">${e.product_title}</option>`;
            });
            $("#content-product").html(output);
            $("#list_extra").html(extra);
        }
    });
}

function show_product_in_category(id) {
    let output = "";
    let extra = "";
    $("#category_seach_product").val(id); //luu id category tam de gianh cho seach auto
    $.ajax({
        type: "post",
        url: "../admin/product-product-seach",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token-product-seach"]').attr('content')
        },
        data: { id_category: id, product_sold_out: product_dis },
        dataType: "json",
        success: function(response) {
            $.each(response.data, function(k, v) {
                output += `
                <tr onclick="show_detail_product(${v.id})">
                <td class="product-avatar"><img style="border-radius: 30%;height: 163px;width: 163px;" alt="image" src="../../../${v.product_img}">
                 </td>
                <td> ${v.product_title}
                </td>
                <td> ${numberWithCommas(v.product_sales_price)} đ</td>

                <td class="client-status"><button onclick="edit_product(${v.id})" class="label label-primary" data-toggle="modal" data-target="#edit_product_Modal" >Sửa</button></td>
                <td class="client-status"><button onclick="id_product_extra(${v.id})" class="label label-primary" data-toggle="modal" data-target="#add_product_extra_Modal" >Thêm món kèm</button></td>
                </tr>
                `;


            });
            $.each(array_extra, function(k, e) {
                output += `<input type="hidden" id="extra${e.id}" value="${e.product_title}"></input>`
                extra += `<option value="${e.id}">${e.product_title}</option>`;
            });
            $("#content-product").html(output);
            $("#list_extra").html(extra);
        }
    });
}

function edit_product(id) {
    $('#id_product').val(id);
    $('#check_upload_image').val(0);
    let outputcategory = "";
    let outputunit = "";
    $.ajax({
        url: "../admin/product-product/" + id,
        method: "GET",
        success: function(data) {
            if (data.status == 200) {

                $.each(data.product, function(k, v) {
                    $('#eproduct_title').val(v.product_title);
                    $('#eproduct_sales_price').val(v.product_sales_price);
                    $('#eproduct_description').val(v.product_description);
                    $('#eproduct_code').val(v.product_code);
                    $('#eproduct_point').val(v.product_point);
                    $img = `<img style="width:150px;height:150px;" src="../../../${v.product_img}"/>`;
                    $('#eupload_ed_image').html($img);
                    $.each(data.category, function(i, c) {
                        if (c.id == v.id_category)
                            outputcategory += ` <option value="${c.id}" selected>${c.category_title}</option>`;
                        else
                            outputcategory += ` <option value="${c.id}">${c.category_title}</option>`;
                    });
                    $.each(data.unit, function(j, u) {
                        if (u.id == v.id_unit)
                            outputunit += ` <option value="${u.id}" selected>${u.unit}</option>`;
                        else
                            outputunit += ` <option value="${u.id}">${u.unit}</option>`;
                    });
                    $("#eid_unit").html(outputunit);
                    $("#eid_category").html(outputcategory);
                });
            }


        }
    });
}



function show_detail_product(id) {
    $.ajax({
        type: "post",
        url: "../admin/product-product-seach",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token-product-detail"]').attr('content')
        },
        data: { id_product: id },
        dataType: "json",
        success: function(response) {
            var output = "";
            if (response.status == 200) {
                output = `<div id="contact-1" class="tab-pane active">
                                 <div class="row m-b-lg">
                                    <div class="col-lg-12">
                                    <table>
                                        <tr>
                                            <td style="width: 110px;margin-top: 0%;"><strong>Tên sản phẩm&nbsp;</strong></td>
                                            <td>:&nbsp;</td>
                                            <td> ${response.product[0].product_title}</td>
                                        </tr>

                                        <tr>
                                            <td style="width: 110px"><strong>Mã sản phẩm&nbsp;</strong></td>
                                            <td>:&nbsp;</td>
                                            <td> ${response.product[0].product_code}</td>
                                       </tr>
                                       <tr>
                                            <td style="width: 110px"><strong>Giá&nbsp;</strong></td>
                                            <td>:&nbsp;</td>
                                            <td>${numberWithCommas(response.product[0].product_sales_price)} đ</td>
                                       </tr>
                                       <tr>
                                            <td style="width: 110px"><strong>Đơn vị&nbsp;</strong></td>
                                            <td>:&nbsp;</td>
                                            <td>${response.unit[0].unit_title}</td>
                                       </tr>
                                       <tr>
                                            <td style="width: 110px"><strong>Điểm tích lũy&nbsp;</strong></td>
                                            <td>:&nbsp;</td>
                                            <td> ${response.product[0].product_point}</td>
                                       </tr>
                                    </table>







                                    </div>
                                 </div>
                                 <div class="client-detail">
                                    <div class="full-height-scroll">
                                       <strong>Thông tin</strong>
                                       <ul class="list-group clear-list">
                                          <li class="list-group-item">
                                             ${response.product[0].product_description}
                                          </li>
                                       </ul>
                                       <strong>Món ăn kèm</strong>
                                       <ul class="list-group clear-list">`;
                if (response.extra) {
                    $.each(response.extra, function(k, v) {
                        output += `<div id="extra_detail${v.extra_id}"><li class="list-group-item">${v.extra_title}</li>
                        <a onclick="delete_extra_detail(${v.extra_id})">
            <i class="fa fa-times"></i>
            </a><div>
                        `;
                    });
                }

                output += `         </ul>
                <hr/>
                <table>`;
                if (response.product[0].product_sold_out == 'N')
                    output += `<tr id="btn-sold-out-product">
                                 <td> <label>Sản phẩm ngừng bán &nbsp;&nbsp;:</label></td>
                                 <td><button type="button" style="width:80px ;text-align: center;"
                                         onclick="sold_out_product(${response.product[0].id},'Y')"
                                         class="btn btn-danger">Đóng</button></td>
                                 </tr>`;
                else
                    output += `<tr id="btn-sold-out-product">
                    <td> <label>Sản phẩm ngừng bán :</label></td>
                    <td><button type="button" type="button" style="width:80px ;text-align: center;"
                            onclick="sold_out_product(${response.product[0].id},'N')"
                            class="btn btn-secondary">Mở</button></td>
                    </tr>`;

                output += `<tr>
                <td>----</td>
                <td><br /></td>
                </tr>`

                if (response.product[0].product_disable == 'N')
                    output += `<tr id="btn-disable-product">
                                 <td><label>Sản phẩm vô hiệu hóa :</label></td>
                                    <td><button type="button" type="button" style="width:80px ;text-align: center;" onclick="disable_product(${response.product[0].id},'Y')"
                                          class="btn btn-danger">Đóng</button></td>
                             </tr>`;
                else
                    output += `<tr id="btn-disable-product">
                                    <td><label>Sản phẩm vô hiệu hóa</label></td>
                                     <td><button type="button" type="button" style="width:80px ;text-align: center;" onclick="disable_product(${response.product[0].id},'N')"
                                     class="btn btn-secondary">Mở</button></td>
                             </tr>`;


                output += `</table>`
                output += `&nbsp; &nbsp; &nbsp; &nbsp; <button type="button" onclick="delete_product(${response.product[0].id})" class="btn btn-danger">Xóa sản phẩm</button></strong>`
                output += `    </div>

                                        </div>
                                </div>`;

                $('#detail-product').html(output)
            }


        }
    });
}

function sold_out_product(id, status) { // Ngừng bán luôn luôn, ko phải là hôm nay hết nguyên liệu mai bán tiếp

    if (status == 'Y')
        var r = confirm("Bạn có chắc muốn ngừng bán sản phẩm này không !");
    else
        var r = confirm("Bạn có chắc muốn mở lại sản phẩm này không !");
    if (r == true) {
        $.ajax({
            url: "../admin/product-product-sold-out",
            method: "post",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token-sold-out-product"]').attr('content')
            },
            data: { id_product: id, status_product: status },
            success: function(data) {
                if (data.success == 200) {
                    if (data.data[0].product_sold_out == 'N') {
                        $('#btn-sold-out-product').html(`<td><label>Sản phẩm ngừng bán :</label></td><td><button type="button" style="width:80px ;text-align: center;" onclick="sold_out_product(${data.data[0].id},'Y')" class="btn btn-danger">Đóng</button></td></strong>`)
                    } else {
                        $('#btn-sold-out-product').html(`<td><label>Sản phẩm ngừng bán :</label></td><td><button type="button"  style="width:80px ;text-align: center;" onclick="sold_out_product(${data.data[0].id},'N')" class="btn btn-secondary">Mở</button></td></strong>`)
                    }
                    alert("Cập nhật thành công");

                }
            }
        });
    }
}

function disable_product(id, status) {
    if (status == 'Y')
        var r = confirm("Bạn có chắc muốn vô hiệu hóa sản phẩm này không !");
    else
        var r = confirm("Bạn có chắc muốn vô hiệu hóa sản phẩm này không !");
    if (r == true) {
        $.ajax({
            url: "../admin/product-product-disable",
            method: "post",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token-disable-product"]').attr('content')
            },
            data: { id_product: id, status_product: status },
            success: function(data) {
                if (data.success == 200) {
                    if (data.data[0].product_disable == 'N') {
                        $('#btn-disable-product').html(`<td><label>Sản phẩm vô hiệu hóa&nbsp;: </label></td><td><button type="button" style="width:80px ;text-align: center;" onclick="disable_product(${data.data[0].id},'Y')" class="btn btn-danger">Đóng</button></td></strong>`)
                    } else {
                        $('#btn-disable-product').html(`<td><label>Sản phẩm vô hiệu hóa&nbsp;: </label></td><td><button type="button" style="width:80px ;text-align: center;" onclick="disable_product(${data.data[0].id},'N')" class="btn btn-secondary">Mở</button></td></strong>`)
                    }
                    alert("Cập nhật thành công");


                }
            }
        });
    }
}

function seach_auto() {
    $.ajax({
        url: "../admin/product-product-seach-auto",
        method: "POST",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token-seach-auto"]').attr('content')
        },
        data: { key_seach: $('#seach_auto').val(), id_category: $('#category_seach_product').val(), product_sold_out: product_dis }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            let output = "";
            $.each(response.data, function(k, v) {

                output += `
                <tr onclick="show_detail_product(${v.id})">
                <td class="product-avatar"><img style="border-radius: 30%;height: 163px;width: 163px;" alt="image" src="../../../${v.product_img}">
                 </td>
                <td> ${v.product_title}
                </td>
                <td> ${v.product_sales_price} VND</td>
                <input type="hidden" id="extra${v.id}" value="${v.product_title}">
                <td class="client-status"><button onclick="edit_product(${v.id})" class="label label-primary" data-toggle="modal" data-target="#edit_product_Modal" >Sửa</button></td>
                <td class="client-status"><button onclick="id_product_extra(${v.id})" class="label label-primary" data-toggle="modal" data-target="#add_product_extra_Modal" >Thêm món kèm</button></td>
                </tr>
                `;


            });
            $("#content-product").html(output);

        }
    });
}

function delete_product(id) {
    var r = confirm("Bạn có chắc muốn xóa sản phẩm không !");
    if (r == true) {
        $.ajax({
            type: "delete",
            url: "../admin/product-product/" + id,
            data: { id_product: id },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token-delete-product"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                if (response.status == 200) {
                    alert(response.message)
                    show_category();
                    show_product();
                    show_unit();
                }

            }
        });
    }
}

function delete_extra_detail(id) {

    var r = confirm("Bạn có chắc muốn xóa không!");
    if (r == true) {
        $.ajax({
            method: "POST",
            url: "../admin/product-product-delete-extra",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token-delete-extra"]').attr('content')
            },
            data: { extra_id: id },
            dataType: "json",
            success: function(response) {

                if (response.status == 200) {
                    alert(response.message);
                    $('#extra_detail' + id).html('');
                }
            }
        });
    }
}

function show_product() {
    let output = "";
    let extra = "";
    var price = "";
    $.ajax({
        type: "get",
        url: "../admin/product-product",
        dataType: "json",
        success: function(response) {
            array_extra = response;
            $.each(response, function(k, v) {


                output += `
                <tr onclick="show_detail_product(${v.id})">
                <td class="product-avatar"><img style="border-radius: 30%;height: 163px;width: 163px;" alt="image" src="../../../${v.product_img}">
                 </td>
                <td> ${v.product_title}
                </td>
                <td> ${numberWithCommas(v.product_sales_price)} VND</td>
                <input type="hidden" id="extra${v.id}" value="${v.product_title}">
                <td class="client-status"><button onclick="edit_product(${v.id})" class="label label-primary" data-toggle="modal" data-target="#edit_product_Modal" >Sửa</button></td>
                <td class="client-status"><button onclick="id_product_extra(${v.id})" class="label label-primary" data-toggle="modal" data-target="#add_product_extra_Modal" >Thêm món kèm</button></td>
                </tr>
                `;
                extra += `<option value="${v.id}">${v.product_title}</option>`;

            });
            $("#content-product").html(output);
            $("#list_extra").html(extra);

        }
    });

}

function check_input() {
    var flag = 0;
    var title = $('#product_title').val();
    var price = $('#product_sales_price').val();
    var code = $('#product_code').val();
    if (title == '') {
        flag = 1;
        $('#erproduct_title').html('Điền tên sản phẩm')
    } else {
        $('#erproduct_title').html('')
    }
    if (price == '' || price < 0) {
        flag = 1;
        $('#erproduct_sales_price').html('Giá sản phẩm phải >= 0')
    } else {
        $('#erproduct_sales_price').html('')
    }

    if (code == '') {
        flag = 1;
        $('#erproduct_code').html('Điền mã sản phẩm')
    } else {
        $('#erproduct_code').html('')
    }
    if (flag == 0)
        return true;
    return false;
}

function check_edit() {
    var flag = 0;
    var title = $('#eproduct_title').val();
    var price = $('#eproduct_sales_price').val();
    var code = $('#eproduct_code').val();
    if (title == '') {
        flag = 1;
        $('#eerproduct_title').html('Điền tên sản phẩm')
    } else {
        $('#eerproduct_title').html('')
    }
    if (price == '' || price < 0) {
        flag = 1;
        $('#eerproduct_sales_price').html('Giá sản phẩm phải >= 0')
    } else {
        $('#eerproduct_sales_price').html('')
    }

    if (code == '') {
        flag = 1;
        $('#eerproduct_code').html('Điền mã sản phẩm')
    } else {
        $('#eerproduct_code').html('')
    }
    if (flag == 0)
        return true;
    return false;
}

function id_product_extra(id) {
    $('#extra_content').html(" ");
    $('#extra_content').append(`<input type="hidden" name="id_product" value=${id}>`);

}

function delete_extra(id) { // xóa extra được chọn
    var parent = document.getElementById("extra_content");
    var child = document.getElementById('item_extra' + id);
    parent.removeChild(child);
}
$(document).ready(function() {
    product_dis = "N";
    show_category();
    show_product();
    show_unit();
    $('#insert_product_form').on('submit', function(event) {
        event.preventDefault();
        if (check_input() == false) {

        } else {
            $.ajax({
                url: "../admin/product-product",
                method: "POST",
                data: new FormData(this), // su dung khi con file dinh kem
                dataType: 'JSON',
                contentType: false, // su dung khi con file dinh kem
                cache: false, // su dung khi con file dinh kem
                processData: false, // su dung khi con file dinh kem
                success: function(data) {
                    if (data.status == 200) {
                        alert(data.message)
                        show_product();
                        $('#close_modol_insert').click();
                    } else {
                        alert(data.message)
                    }
                }
            })
        }

    });
    $('#insert_product_extra_form').on('submit', function(event) {

        event.preventDefault();
        $.ajax({
            url: "../admin/product-product-extra",
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token-extra"]').attr('content')
            },
            data: $('#insert_product_extra_form').serialize(),
            dataType: 'JSON',
            success: function(data) {
                if (data.status == 200) {
                    alert(data.message)
                    show_product();
                    $('#close_modol_insert_extra').click();
                }
            }
        })
    });

    $('#list_extra').change(function() {
        id = $(this).val();
        var child = document.getElementById('item_extra' + id);
        var listextra = "";
        if (child != null) {} else {
            listextra = `<div id="item_extra${id}"><input value="${id}" type="hidden" name="list_product_extra[]">${$('#extra'+id).val()}<a onclick="delete_extra(${id})" class="close-link">
            <i class="fa fa-times"></i>
            </a><br/></div>`;
            $('#extra_content').append(listextra);
        }

    });

    $('#edit_product_form').on('submit', function(event) {
        event.preventDefault();
        if (check_edit() == false) {

        } else {
            $.ajax({
                url: "../admin/product-product-update",
                method: "POST",
                data: new FormData(this),
                dataType: 'JSON',
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    if (data.status == 200) {
                        alert(data.message)
                        show_product();
                        $('#close_modol_edit').click();
                    } else {
                        alert(data.message)
                    }
                }
            })
        }

    });

});


$(document).on("click", "a", function() {
    $(".clients-list a").css("color", "black");
    $(this).css("color", "red");
});
