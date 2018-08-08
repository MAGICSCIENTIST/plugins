/**工厂类 生成其他组件 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define('viewer', ['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    //your code

    var defOpt = {
    }

    var factory = {
        options: defOpt,
        plugins: []
    };


    factory.addPlugin = function (name, plugin, options) {
        if (this.plugins.filter(x => x.name === name).length > 0) {
            throw "重复注册的ID " + name;
        }

        this.plugins.add(
            {
                name: name,
                plugin: plugin,
                options: options
            }
        );


    }

    factory.create = function (name, options) {

        var res = factory.plugins.filter(x=>x.name)[0]
        if(res){
             return res.plugin(options);
        }else{
            return undefined
        }

    }






    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define('viewer', ['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals.
        if (!window.skyMapPlugins) {
            window.skyMapPlugins = {};
        }
        window.skyMapPluginsFactory = factory;
    }
}))