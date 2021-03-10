var list_bank = [];

function fileValidation() {
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
                document.getElementById('upload_ed_image').innerHTML = '<img style="width:150px;height:150px;" src="' + e.target.result + '"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}

function history_period() {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_period_result",
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {

            let output_history = "";
            if (response.success == "true") {
                $.each(response.data, function(k, v) {
                    if (1 == 1) {
                        output_history += `
                                    <tr>
                                        <td>${v.trading_log}</td>
                                        <td><img src="{{ asset('images/len.png') }}" width="30px" height="30px" alt=""></td>
                                    </tr>`;
                    } else {
                        output_history += `
                                    <tr>
                                        <td>${v.trading_log}</td>
                                        <td><img src="{{ asset('images/xuong1.png') }}" width="30px" height="30px" alt=""></td>
                                    </tr>
                                    `;
                    }
                });

            } else {

            }
            $('#content_period').html(output_history);

        }
    });


}


function thao_tac_period() {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_period_result",
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {

            let output_history = "";
            if (response.success == "true") {
                $.each(response.data, function(k, v) {
                    if (1 == 1) {
                        output_history += `
                                    <tr>
                                        <td>${v.trading_log}</td>
                                        <td><img src="{{ asset('images/len.png') }}" width="30px" height="30px" alt=""></td>
                                    </tr>`;
                    } else {
                        output_history += `
                                    <tr>
                                        <td>${v.trading_log}</td>
                                        <td><img src="{{ asset('images/xuong1.png') }}" width="30px" height="30px" alt=""></td>
                                    </tr>
                                    `;
                    }
                });

            } else {

            }
            $('#content_period').html(output_history);

        }
    });


}


function thao_tac_period() {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "customer_trade_one_period",
            id_customer: $("#id_cus").val(),
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {

            let output_history = "";
            if (response.success == "true") {
                $.each(response.data, function(k, v) {
                    if (1 == 1) {
                        output_history += `
                                    <tr>
                                        <td>${v.trading_log}</td>
                                        <td><img src="{{ asset('images/len.png') }}" width="30px" height="30px" alt=""></td>
                                    </tr>`;
                    } else {
                        output_history += `
                                    <tr>
                                        <td>${v.trading_log}</td>
                                        <td><img src="{{ asset('images/xuong1.png') }}" width="30px" height="30px" alt=""></td>
                                    </tr>
                                    `;
                    }
                });

            } else {

            }
            $('#content_period').html(output_history);
        }
    });
}

function profile_customer() {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_customer_detail",
            id_customer: $("#id_cus").val(),
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {

            if (response.success == "true") {

                $("#customer_introduce").val(response.data[0].customer_introduce)
                $("#customer_names").val(response.data[0].customer_name)
                $("#customer_phone").val(response.data[0].customer_phone)
                $("#customer_cert_no").val(response.data[0].customer_cert_no)
                out = `<img src="${urlserver+response.data[0].customer_cert_img}" width="150px" height="100%" alt="">`;
                $("#cmnd_mattruoc").html(out);


                //phuong thuc thanh toan
                $("#customer_account_no").val(response.data[0].customer_account_no)
                $("#customer_account_holder").val(response.data[0].customer_account_holder)
                image_payment = `<img src="${urlserver+response.data[0].customer_account_img}" width="150px" height="150px" alt="">`;
                $("#upload_ed_image").html(image_payment)

                outputbank = "";
                $.each(list_bank, function(k, v) {
                    if (v.id == response.data[0].id_bank)
                        outputbank += `<option value="${v.id}" selected>${v.bank_short_name}</option>`;
                    else
                        outputbank += `<option value="${v.id}" >${v.bank_short_name}</option>`;
                });
            }

        }
    });
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "customer_request_deposit",
            id_customer: $("#id_cus").val(),
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            output_info = `<h4>Tên : ${response.data[0].customer_name} </h4>
                            <h4>Số điện thoại : ${response.data[0].customer_phone}</h4>
                            <h4>Cứu pháp : ${response.data[0].request_syntax}</h4>`

            $("#info_payment").html(output_info);
        }
    });
}

function payment_money() {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "customer_request_payment",
            id_customer: $('#id_customer').val(),
            request_value: $('#id_customer').val(),
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            if (response.success == "true") {
                console.log("Bạn đã cược thành công")
            } else {
                alert(response.messages)
            }

        }
    });
}

function trade(type) {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "customer_trading",
            id_customer: $('#id_customer').val(),
            id_exchange_period: 1,
            trading_bet: $('#money_trade').val(),
            trading_type: type
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            if (response.success == "true") {
                console.log("Bạn đã cược thành công")
            } else {
                alert(response.messages)
            }

        }
    });
}



function check_bao_tri() // tra ve yes no
{
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "customer_check_service",
            id_customer: $('#id_cus').val(),
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            if (response.success == 'true') {
                {
                    if (response.data[0].customer_active = "Y") {
                        $('#tradeup').prop('disabled', true);
                        $('#tradedown').prop('disabled', true);
                    }
                }

            } else {

            }
        }
    });
}

function show_cus() {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_customer_detail",
            id_customer: $('#id_customer').val(),
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            if (response.success == 'true') {

                $("#customer_wallet").html("Ví demo : " + response.data[0].customer_wallet_bet + " VND");
                $("#customer_wallet2").html(response.data[0].customer_wallet_bet + " VND");
            } else {

            }
        }
    });
}

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
    show_cus();
    check_bao_tri();
    profile_customer();
    get_list_bank();
    $('#form_phuong_thuc_thanh_toan').on("submit", function(event) {
        event.preventDefault();
        $.ajax({
            url: urlapi,
            method: "post",
            data: new FormData(this),
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                if (data.success == 'true') {
                    alert(data.message);
                    $('#close_modol_funciton_payment').click();
                } else {
                    alert(data.message);
                }
            }
        });
    });
    $('#rut_tien_form').on("submit", function(event) {
        event.preventDefault();
        $.ajax({
            url: urlapi,
            method: "post",
            data: $('#rut_tien_form').serialize(),
            success: function(data) {
                // if (data.success == 'true') {
                //     //show_cus();
                //     alert(data.message);
                //     $('#close_modol_rut_tien').click();
                // } else {
                //     alert(data.message);
                // }
                console.log(1);
            }
        });

    });
});
