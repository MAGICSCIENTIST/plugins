////////TODO: 给个参数是否注册全局变量,or no conflict
var formatFunc = function (args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }
    var dataArray = [];
    if (arguments.length == 1) {
        if (typeof (args) == "object") {
            //如果模板参数是对象
            dataArray = [args];
        } else if (args instanceof Array) {
            //如果模板参数是对象数组 
            dataArray = args;
        }
    } else if (arguments.length > 1) {
        dataArray = arguments
    }
    for (let index = dataArray.length - 1; index >= 0; index--) {
        var data = dataArray[index];
        for (var key in data) {
            var value = data[key];
            if (undefined != value) {
                //result = result.replace("{" + key + "}", value);
                result = result.replaceAll("{" + key + "}", value);
            }
        }
    }
    return result;
};

var replaceAllFunc = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.format = formatFunc
String.prototype.replaceAll = replaceAllFunc
