/**
 * Created by Amy on 2015/8/3.
 */
$("#land-save").click(function() {
    var name = $("#userdata").val();
    $.post('/users/info', {name: name}, function(result) {
        console.log(result);
        if (result.message == 'success') {
            $("#myModal").modal("hide");
        } else {
            alert('error');
        }
    });
});
