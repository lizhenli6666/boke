$(document).ready(function() {
    $('#login-btn').click(function() {
        let adminname = $('#adminname').val()
        let psd = $('#psd').val()
        $.get(`http://localhost:3000/admin`, { adminname }, function(res) {
            console.log(res);
            if (res.length == 0) {
                alert("用户名不存在！")
            } else {
                if (res[0].psd == psd) {
                    localStorage.setItem("admin", adminname)
                        // alert("登录成功，正在跳转...")
                    location.href = 'index.html'
                } else {
                    alert("密码错误")
                }
            }

        })
    })
})