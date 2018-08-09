/* global jQuery:false, $:false */

var _$ = jQuery || $;

var pluginName = "some skymap plugins";
if (_$ == null && console && console.error) {
    console.error(
        pluginName + ': An instance of jQuery or a jQuery-compatible library was not ' +
        'found. Make sure that you are including jQuery before ' + pluginName + ' on your web page.'
    );
}

module.exports = _$