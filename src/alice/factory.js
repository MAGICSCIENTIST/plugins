/**工厂类 生成其他组件 */

var defOpt = {
}

var factory = {
    options: defOpt,
    plugins: {}
};

var _self = factory;

factory.getPlugin = function (name) {
    
    for (const key in _self.plugins) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            if (element.name === name) {
                return element
            }
        }
    }
}

factory.addPlugin = function (name, plugin) {

    if (_self.getPlugin(name)) {
        throw "重复注册的ID " + name;
    }
    _self.plugins[name] = plugin;

}

// factory.create = function (name, options) {

//     var res = factory.plugins.filter(x => x.name)[0]
//     if (res) {
//         return res.plugin(options);
//     } else {
//         return undefined
//     }

// }




window.skyMapPluginsFactory = _self;

module.exports = _self