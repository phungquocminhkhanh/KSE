function history_period() {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: { detect: "list_period_history" }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            let output = "";
            $.each(response.data, function(k, v) {
                output += `

               `;
            });
            $("#content_period").html(output)

        }
    });
}

function thao_tac_period() {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: { detect: "customer_trade_one_period", id_customer: $('#id_cus').val() }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            let output = "";
            $.each(response.data, function(k, v) {
                output += `

               `;
            });
            $("#content_period").html(output)
        }
    });
}

function trade(type) {
    $.ajax({
        url: urlapi,
        method: "POST",
        data: {
            detect: "customer_trading",
            id_customer: $('#id_cus').val(),
            id_exchange_period: 1,
            trading_bet: $('#money_trade').val(),
            trading_type: type
        }, // chuyen vao bien name vs du lieu cua input do
        dataType: "json",
        success: function(response) {
            let output = "";
            $.each(response.data, function(k, v) {
                output += `

               `;
            });
            $("#content_period").html(output)
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
            if (response.a == 'Yes') {
                //dong trade lai, admin bao tri
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

            } else {

            }
        }
    });
}
$(document).ready(function() {
    console.log($('#id_customer').val());
    show_cus();
});