import $ from '../../alice/shim/jquery.shim.js'
import UE from '../../alice/shim/ueditor.shim.js'
import __html from '../html/main.html'
import factory from '../../alice/factory.js'
import httpRequestHelper from '../../alice/common/httpRequestHelper.js'
import alertHelper from '../../alice/common/alertHelper.js'
import * as ___ from '../../alice/common/commonHelper.js'

//父类参数，控制显示效果
// var options = {
//     title: '法律法规',
//     tilingX: true,
//     tilingY: true
// };



// var $self = legislation;

//私有方法............................................................


var curLawObj

var defOpt = {
    serverUrlType: "split", //测试用,所有url分开写
    templates: {
        lawItemTemplate: '<li><span code={code}>{name}</span></li>',
    },
    serverUrl: {
        urlBase: "http://101.200.232.210:8020/asmx/Law.asmx/",
        getLaws: "GetLawList",
        getLawDetail: "GetLawByKey",
        delLaw: "DeleteLawByKey",
        addLaw: "AddLaw",
        updateLaw: "UpdateLaw",

    },
    params: {
        getLaws: undefined,
        getLawDetail: undefined,
        delLaw: undefined,
        addLaw: undefined,
        updateLaw: undefined
    }

}

function _getParams(params, defPar, _argument) {
    if (!params) {
        return defPar;
    }
    if (typeof params === "function") {
        var _a = arguments;
        Array.prototype.shift.call(_a);
        Array.prototype.shift.call(_a);
        return params.apply(this, _a);
    } else {
        return params;
    }
}
function _getLoader(action, params) {
    var url;
    var opt = this.options;
    if (opt.serverUrlType === "combine") {
        url = opt.serverUrl.urlBase;
        params = {
            action: action,
            data: params
        }
    } else {
        url = opt.serverUrl.urlBase + action;
    }

    return httpRequestHelper.postRequest(url, params)
}


function _bindEvents($con) {
    var self = this;
    var opt = self.options
    //点击事件触发法律内容改变
    $con.delegate('.law_ul li', 'click', function (e) {
        var $this = $(this);
        if (!$this.hasClass("active")) {
            $this.addClass("active");
            $this.siblings().removeClass("active");

            _loadDetails.call(self, $this.find("span"));
            // _initViewDialog(, title);
        }
    })
}



//加载列表
function _loadLaws() {
    var self = this;
    var opt = self.options;
    var params = _getParams.call(self, opt.params.getLaws)
    return _getLoader.call(self, opt.serverUrl.getLaws, params)
        .catch(x => {
            debugger
            alertHelper.error("初始化失败", x)
        })
        .then(function (result) {
            debugger
            var data = result;
            //$(result).find("string").each(function (i) {

            //    data = $.parseJSON($(this).text());

            //});
            var str = "";
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                str += opt.templates.lawItemTemplate.format({
                    code: item.ID,
                    name: item.BIAOTI
                })
            }
            self.$con.find("ul.law_ul").html(str);
            //默认打开第一个
            // a ? $("span[code=" + a + "]").parent().trigger("click") : $(".law_ul span").first().trigger("click");
        })

}

// 加载详情
function _loadDetails(selLaw) {
    var code = selLaw.attr("code");
    var title = selLaw.text();
    var opt = this.options;
    var self = this;
    var par = _getParams.call(self, opt.params.getLawDetail, { key: code }, selLaw);
    return _getLoader.call(self, opt.serverUrl.getLawDetail, par)
        .catch(x => {
            debugger
            alertHelper.error("详细信息加载失败", x)
        })
        .then(function (result) {
            debugger
            $(result).find("string").each(function (i) {
                curLawObj = $.parseJSON($(this).text());
            });

            $("#BIAOTIVIEW").html(title);
            $("#LEIXINGVIEW").html($self.obj.Result[0].LEIXING);
            $("#LAIYUANVIEW").html($self.obj.Result[0].LAIYUAN);
            $("#FAWEN_ZHVIEW").html($self.obj.Result[0].FAWEN_ZH);
            $("#BANFA_DWVIEW").html($self.obj.Result[0].BANFA_DW);
            $("#BANFA_SJVIEW").html($self.obj.Result[0].BANFA_SJ);
            $("#BEIZHUVIEW").html($self.obj.Result[0].BEIZHU);
            $("#JIANJIEVIEW").html($self.obj.Result[0].JIANJIE);
            $("#NEIRONGVIEW").html(htmlDecode($self.obj.Result[0].NEIRONG));
        })

}

//检查各种设置项正确
function _checkOptions(options) {
    var isOk = true
    if (!options.serverUrl) {
        isOk = false;
        console.error('后台服务url配置不正确')
    }
    return isOk
}

//初始化dom
function _iniDom() {
    if (!this || !this.$con) {
        console.log('初始化未成功')
        return
    }
    this.$con.append(__html);
}


//请求法律法规信息并在查看界面显示
function _initViewDialog(falvfaguiid, title) {
    _getLoader(opt, opt.serverUrl.getLawDetail, op.params.getLawDetail)
        .catch(err => { debugger })
        .then(result => {
            $(result).find("string").each(function (i) {
                $self.obj = $.parseJSON($(this).text());
            });
            $("#BIAOTIVIEW").html(title);
            $("#LEIXINGVIEW").html($self.obj.Result[0].LEIXING);
            $("#LAIYUANVIEW").html($self.obj.Result[0].LAIYUAN);
            $("#FAWEN_ZHVIEW").html($self.obj.Result[0].FAWEN_ZH);
            $("#BANFA_DWVIEW").html($self.obj.Result[0].BANFA_DW);
            $("#BANFA_SJVIEW").html($self.obj.Result[0].BANFA_SJ);
            $("#BEIZHUVIEW").html($self.obj.Result[0].BEIZHU);
            $("#JIANJIEVIEW").html($self.obj.Result[0].JIANJIE);
            $("#NEIRONGVIEW").html(htmlDecode($self.obj.Result[0].NEIRONG));
        })
    $.ajax({
        type: 'post',       //post传值方式
        url: "http://101.200.232.210:8020/asmx/Law.asmx/GetLawByKey",
        data: { key: falvfaguiid },
        dataType: 'json',
        cache: false,
        dataType: 'xml',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) { //执行成功后的额操作
            $(result).find("string").each(function (i) {
                $self.obj = $.parseJSON($(this).text());
            });

            $("#BIAOTIVIEW").html(title);
            $("#LEIXINGVIEW").html($self.obj.Result[0].LEIXING);
            $("#LAIYUANVIEW").html($self.obj.Result[0].LAIYUAN);
            $("#FAWEN_ZHVIEW").html($self.obj.Result[0].FAWEN_ZH);
            $("#BANFA_DWVIEW").html($self.obj.Result[0].BANFA_DW);
            $("#BANFA_SJVIEW").html($self.obj.Result[0].BANFA_SJ);
            $("#BEIZHUVIEW").html($self.obj.Result[0].BEIZHU);
            $("#JIANJIEVIEW").html($self.obj.Result[0].JIANJIE);
            $("#NEIRONGVIEW").html(htmlDecode($self.obj.Result[0].NEIRONG));

        },
        error: function (response) { //执行中出错了
            swal("失败!", "操作失败", "error");
        }
    });

}

//私有方法............................................................




// 注册对象
var legislation = {}
//main
legislation.init = function (selector, options) {


    var $con;
    if (typeof selector == "string") {
        $con = $(selector);
    } else if (selector instanceof $) {
        $con = selector;
    } else {
        $con = $(selector);
    }

    var _opt = $.extend(true, {}, defOpt, options)
    var returnobj = {
        $con: $con,
        //设置项
        options: _opt,
        checkOptions: function () {
            return _checkOptions.call(this, this.options)
        },
        loadLaws: function (params) {
            return _loadLaws.call(this)
        },
        showLawDetail: function () {

        },
        destory: function () {
            return this.options.$con.remove();
        }


    }


    //检查配置项
    if (!returnobj.checkOptions()) {
        return undefined;
    };

    //初始化dom
    debugger
    _iniDom.call(returnobj);

    //绑定事件
    _bindEvents.call(returnobj, $con)

    //加载
    returnobj.loadLaws();

    return returnobj;





    // var obj;//保存法律详情
    $self.obj = {};
    var type; //添加或者编辑



    //列表展示
    function new_list(a) {

        //$.get(appConfig.sysInfo.sysServiceUrl + "Law.asmx/GetLawList", function (result) {
        //    var data;
        //    $(result).find("string").each(function (i) {

        //        data = $.parseJSON($(this).text());

        //    });
        //    var str = "";
        //    for (var i = 0; i < data.length; i++) {
        //        str += "<li ><span code='" + data[i].ID + "'>" + data[i].BIAOTI + "</span></li>"
        //    }
        //    $("ul.law_ul").html(str);
        //    //默认打开第一个
        //    a ? $("span[code=" + a + "]").parent().trigger("click") : $(".law_ul span").first().trigger("click");
        //})

        access.getSYSData("Law.asmx/GetLawList", JSON.stringify({ SYS_ID: getSysID() }), false, function (result) {
            var data = result.data;
            //$(result).find("string").each(function (i) {

            //    data = $.parseJSON($(this).text());

            //});
            var str = "";
            for (var i = 0; i < data.length; i++) {
                str += "<li ><span code='" + data[i].ID + "'>" + data[i].BIAOTI + "</span></li>"
            }
            $("ul.law_ul").html(str);
            //默认打开第一个
            a ? $("span[code=" + a + "]").parent().trigger("click") : $(".law_ul span").first().trigger("click");
        });
    }
    new_list();


    //初始化时间日期框
    $("input[name='BANFA_SJ']").datetimepicker({ format: 'YYYY-MM-DD' });
    $("input[name='SHIXIAO_SJ']").datetimepicker({ format: 'YYYY-MM-DD' });
    //添加，编辑，删除


    //富文本编辑器
    UE.getEditor('law_Editor', {
        //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
        toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'insertimage', 'emotion', 'attachment', 'insertframe', 'insertcode', 'pagebreak', 'template', 'background', '|',
            'horizontal', 'date', 'time'
        ]],
        //focus时自动清空初始化时的内容
        autoClearinitialContent: true,
        //关闭字数统计
        wordCount: false,

        //浮动时工具栏距离浏览器顶部的高度，用于某些具有固定头部的页面
        autoFloatEnabled: false,
        /* topOffset:246,*/

        //关闭elementPath
        elementPathEnabled: false,
        //默认的编辑区域高度
        initialFrameHeight: 300,
        //更多其他参数，请参考ueditor.config.js中的配置项
    })

    //点击增加
    $("#add_news").click(function () {
        type = "add";
        $(".law_mark").show();

    })
    //点击编辑
    $("#edit_news").click(function () {
        type = "edit";
        $(".law_mark").show();

        $("input[name='BIAOTI']").val($self.obj.Result[0].BIAOTI);
        $("input[name='LEIXING']").val($self.obj.Result[0].LEIXING);
        $("input[name='LAIYUAN']").val($self.obj.Result[0].LAIYUAN);
        $("input[name='FAWEN_ZH']").val($self.obj.Result[0].FAWEN_ZH);
        $("input[name='BANFA_DW']").val($self.obj.Result[0].BANFA_DW);
        $("input[name='BANFA_SJ']").val($self.obj.Result[0].BANFA_SJ);
        $("input[name='BEIZHU']").val($self.obj.Result[0].BEIZHU);
        $("input[name='SHIXIAO_SJ']").val($self.obj.Result[0].SHIXIAO_SJ);
        $("input[name='JIANJIE']").val($self.obj.Result[0].JIANJIE);
        UE.getEditor('law_Editor').setContent(htmlDecode($self.obj.Result[0].NEIRONG));

    })
    //点击删除
    $("#delete_news").click(function () {



        swal({
            title: "您确定要删除吗？此操作不可恢复!",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "删除",
            cancelButtonText: "取消",

        }, function () {

            $.ajax({
                url: appConfig.sysInfo.sysServiceUrl + "Law.asmx/GetLawList",

            }).done(function (data) {

                $.post(appConfig.sysInfo.sysServiceUrl + "Law.asmx/DeleteLawByKey", { id: $("ul.law_ul li.active span").attr("code") }, function (res) {
                    new_list();
                })

                swal("成功!", "删除成功", "success");

            }).error(function (data) {

                swal("失败", "删除失败", "error");

            });

        });

    });
    //鼠标滚动监听
    /*$(window).mousewheel(function(){
    	
    	
    })*/


    //获取表单值
    function getFromValue() {
        var d = {};
        var t = $('from.news input').serializeArray();
        $.each(t, function () {
            d[this.name] = this.value;
        });
        d.NEIRONG = UE.getEditor('law_Editor').getContent();
        return d;
    }
    //弹出框
    //关闭editor
    $("div .close").click(function () {
        $(".law_mark").hide();
        $("from.news input").val("");
        UE.getEditor('law_Editor').setContent("");
    })
    //点击取消
    $(".cancel").click(function () {
        $(".law_mark").hide();
        $("from.news input").val("");
        UE.getEditor('law_Editor').setContent("");
    })
    //点击确定
    $(".sure").click(function () {

        if (!/^\S/g.test($("input[name='BIAOTI']").val())) {
            //标题为空
            swal("失败!", "标题为空", "error");

        } else {

            $(".law_mark").hide();
            var value = {};
            value.json = getFromValue();
            var url;
            if (type == "add") {

                url = "AddLaw";
            } else {
                url = "UpdateLaw";
                value.json.id = $("ul.law_ul li.active span").attr("code");
            }
            value.json.NEIRONG = htmlEncode(value.json.NEIRONG);
            $.ajax({
                type: 'post',       //post传值方式
                url: appConfig.sysInfo.sysServiceUrl + "Law.asmx/" + url,
                data: { json: JSON.stringify(value.json) },
                cache: false,
                dataType: 'xml',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (result) { //执行成功后的额操作

                    new_list();
                    type == "add" ? new_list() : new_list($("ul.law_ul li.active span").attr("code"));

                    $("from.news input").val("");
                    UE.getEditor('law_Editor').setContent("");

                    swal("成功!", "保存成功", "success");
                },
                error: function (response) { //执行中出错了
                    swal("失败!", "操作失败", "error");
                }
            });

        }

    })
}
//destory
legislation.destory = function () {

    legislation.options = defOpt;
    //remove yourself
    $("#legislation-context").remove();
}








factory.addPlugin("legislation", legislation)

module.exports = legislation
