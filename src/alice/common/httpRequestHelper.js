
var httpRequestHelper = {
    defOpt: {
        async: true,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        cache: false,
    },
    postRequest: function (url, params, options, isShowError) {
        var opt = $.extend(true, {}, this.defOpt, options)
        opt.url = url;
        opt.data = params;
        opt.type = "POST";

        return new Promise(function (res, rej) {
            if (opt.contentType.indexOf("application/json")!=-1 && typeof opt.data === "object") {
                opt.data = JSON.stringify(opt.data);
            }

            var _op = $.ajax(opt);
            var c = (_op.error ? _op.error : _op.catch) //不同 $ 版本, 异常捕获的方法不一样...
            c(err => {
                //TODO: showErr
                rej(err)
            })
            _op.then(function (x) {
                if (opt.dataType == 'json') {
                    res(JSON.parse(x.d))
                } else {
                    res(x)
                }
            })
        })
    },
}
module.exports = httpRequestHelper;