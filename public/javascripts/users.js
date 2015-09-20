    $("#save").click(function() {
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

    $(function () {
        'use strict';
        // Change this to the location of your server-side upload handler:
        var url = '/upload';
        $('#ppt-upload').fileupload({
            url: url,
            dataType: 'json',
            done: function (e, data) {
//                $.each(data.result.files, function (index, file) {
//                    $('<p/>').text(file.name).appendTo('#files');
//                });
                alert('success');
                $('#myModa2').modal('hide');
                console.log(data.result);
            },
            progressall: function (e, data) {
//                var progress = parseInt(data.loaded / data.total * 100, 10);
//                $('#progress .progress-bar').css(
//                        'width',
//                        progress + '%'
//                );
            }
        });
    });

    //
    var vInfo = new Vue({
        el: "#v-info",
        data: {
            name: 'Seal',
            gender: '男',
            date: new Date(),
            hobby: '苹果和巧克力',
            introduction: '爱PPT爱吐槽，就来有弹幕·PPT资源共享平台~'
        },
        methods: {
            save: function(){
                $('#myModal3').modal('hide');
            }
        }
    });
