/* global ueditor:false, UE:false */

var _$ = UE;

var pluginName = "some skymap plugins";
var libName = "UEditor"
if (_$ == null && console && console.error) {
    console.error(
        pluginName + ': An instance of ' + libName + ' or a ' + libName + '-compatible library was not ' +
        'found. Make sure that you are including ' + libName + ' before ' + pluginName + ' on your web page.'
    );
}

module.exports = _$