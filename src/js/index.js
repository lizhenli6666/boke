$(document).ready(function() {
    //传入admin名字
    if (localStorage.getItem("admin")) {
        $('#adminname a').eq(0).html(localStorage.getItem("admin"))
        $('#adminname a').eq(1).show()
    } else {
        $('#adminname a').eq(1).hide()
    }

    //搜索功能
    // GET /posts?title_like=server
    //点击搜索按钮事件
    //退出
    $('#exit').click(function() {
        localStorage.removeItem("admin")
        $('#adminname a').eq(0).html("请登录")
        $('#adminname a').eq(1).hide()
    })
    $('#search-btn').click(function(e) {
            e.preventDefault()
            $('#article-news').hide()
            $('#search-res').show()
            let k = $('#search-input').val()
            console.log(k);
            $.get(`http://localhost:3000/news?title_like=${k}`, {}, function(res) {
                console.log(res);
                html = ''
                $.each(res, function(i, v) {
                    html += ` <li><a href="spe.html?type=${v.type}&&title=${v.title}&&id=${v.id}">${v.title}</a></li>`
                })
                $('#search-res').html("搜索结果为：</br>" + html)
            })
            $.get(`http://localhost:3000/sports?title_like=${k}`, {}, function(res) {
                let htmls = ''
                $.each(res, function(i, v) {
                    htmls += ` <li><a href="spe.html?type=${v.type}&&title=${v.title}&&id=${v.id}">${v.title}</a></li>`
                })
                $('#search-res').append(htmls)
            })
        })
        //oninput事件
    $('#search-input').on("input", (function() {
        let k = $('#search-input').val()
        if (!k) {
            $('#search-datalist').hide()
        }
        $('#search-datalist').show()
        console.log(k);
        $.get(`http://localhost:3000/news?title_like=${k}`, {}, function(res) {
            // $('#article-news').hide()
            let html = ''
            $.each(res, function(i, v) {
                html += ` <li>  <li><a href="spe.html?type=${v.type}&&title=${v.title}&&id=${v.id}">${v.title}</a></li></li>`
            })
            console.log(html);
            $('#search-datalist').html(html)
        })
        $.get(`http://localhost:3000/sports?title_like=${k}`, {}, function(res) {
            let htmls = ''
            $.each(res, function(i, v) {
                htmls += `  <li><a href="spe.html?type=${v.type}&&title=${v.title}&&id=${v.id}">${v.title}</a></li>`
            })
            $('#search-datalist').append(htmls)
        })
    }))
    $('#search-input').blur(function() {
            $('#search-datalist').hide()
        })
        //请求news文章
    $.get(`http://localhost:3000/news`, {}, function(data) {
            console.log(data);
            let html = ''
            $.each(data, function(i, v) {
                html += `
            <li>
            <a href="spe.html?type=${v.type}&&title=${v.title}&&id=${v.id}">  ${i+1}、${v.title}</a>
             <a class="del" article-id="${v.id}" article-type=${v.type}>删除</a>
             <a id="update" article-id="${v.id}" href="update.html?type=${v.type}&&id=${v.id}">修改</a>
            </li>
            `
            })


            $('#article-news').html(html)
            del()
        })
        //点击新闻按钮
    $('#news').click(function() {
        $('#article-news').show()
        $('#search-res').hide()
    })


    $('#nav-top>li').click(function() {
        $('#nav-top>li').each(function(i) {
            $(this).removeClass("active")
        })
        $(this).addClass("active")
    });
    //点击体育按钮
    $('#sports').click(function() {
            $('#search-res').hide()
            $('#article-news').show()
            $.get(`http://localhost:3000/sports`, {}, function(data) {
                console.log(data);
                let html = ''
                $.each(data, function(i, v) {
                    html += `
            <li>
            <a href="spe.html?type=${v.type}&&title=${v.title}&&id=${v.id}"> ${i+1}、${v.title}</a>
            <a class="del" article-id="${v.id}" article-type=${v.type}>删除</a>
             <a id="update" article-id="${v.id}" href="update.html?type=${v.type}&&id=${v.id}">修改</a>
            </li>
            `
                })
                $('#article-news').html(html)
                del()
            })
        })
        //点击新闻按钮
    $('#news').click(function() {
        $.get(`http://localhost:3000/news`, {}, function(data) {
            console.log(data);
            let html = ''
            $.each(data, function(i, v) {
                html += `
            <li>
            <a href="spe.html?type=${v.type}&&title=${v.title}&&id=${v.id}"> ${i+1}、${v.title}</a>
            <a class="del" article-id="${v.id}" article-type=${v.type}>删除</a>
             <a id="update" article-id="${v.id}" href="update.html?type=${v.type}&&id=${v.id}">修改</a>
            </li>
            `
            })
            $('#article-news').html(html)
            del()
        })
    })

    //新闻的删除功能
    function del() {
        $('#article-news .del').click(function() {
            console.log("‘点击了删除按钮");
            let id = $(this).attr("article-id")
            let type = $(this).attr("article-type")
            console.log(id);
            let that = this
            $.ajax({
                type: "DELETE",
                url: ` http://localhost:3000/${type}/${id}`,
                success: function(res) {
                    console.log(res);
                    $(that).parent().remove()
                },
                error: function(error) { console.error(); }
            })
        })
    }
    //

})