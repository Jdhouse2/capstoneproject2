function write_user(userObj){
    $.ajax({
        type: "POST",
        url: '/api/write-user',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(userObj),
        success: function (msg) {
            console.log(msg)
        },
        error: function (e) {
            console.log(e)
        }
    })
}