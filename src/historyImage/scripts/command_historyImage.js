
//历年影像
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
    var $html = '';
    //配置
    var options = {
        title: '历年影像',
        tilingX: true,
        tilingY: true,
        background: '#21354a',
        hisMap1: null,  //地图对象1
        hisMap2: null,  //地图对象2
        map1Events: [],  //鼠标移入移出地图事件需要修改。
        map2Events: [],
        layerSliders1: [],  //地图对象1需要加载的图层数据，该图层数据也要照顾到slider对应的值。
        layerSliders2: []

    };
    //子类的构造函数
    function historyImage(options) {        
        this.main();
    }    
    //自己的方法
    historyImage.prototype.main = function () {
        var self = this;
        $html = $(self.domNode);

        //加载数据

        //初始化地图对象1，2
        self.options.hisMap1 = mapWrap.createMapObj('his_map1');
        self.options.hisMap2 = mapWrap.createMapObj('his_map2');

        //初始化图层封装对象
        _initLayers(self);
        //将图层添加到地图对象上
        _addHisLayerToMapObj.call(self, self.options.hisMap1, self.options.layerSliders1);
        _addHisLayerToMapObj.call(self, self.options.hisMap2, self.options.layerSliders2);
        //挂载dom事件
        _bindDomEvent.call(self, $html);
        //dom对象和map对象挂载
        self._bindMapEvent(self.options.hisMap1, self.options.hisMap2);

    }
    //重写destory
    historyImage.prototype.destory = function () {
        var self = this;
        $(self.domNode).remove();
    }

    historyImage.prototype._bindMapEvent = function (map1, map2) {
        var self = this;
        $html = $(self.domNode);

        map1.on("mouse-over", function () {
            addMapEvents(map1, map2, self.options.map1Events);
        })
        map1.on("mouse-out", function () {
            removeEvents(self.options.map1Events);
            self.options.map1Events = [];

            $html.find("#fllowImg").css("display", "none");
        })
        map1.on("mouse-move", function (e) {
            var evtScreen = map2.toScreen(e.mapPoint);
            fllowMouse.call(self, evtScreen, true);
        });
        map2.on("mouse-move", function (e) {
            var evtScreen = map1.toScreen(e.mapPoint);
            fllowMouse.call(self, evtScreen, false);
        });

        map2.on("mouse-over", function () {
            addMapEvents(map2, map1, self.options.map2Events);
        })
        map2.on("mouse-out", function () {
            removeEvents(self.options.map2Events);
            self.options.map2Events = [];

            $html.find("#fllowImg").css("display", "none");
        })

    }

    //移入移出map1，map2对象时，需要移除原来的地图事件。
    function removeEvents(mapEvents) {
        for (var i = 0; i < mapEvents.length; i++) {
            mapEvents[i].remove();
        }
    }

    function _initLayers(self) {
        var layer11 = new GoogleMapTileLayer(1, 'GMRaster');
        layer11.setVisibility(false);
        var layerAnno11 = new GoogleMapTileLayer(2, 'GMTagging');
        layerAnno11.setVisibility(false);
        var layer21 = new GoogleMapTileLayer(4, 'GMTerrain');
        layer21.setVisibility(false);
        var layerAnno21 = new GoogleMapTileLayer(3, 'GMBaseMap');
        layerAnno21.setVisibility(false);
        var rasterLayers1 = [
            {
                layers: [layer11, layerAnno11],
                label: '2010年',
                currentValue: 0
            },
            {
                layers: [layer21, layerAnno21],
                label: '2012年',
                currentValue: 1
            }
        ];

        var layer12 = new GoogleMapTileLayer(1, 'GMRaster');
        layer12.setVisibility(false);
        var layerAnno12 = new GoogleMapTileLayer(2, 'GMTagging');
        layerAnno12.setVisibility(false);

        var layer22 = new GoogleMapTileLayer(4, 'GMTerrain');
        layer22.setVisibility(false);
        var layerAnno22 = new GoogleMapTileLayer(3, 'GMBaseMap');
        layerAnno22.setVisibility(false);
        var rasterLayers2 = [
            {
                layers: [layer12, layerAnno12],
                label: '2010年',
                currentValue: 0
            },
            {
                layers: [layer22, layerAnno22],
                label: '2012年',
                currentValue: 1
            }
        ];

        self.options.layerSliders1 = rasterLayers1;
        self.options.layerSliders2 = rasterLayers2;

    }

    function _addHisLayerToMapObj(mapObj, layersSlider) {
        var self = this;
        for (var i in layersSlider) {
            mapObj.addLayers(layersSlider[i].layers);
        }

    }

    function _bindDomEvent($html) {
        var self = this;

        $html.find('#his_map1').on('mouseover', '#his_map1_zoom_slider', function () {
            addMapEvents(self.options.hisMap1, self.options.hisMap2, self.options.map1Events);
        })
        $html.find('#his_map2').on('mouseover', '#his_map2_zoom_slider', function () {
            addMapEvents(self.options.hisMap2, self.options.hisMap1, self.options.map2Events);
        })

        var ticks = [];
        var ticksLabels = [];
        var sliderParams = self.options.layerSliders1;
        for (var i = 0; i < sliderParams.length; i++) {
            ticks.push(i);
            ticksLabels.push(sliderParams[i].label);
        }

        var slider1 = $html.find("#slider1").slider({
            step: 1,
            ticks_tooltip: false,
            tooltip: 'hide',
            value: 0,
            ticks: ticks,
            ticks_labels: ticksLabels,
            ticks_snap_bounds: 1

        }).change(function (obj) {

            changeVisiableLayer(self.options.layerSliders1, obj.value.newValue);
        });
        changeVisiableLayer(self.options.layerSliders1, slider1.slider('getValue'));
        var slider2 = $html.find("#slider2").slider({
            step: 1,
            ticks_tooltip: false,
            tooltip: 'hide',
            ticks: ticks,
            value: 1,
            ticks_labels: ticksLabels,
            ticks_snap_bounds: 1

        }).change(function (obj) {
            changeVisiableLayer(self.options.layerSliders2, obj.value.newValue);
        });

        changeVisiableLayer(self.options.layerSliders2, slider2.slider('getValue'));

    }

    function changeVisiableLayer(layerSliderObj, value) {
        for (var i in layerSliderObj) {
            var tempLayers = layerSliderObj[i].layers;
            if (layerSliderObj[i].currentValue == value) {
                for (var j in tempLayers) {
                    tempLayers[j].setVisibility(true);
                }
            } else {
                for (var j in tempLayers) {
                    tempLayers[j].setVisibility(false);
                }
            }
        }
    }

    //鼠标跟随时的样子
    function fllowMouse(oEvent, isMap2) {
        var self = this;
        $html = $(self.domNode);
        var x = null;
        if (isMap2) {
            x = oEvent.x + $html.find('#his_map2').offset().left;
        } else {
            x = oEvent.x;
        }
        var y = oEvent.y;
        $html.find("#fllowImg").css("display", "block");
        $html.find("#fllowImg").css("left", parseInt(x) + 'px');
        $html.find("#fllowImg").css("top", parseInt(y) + "px");
    }

    function addMapEvents(tempMap1, tempMap2, eventsContainer) {
        var self = this;
        var events1 = tempMap1.on("zoom-end", function () {
            tempMap2.setExtent(tempMap1.extent);
        });
        var events2 = tempMap1.on("pan-end", function () {
            tempMap2.setExtent(tempMap1.extent);
        });
        eventsContainer.push(events1);
        eventsContainer.push(events2);
    }



    // 导出
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        // define('viewer', ['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        module.exports = historyImage
    } else {
        // Browser globals.
        $.fn.extend({historyImage:historyImage});
    }

}))




