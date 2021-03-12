var list_bank = [];
window.io = io('https://kse-trading.herokuapp.com/', { transport: ['websocket'] });
var money_tam = 0;
io.on('check-result', function(data) {
    console.log(data);
    $('#money_up').html("0");
    $('#money_down').html("0");
    setTimeout(function() {
        show_cus();
    }, 5000)

});

function money(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

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
            limit: 1000,
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {

            let output_history = "";

            if (response.success == "true") {

                $.each(response.data, function(k, v) {
                    if (v.period_result == "up") {
                        output_history += `
                                        <tr>
                                            <td>${v.period_open}-${v.period_close}</td>
                                            <td class="mui_ten_len"><img src="../images/xuong1.png" width="30px" height="25px" alt=""><br /><br /></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">---</td>
                                        </tr>
                                        `;
                    } else {

                        output_history += `
                                        <tr>
                                        <td>${v.period_open}-${v.period_close}</td>
                                            <td class="mui_ten_xuong"><img src="../images/len.png" width="30px" height="25px" alt=""><br /><br /></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">---</td>
                                        </tr>`;
                    }
                });

            }
            $('#content_period').html(output_history);

        }
    });


}


function history_trade(page) {

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
                    if (v.trading_type == 'up') {
                        output_history += `
                                    <tr>
                                        <td>${v.trading_log}  </td>
                                        <td>${v.trading_bet}</td>
                                        <td><img src="../images/len.png" width="30px" height="30px" alt=""></td>
                                    </tr>`;
                    } else {
                        output_history += `
                                    <tr>
                                        <td>${v.trading_log}  </td>
                                        <td>${v.trading_bet}</td>
                                        <td><img src="../images/xuong1.png" width="30px" height="30px" alt=""></td>
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
            type_customer: "customer" // demo thì thay bằng demo
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            console.log(response);
            output_info = `<h4>Tên : ${response.data[0].customer_name} </h4>
                            <h4>Số điện thoại : ${response.data[0].customer_phone}</h4>
                            <h4>Cứu pháp : ${response.data[0].request_syntax}</h4>`

            $("#info_payment").html(output_info);

        }
    });
}

function payment_money() { // ru
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

            } else {
                alert(response.messages)
            }

        }
    });
}
var flag_back = 0;
var page_his = 0;
var flag_date = 0;

function back_history() {
    if (flag_back == 0) {
        if (flag_date == 0) {
            history_payment(page_his);
        } else {
            seach_his(page_his);
        }

    } else {
        history_deposit(page_his);
    }
}

function detail_payment(id) {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_payment_detail",
            id_request: id,
        }, // chuen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            if (response.success == "true") {
                flag_back = 0;
                var detail_his = "";

                detail_his = `
                                <tr class="detail_his">
                                    <td colspan="2" style="text-align: center"><h4>Chi tiết lịch sử giao dịch</h4></td>
                                </tr>
                             <tr class="detail_his">
                                    <td >Trạng thái :</td>
                                    <td >${response.data[0].request_status}</td>
                                </tr>
                                <tr class="detail_his">
                                    <td >Họ tên :</td>
                                    <td >${response.data[0].customer_name}</td>

                                </tr>
                                <tr class="detail_his">
                                    <td >Mã lệnh :</td>
                                    <td >${response.data[0].request_code}</td>
                                </tr>
                                <tr class="detail_his">
                                    <td >Thời gian :</td>
                                    <td >${response.data[0].request_created}</td>
                                </tr>
                                <tr class="detail_his">
                                    <td >Hạn mức :</td>
                                    <td >h${response.data[0].customer_limit_payment}h</td>
                                </tr>
                                <tr class="detail_his">
                                    <td >Rút tiền :</td>
                                    <td >${response.data[0].request_value} VND</td>
                                </tr>
                                <tr class="detail_his">
                                    <td colspan="2"><hr></td>

                                 </tr>
                                <tr class="detail_his">
                                    <td colspan="2" style="text-align: center">Phương thức thanh toán</td>
                                </tr>
                                <tr class="detail_his">
                                    <td>Ngân hàng :</td>
                                    <td></td>
                                </tr>
                                <tr class="detail_his">
                                    <td >Chủ thẻ :</td>
                                    <td >${response.data[0].customer_account_holder}</td>
                                </tr>
                                <tr class="detail_his">
                                    <td >Số tài khoản :</td>
                                    <td >${response.data[0].customer_account_no}</td>
                                </tr>
               `;
                if (response.data[0].request_status == 4) {
                    detail_his += ` <tr class="detail_his">
                                     <td colspan="2" style="text-align: center">Lý do</td>
                                    </tr>
                                <tr class="detail_his">
                                    <td colspan="2" style="text-align: center;color:red;">${response.data[0].request_comment}</td>
                                </tr>`
                }
                $('#history-deal').html(detail_his);
                $('#phantrang').html("");
            }

        }
    });
}

function seach_his(page) {
    ngaybatdau = $('#d_start').val();
    ngayketthuc = $('#d_end').val();
    if (ngaybatdau && ngayketthuc) {
        if (flag_back == 0) //rút tiền
        {
            console.log("seach_rut")
            $.ajax({
                url: urlapi,
                method: "POST",
                data: {
                    detect: "list_request_payment",
                    id_customer: $('#id_customer').val(),
                    type_manager: "customer",
                    date_begin: ngaybatdau,
                    date_end: ngayketthuc,
                    limit: 4,
                    page: page
                }, // chuen vao bien name vs du lieu cua input do
                dataType: "json",
                success: function(response) {
                    page_his = page;
                    console.log(response);
                    if (response.success == "true") {
                        flag_date = 1; // lưu cái nút back, nếu bật flag_date thì khi detail quay về là resul của seach_his
                        var output_his = "";
                        var output_phantrang = "";
                        console.log("rút tiền")
                        $.each(response.data, function(k, v) {
                            output_his += `<tr>
                            <td>
                            <a  onclick="detail_payment(${v.id_request})">
                            <small>Mã : ${v.request_code} </small><br />
                            <small>Rút tiền : -${v.request_value} VND</small><br />
                            <small>${v.request_created}</small></a>`;
                            if (v.request_status == 4)
                                output_his += ` <h4 style = "color: red" > Hủy lệnh </h4>`;
                            if (v.request_status == 3)
                                output_his += ` <h4 style = "color: green" > Hoàn tất </h4>`;
                            if (v.request_status == 2)
                                output_his += ` <h4> Chờ xác nhận </h4>`;
                            if (v.request_status == 1)
                                output_his += ` <h4> Tạo lệnh </h4>`;

                            output_his += `</td> </tr>`;
                        });


                        for (let i = 0; i < response.total_page; i++) {
                            output_phantrang += `<li class="page-item"><a onclick="seach_his(${i+1})" class="page-link" href="#">${i+1}</a></li>`
                        }

                    } else {
                        output_his = "";
                        output_phantrang = "";
                    }
                    $('#phantrang').html(output_phantrang)
                    $('#history-deal').html(output_his);

                }
            });
        } else { // Nạp tiền
            console.log("seach_nạp")
            $.ajax({
                url: urlapi,
                method: "POST",
                data: {
                    detect: "list_request_deposit",
                    id_customer: $('#id_customer').val(),
                    type_manager: "customer",
                    date_begin: ngaybatdau,
                    date_end: ngayketthuc,
                    limit: 4,
                    page: page
                }, // chuen vao bien name vs du lieu cua input do
                dataType: "json",
                success: function(response) {
                    page_his = page;
                    console.log("nạp tiền")
                    if (response.success == "true") {
                        flag_date = 1; // lưu cái nút back, nếu bật flag_date thì khi detail quay về là resul của seach_his
                        var output_his = "";
                        var output_phantrang = "";

                        $.each(response.data, function(k, v) {
                            output_his += `<tr>
                                             <td>
                                                <a>
                                                <small>Mã : ${v.request_code} </small><br />
                                                <small>Nạp tiền : ${money(v.request_value)} VND</small><br />
                                                <small>${v.request_created}</small></a><br /><br />
                                             </td>
                                            </tr>`;
                        });


                        for (let i = 0; i < response.total_page; i++) {
                            output_phantrang += `<li class="page-item"><a onclick="seach_his(${i+1})" class="page-link" href="#">${i+1}</a></li>`
                        }


                    } else {
                        output_his = "";
                        output_phantrang = "";
                    }
                    $('#phantrang').html(output_phantrang)
                    $('#history-deal').html(output_his);

                }
            });
        }

    }
}

function history_payment(page) {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_request_payment",
            id_customer: $('#id_customer').val(),
            type_manager: "customer",
            limit: 4,
            page: page
        }, // chuen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            page_his = page;
            if (response.success == "true") {
                var output_his = "";
                var output_phantrang = "";

                $.each(response.data, function(k, v) {
                    output_his += `<tr>
                    <td>
                    <a  onclick="detail_payment(${v.id_request})">
                    <small>Mã : ${v.request_code} </small><br />
                    <small>Rút tiền : -${v.request_value} VND</small><br />
                    <small>${v.request_created}</small></a>`;
                    if (v.request_status == 4)
                        output_his += ` <h4 style = "color: red" > Hủy lệnh </h4>`;
                    if (v.request_status == 3)
                        output_his += ` <h4 style = "color: green" > Hoàn tất </h4>`;
                    if (v.request_status == 2)
                        output_his += ` <h4> Chờ xác nhận </h4>`;
                    if (v.request_status == 1)
                        output_his += ` <h4> Tạo lệnh </h4>`;

                    output_his += `</td> </tr>`;
                });
                $('#history-deal').html(output_his);

                for (let i = 0; i < response.total_page; i++) {
                    output_phantrang += `<li class="page-item"><a onclick="history_payment(${i+1})" class="page-link" href="#">${i+1}</a></li>`
                }
                $('#phantrang').html(output_phantrang)
            }

        }
    });
}

function history_deposit(page) {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "list_request_deposit",
            id_customer: $('#id_customer').val(),
            type_manager: "customer",
            limit: 4,
            page: page
        }, // chuen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            page_his = page;
            flag_back = 1;
            if (response.success == "true") {
                var output_his = "";
                var output_phantrang = "";

                $.each(response.data, function(k, v) {
                    output_his += `<tr>
                                     <td>
                                        <a>
                                        <small>Mã : ${v.request_code} </small><br />
                                        <small>Nạp tiền : ${money(v.request_value)} VND</small><br />
                                        <small>${v.request_created}</small></a><br /><br />
                                     </td>
                                    </tr>`;
                });
                $('#history-deal').html(output_his);

                for (let i = 0; i < response.total_page; i++) {
                    output_phantrang += `<li class="page-item"><a onclick="history_deposit(${i+1})" class="page-link" href="#">${i+1}</a></li>`
                }
                $('#phantrang').html(output_phantrang)
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
            trading_bet: $('#money_trade').val(),
            trading_type: type
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            if (response.success == "true") {
                let x = Number($('#money_' + type).html())
                let total = Number(x) + Number($('#money_trade').val());
                show_cus();
                $('#money_' + type).html(total);
            } else {
                alert(response.message)
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
                    if (response.data[0].customer_active == "Y") {
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

                $("#customer_wallet").html("Ví tiền : " + money(response.data[0].customer_wallet_bet) + " VND");
                $("#customer_wallet2").html(money(response.data[0].customer_wallet_bet) + " VND");
                $("#customer_wallet_payment").html(money(response.data[0].customer_wallet_payment) + " VND") // tien rut
                money_tam = Number(response.data[0].customer_wallet_bet);

                v = `
                    Ví tài khoản: ${money(response.data[0].customer_wallet_bet)} VND `;

                $("#vitaikhoan").html(v)
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
                    outputbank += ` <option value="${v.id_bank}">${v.bank_short_name}</option>`
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
                if (data.success == 'true') {
                    //show_cus();
                    alert(data.message);
                    show_cus();
                    $('#close_modol_rut_tien').click();
                } else {
                    alert(data.message);
                }
            }
        });

    });
});
$(document).on("click", "#myModal-left a", function() {
    $("#myModal-left a").css("color", "black");
    $(this).css("color", "red");
});
