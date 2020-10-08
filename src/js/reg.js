$(document).ready(function() {
    $('#reg-btn').click(function() {
        let adminname = $('#adminname').val()
        let psd = $('#psd').val()
        let tel = $('#telephone').val()
        $.post(`http://localhost:3000/admin`, { adminname, psd, tel }, function(res) {
            console.log(res);
            // alert("注册成功，正在跳转...")
            location.href = 'login.html'
        })
    })
})