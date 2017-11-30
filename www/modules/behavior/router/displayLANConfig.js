define(function(require, exports, module) {
    var DATA = {};
    function tl(str){
        return require('Translate').getValue(str,['common','lanConfig']);
    }
    var Tips = require('Tips');
    /**
     * 循环读取系统是否保存完毕 
     * oldip ： 编辑前的默认ip
     * newip ：编辑后的ip
     */
    function interval(oldip,newip){
        /* 提示用户等待配置保存 */
        var timer = Tips.showTimer('{WaitForSaveConfig}',20,function(){
            /**
             *  判断是否为远程访问
             */
            var befo = 'http';
            if(location.href.substr(0,5) == 'https'){
                befo = 'https';
            }
            if(location.href.indexOf(oldip)>=0){
                if(newip){
                    location.href = befo+"://"+ newip+"/noAuth/login.html";
                }else{
                    location.href = befo+"://"+ location.host+"/noAuth/login.html";
                }

            }else{
                /* 远程 */
                location.href = befo+"://"+ location.host+"/noAuth/login.html";
            }
        });
        var signstr = false;
        var setin1;
        setTimeout(function(){
            setin1 = setInterval(function(){
                $.ajax({
                    url: '/noAuth/noAuthAspOut.asp?optType=lang',
                    type: 'get',
                    success: function(result) {
                        eval(result);
                        if(status){
                            //							thisip = lanIp;
                            signstr = true;
                        }

                    }
                });
            },1000);
        },5000)

        var setin2 = setInterval(function(){
            if(signstr){
                clearInterval(setin1);
                clearInterval(setin2);
                timer.stop(true);
            }
        },500);
    }


    function getLeftInputGroup() {
        var inputList = [
            {
                "prevWord":"类型",
                "inputData":{
                    "type":'select',
                    "name":"type",
                    value:DATA.type || '',
                    items:[
                        {name:"动态获取", value:"dhcp"},
                        {name:"静态IP", value:"static"}
                    ]
                },
                "afterwords":''
            },
            {
                "sign":"static_dhcp",
                "prevWord":"IP地址",
                "inputData":{
                    "type":'text',
                    "name":"lanIp",
                    value:DATA.lanIp || '',
                    "checkFuncs" : ['checkIP']
                },
                "afterwords":''
            },
            {
                "sign":"static_dhcp",
                "prevWord":"子网掩码",
                "inputData":{
                    "type":'text',
                    "name":"netMask",
                    value:DATA.netMask || '',
                    "checkFuncs" : ['re_checkMask']
                },
                "afterwords":''
            },
            {
                "sign":"static_dhcp",
                "prevWord":"网关地址",
                "inputData":{
                    "type":'text',
                    "name":"gateway",
                    value:DATA.gateway || '',
                    "checkFuncs" : ['checkIP']
                },
                "afterwords":''
            },
            {
                "sign":"static_dhcp",
                "prevWord":"DNS服务器",
                "inputData":{
                    "type":'text',
                    "name":"dns",
                    value:DATA.dns || '',
                    "checkFuncs" : ['checkIP']
                },
                "afterwords":''
            },
            {
                "prevWord":"MAC地址",
                "inputData":{
                    "type":'text',
                    "name":"mac",
                    value:DATA.lanMac || '',
                },
                "afterwords":''
            },
        ]

        var InputGroup = require('InputGroup'),
            $dom = InputGroup.getDom(inputList);

        $dom.find("[name=mac]").attr('disabled', true);

        function text_input(){
            if($dom.find("[name=type]").val() == 'dhcp'){
                $dom.find("[name=lanIp]").attr('disabled', true);
                $dom.find("[name=netMask]").attr('disabled', true);
                $dom.find("[name=gateway]").attr('disabled', true);
                $dom.find("[name=dns]").attr('disabled', true);
            }else{
                $dom.find("[name=lanIp]").attr('disabled', false);
                $dom.find("[name=netMask]").attr('disabled', false);
                $dom.find("[name=gateway]").attr('disabled', false);
                $dom.find("[name=dns]").attr('disabled', false);
            }
        }

        text_input();

        $dom.find("[name='type']").change(function(){
            text_input();
        });
        return $dom;
    }

    function displayTable($con) {
        $.ajax({
            url: '/cgi-bin/luci/admin/lan_wirelessInterface',
            type: 'GET',
            async:false,
            success: function(result) {
                result = JSON.parse(result);
                console.log(result)

                var doEval = require('Eval');
                var Tips = require('Tips');
                var variableArr = ['type', 'dns', 'lanIp', 'netMask', 'gateway', 'lanMac',];
                var code = doEval.doEval(result, variableArr),
                    isSuccessful = code["isSuccessful"];
                if (isSuccessful) {
                    var data = code["data"];
                    DATA.type  = data.type;
                    DATA.dns   = data.dns;
                    DATA.lanIp   = data.lanIp;
                    DATA.netMask = data.netMask;
                    DATA.gateway = data.gateway;
                    DATA.lanMac  = data.lanMac;

                    console.log(DATA);
                } 
                else 
                {
                    Tips.showError('{parseStrErr}',3);
                }

            }
        });

        var $divleft = $('<div id="divleft" style="position:relative;display:inline-block;width:350px;height:auto;"></div>');
        var $divright = $('<div id="divright" style="position:absolute;display:inline-block;width:350px;height:auto;left:500px;"></div>');
        $divleft.append(getLeftInputGroup());

        var btnGroupList = [
            {
                "id"        : 'save',
                "name"      : '保存',
                "clickFunc" : function($btn){
                    var IG = require('InputGroup');
                    if(IG.checkErr($con)>0){
                        return false;
                    }
                    var srlz = require('Serialize');
                    var arrs = srlz.getQueryArrs($con);    
                    var jsons = srlz.queryArrsToJson(arrs);
                    var datastr = srlz.queryJsonToStr(jsons);
                    sendAjax(datastr);
                }
            },
            {
                "id"        : 'reset',
                "name"      : '重填',
                "clickFunc" : function($btn){}
            }
        ];
        var BtnGroup = require('BtnGroup');
        var $btnGroup = BtnGroup.getDom(btnGroupList).addClass('u-btn-group');
        var $coverdom = $('<div style="position:relative;display:iblock;width:100%;height:auto;overflow:hidden"></div>');
        $coverdom.append($divleft,$divright);
        $coverdom.find('tr').children(':first-of-type').css('min-width','98px');
        $con.empty().append($coverdom,$btnGroup);
    }

    function sendAjax(posystr){
        var wt2 = Tips.showWaiting('{dataSaving}');

        $.ajax({
            type:"post",
            url:'/cgi-bin/luci/admin/set_lan_config',
            data:posystr,
            success:function(result){
                wt2.remove();
                var doEval = require('Eval');
                var variableArr = ['status','errorstr'];
                var result = doEval.doEval(result, variableArr);
                var isSuccessful = result['isSuccessful'];
                // 判断字符串代码是否执行成功
                if(isSuccessful){
                    // 执行成功
                    var data = result['data'];
                    if(data.status){
                        Tips.showSuccess('{saveSuccess}');
                        $('[href="#1"]').trigger('click');
                    }else{
                        Tips.showError();
                        if(data.errorstr){
                            Tips.showWarning(data.errorstr);
                        }else{
                            Tips.showWarning('{saveFail}');
                        }
                    }
                }
            }
        });
    }

    function display($con) {
        var Translate  = require('Translate');
        var dicArr     = ['common','lanConfig'];
        Translate.preLoadDics(dicArr, function(){
            $con.empty();
            displayTable($con);
        });

    }
    // 提供对外接口
    module.exports = {
        display: display
    };
});
