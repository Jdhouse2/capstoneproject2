
$.ajax({
    type: "GET",
    url: ['INSERT PATH HERE'],
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    /*data: [INSERT DATA HERE],*/
    success: function (msg) {
        console.log('success')
        console.log(msg)
    },
    error: function (e) {
        console.log('failure')
        console.log(e)
    }
})