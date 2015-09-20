/**
 * Created by Guo on 2015/9/19.
 */

    var danmu = $('#danmu');
    //初始化
    danmu.danmu({});

    //再添加三个弹幕
    danmu.danmu("addDanmu",[
        { text:"这是滚动弹幕" ,color:"white",size:1,position:0,time:2}
        ,{ text:"这是顶部弹幕" ,color:"yellow" ,size:1,position:1,time:2}
    ]);
    //一个定时器，监视弹幕时间并更新到页面上
    starter();

    function starter(){
        danmu.danmu('danmuStart');
    }
    function pauser(){
        danmu.danmu('danmuPause');
    }
    function resumer(){
        danmu.danmu('danmuResume');
    }
    function stoper(){
        danmu.danmu('danmuStop');
    }
    function getime(){
        alert($('#danmu').data("nowTime"));
    }
    function getpaused(){
        alert($('#danmu').data("paused"));
    }

    //发送弹幕，使用了文档README.md第7节中推荐的方法
    $('#sendForm').submit(function(e){
        e.preventDefault();
        send();
    });

    function send() {
        var text = document.getElementById('text').value;
        var color = document.getElementById('color').value;
        var position = document.getElementById('position').value;
        var time = $('#danmu').data("nowTime")+1;
        var size =document.getElementById('text_size').value;

        var text_obj = {
            text: text,
            color: color,
            size: size,
            position: position,
            time: time
        };

        var comment = {
            content: text,
            time: time,
            datetime: new Date(),
            user: ''
        };
        $.post('/comments', comment).then(function(){
            vComments.comments.push(comment);
            $('#v-comments').animate({scrollTop: $('#v-comments')[0].scrollHeight}, 300);
        }, function(){
            alert('评论失败');
        });
        danmu.danmu("addDanmu", text_obj);
        resumer();
        document.getElementById('text').value='';
    }
    //调整透明度函数
    function op(){
        var op=document.getElementById('op').value;
        $('#danmu').danmu("setOpacity",op/100);
    }

    //调隐藏 显示
    function changehide() {
        //var op = document.getElementById('op').value;
        //op = op / 100;
        var isShow = $('#is-show');

        if (isShow.hasClass('active')) {
            $("#danmu").danmu("setOpacity",1)
            isShow.removeClass('active');
        } else {
            $("#danmu").danmu("setOpacity",0)
            isShow.addClass('active');

        }
    }
    //设置弹幕时间
    function settime(){

        var t=document.getElementById("set_time").value;
        t=parseInt(t)
        $('#danmu').danmu("setTime",t);
        starter();
    }


    // 评论部分
    var vComments = new Vue({
        el: "#v-comments",
        ready: function(){
            $
                .get('/comments')
                .then(function(receivedComments){
                    vComments.comments.splice(0);
                    receivedComments.forEach(function(comment){
                        vComments.comments.push(comment);
                    });
                    $('#v-comments').animate({scrollTop: $('#v-comments')[0].scrollHeight}, 300);
                }, function(){

                });
        },
        data: {
            comments: []
        },
        methods: {

        }
    });

    // 阅读器部分
    //
    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
    //
    var url = 'pdf/0001.pdf';


    //
    // Disable workers to avoid yet another cross-origin issue (workers need
    // the URL of the script to be loaded, and dynamically loading a cross-origin
    // script does not work).
    //
    // PDFJS.disableWorker = true;

    //
    // In cases when the pdf.worker.js is located at the different folder than the
    // pdf.js's one, or the pdf.js is executed via eval(), the workerSrc property
    // shall be specified.
    //
    // PDFJS.workerSrc = '../../build/pdf.worker.js';

    var pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 0.8,
        canvas = document.getElementById('the-canvas'),
        ctx = canvas.getContext('2d');

    /**
     * Get page info from document, resize canvas accordingly, and render page.
     * @param num Page number.
     */
    function renderPage(num) {
        pageRendering = true;
        // Using promise to fetch the page
        pdfDoc.getPage(num).then(function(page) {
            var viewport = page.getViewport(scale);
            canvas.height = viewport.height-13;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);

            // Wait for rendering to finish
            renderTask.promise.then(function () {
                pageRendering = false;
                if (pageNumPending !== null) {
                    // New page rendering is pending
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });
        });

        // Update page counters
        document.getElementById('page_num').textContent = pageNum;
    }

    /**
     * If another page rendering in progress, waits until the rendering is
     * finised. Otherwise, executes rendering immediately.
     */
    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }

    /**
     * Displays previous page.
     */
    function onPrevPage(e) {
        e.preventDefault();
        if (pageNum <= 1) {
            return;
        }
        pageNum--;
        queueRenderPage(pageNum);
    }
    document.getElementById('prev').addEventListener('click', onPrevPage, false);

    /**
     * Displays next page.
     */
    function onNextPage(e) {
        e.preventDefault();
        if (pageNum >= pdfDoc.numPages) {
            return;
        }
        pageNum++;
        queueRenderPage(pageNum);
    }
    document.getElementById('next').addEventListener('click', onNextPage, false);

    /**
     * Asynchronously downloads PDF.
     */
    PDFJS.getDocument(url).then(function (pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page_count').textContent = pdfDoc.numPages;

        // Initial/first page rendering
        renderPage(pageNum);
    });

