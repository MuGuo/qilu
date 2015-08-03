/**
 * Created by Amy on 2015/8/3.
 */
$("#land-save").click(function() {
    var name = $("#name").val();
    var password = $("#password").val();
    console.log(name);
    console.log(password);
    $.post('/land', {name: name,password: password}, function(result) {
        console.log(result);
        if (result.message == 'success') {
            $("#myModal").modal("hide");
        } else {
            alert('用户名或密码错误');
        }
    });
});

$("#register-save").click(function() {
    var email = $("#email").val();
    var password1 = $("#password1").val();
    var password2 = $("#password2").val();
    if(password1 == password2) {
        $.post('/register', {email:email,password: password1}, function(result) {
            console.log(result);
            if (result.message == 'success') {
                alert('注册成功');
            } else {
                alert('邮箱被注册过了');
            }
        });
    }
    else {
        alert('两次输入的密码不同');
    }
});
