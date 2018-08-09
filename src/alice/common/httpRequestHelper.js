
var httpRequestHelper = {
    defOpt: {
        async: true,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

    },
    postRequest: function (url, params, options, isShowError) {
        var opt = $.extend(true, {}, this.defOpt, options)
        opt.url = url;
        opt.data = params;
        return new Promise(function (res, rej) {
            $.ajax(opt)
                .catch(function (err) {
                    debugger
                    //TODO: showErr
                    rej(err)
                })
                .then(function (x) {
                    if (opt.dataType == 'json') {
                        res(JSON.parse(x.d))
                    }
                })
        })
    },
}
module.exports = httpRequestHelper;