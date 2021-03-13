function check_input() {
    var flag = 0;
    var name = $('#username').val();
    var pass = $('#password').val();
    var fullname = $('#fullname').val();
    var email = $('#email').val();
    var sdt = $('#phone').val();
    var strongRegex = new RegExp("^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");

    if (name == '') {
        flag = 1;
        $('#erusername').html('Không được bỏ trống tên đăng nhập')
    } else {
        $('#erusername').html('')
    }
    if (pass == '' || pass.length < 6) {
        flag = 1;
        $('#erpassword').html('Mật khẩu phải ít nhất 6 ký tự')
    } else {
        // if (mediumRegex.test(pass) || strongRegex.test(pass)) {
        //     $('#erpassword').html('')
        // } else {
        //     flag = 1;
        //     $('#erpassword').html('mật khẩu phải bao hồm chữ hoa, chữ thường và số')
        // }
        $('#erpassword').html('')
        if (pass.search(" ") == -1)
            $('#erpassword').html('');
        else {
            flag = 1;
            $('#erpassword').html('Mật khẩu không được có ký tự dấu cách');
        }
    }
    if (fullname == '') {
        flag = 1;
        $('#erfullname').html('Không được bỏ trống họ và tên đầy đủ')
    } else {
        $('#erfullname').html('')
    }
    if (validateEmail(email) || email == "") {
        $('#eremail').html('')

    } else {
        flag = 1;
        $('#eremail').html('Email không hợp lệ');
    }
    if (KT_sodienthoai(sdt) || sdt == "") {
        $('#ersdt').html('')
    } else {
        flag = 1;
        $('#ersdt').html('Số điện thoại phải là 10 số');
    }
    if (flag == 0)
        return true;
    return false;

}
$(document).ready(function() {
   
    $('#detail_customer').on("submit", function(event) {
        event.preventDefault();
        if (check_input() == false) {

        } else {
            $.ajax({
                url: "../admin/account-account",
                method: "post",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token-insert"]').attr('content')
                },
                data: $('#insert_account_form').serialize(),
                success: function(data) {
                    if (data.success == 200) {
                        alert(data.message);
                        show_account();
                        $('#close_modol_insert').click();
                    } else {
                        alert(data.message);
                    }
                }
            });
        }
    });