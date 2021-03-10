function fileValidation() {
    var fileInput = document.getElementById('category_icon');
    var filePath = fileInput.value; //lấy giá trị input theo id
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; //các tập tin cho phép
    //Kiểm tra định dạng
    if (!allowedExtensions.exec(filePath)) {
        alert('Vui lòng upload các icon có định dạng: .jpeg/.jpg/.png/.gif only.');
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('upload_ed_image').innerHTML = '<img style="width:100px;height:70px;" src="' + e.target.result + '"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}

function push_phone() {
    let phone = $("#phone_tam").val();
    $("#customer_phone").val(phone);
    $('#close_modol_phone').click();
    $('#btn_otp').click();
}

function push_otp() {
    $('#close_modol_otp').click();
    $('#btn_new_cus').click();
}
$(document).ready(function() {
    $("#btn_new_cus").hide();
    $("#btn_otp").hide();
    $('#insert_customer_form').on("submit", function(event) {
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
                if (data.success == "true") {
                    alert(data.message);
                    //show_account();
                    //$('#close_modol_insert').click();
                } else {
                    alert(data.message);
                }
            }
        });


    });
});
