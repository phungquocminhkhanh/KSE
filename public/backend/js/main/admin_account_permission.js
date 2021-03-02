function show_permisson() {
    var output = "";
    $.ajax({
        url: "../admin/list-permission",
        method: "get",
        dataType: 'JSON',
        success: function(data) {
            $.each(data, function(k, v) {
                output += `
                    <tr>
                    <td>${v.permission}</td>
                    <td>${v.description}</td>
                    </tr>`;
            });
            $("#content-per").html(output)
        }
    })
}

function show_type() {
    var output = "";
    $.ajax({
        url: "../admin/list-account-type",
        method: "get",
        dataType: 'JSON',
        success: function(data) {
            $.each(data, function(k, v) {
                output += `
                    <tr>
                    <td>${v.type_account}</td>
                    <td>${v.description}</td>
                    </tr>`;
            });
            $("#content-type").html(output)
        }
    })
}

$(document).ready(function() {
    show_permisson();
    show_type();

});