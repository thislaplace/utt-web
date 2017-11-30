define(function(require, exports, module){		
    function tl(str){
        return require('Translate').getValue(str,['doDhcpServer','common']);
    }	
    exports.display = function(){	
        var $container = $('#content');
        $container.empty();
        var Path = require('Path');
        var Translate = require('Translate'); 
        var dicNames = ['common','doSystemState']; 
        var controlData={};
        var Data={};
        Translate.preLoadDics(dicNames, function(){ 
            var pathList = 
                {
                    "prevTitle" : '系统状态',
                    "links"     : [
                        {"link" : '#/system_watcher/system_state', "title" : '系统状态'}
                    ],
                    "currentTitle" : ''
                };			
            var glist =[

                [
                    {
                        title:'带宽统计',
                        id:'bandwidth',
                        hide:false
                    },
                    {
                        title:'用户统计',
                        id:'UserStatistics',
                        hide:false
                    },
                ],
                [
                    {
                        title:'系统状态',
                        id:'systemState',
                        height:322,
                        hide:false
                    }
                ],
                [
                    {
                        title:'接口信息',
                        id:'Interface',
                        height:322,
                        linkurl  : '#/network_config/LAN_config',
                        hide:false
                    },
                    {
                        title:'射频信息',
                        id:'RFInformation',
                        height:322,
                        linkurl  : '#/system_watcher/traffic_watcher',
                        hide:false
                    }
                ],
                [
                    {
                        title:'桥接状态',
                        id:'BridgeState',
                        linkurl  : '#/system_watcher/traffic_watcher',
                        hide:false
                    }
                ],

                [
                    {
                        title:'无线网络',
                        id:'wifi',
                        linkurl  : '#/system_watcher/traffic_watcher',
                        hide:false
                    }
                ],


            ]
            var gdata ={
                list : glist,
                close : function(event,closeArr,allArr){
                    //输出隐藏的标签名称
                    for(var i in closeArr){
                        console.log(closeArr[i].title+'已隐藏');
                    }
                    //也可将数据作为参数直接传入属性管理器对象，调用modify方法进行修改
                    AttmObj.modify(allArr);
                },
                refresh : function(event,refreshJson){alert(refreshJson.title+"刷新中……")}
            }
            Path.displayPath(pathList);
            var Tabs = require('Tabs');

            var Grid = require('Grid');
            var gobj = Grid.getGridObj(gdata);
            var $g = gobj.get$Dom();
            $('#content').append($g);
            function attm(){
                var Attm = require('P_plugin/Attm');
                var list=[
                    {title:'', children:[                           //title:'' 组名称  ，children：[] 属性列名数组
                        {name : '带宽统计',id:"bandwidth", check: (controlData["bandWidth"] == '1') },     //check：true 该选项默认被勾选
                        {name : '用户统计', id:"UserStatistics", check: (controlData["UserStatistics"] == '1')}, //disabled:true 可以使单个选项不可操作
                        {name : '系统状态', id:"systemState",check: (controlData["systemState"] == '1')},
                        {name : '接口信息', id:"Interface",check: (controlData["Interface"] == '1') },
                        {name : '射频信息', id:"RFInformation",check: (controlData["RFInformation"] == '1') },
                        {name : '桥接状态', id:"BridgeState",check: (controlData["BridgeState"] == '1')},
                        {name : '无线网络', id:"wifi",check: (controlData["wifi"] == '1')}
                    ]}
                ];
                var data = {
                    top: 2,
                    right : 5,
                    list : list,
                    checkChange : function(ev, obj){
                        moduleControlBtnClick(obj)
                    }
                };
                var attmObj = Attm.getAttmObj(data);
                Data["attm"] = attmObj;
                var $dom = attmObj.get$Dom();
                $container.append($dom);

            };
            attm()





            // 生成标签页，并放入页面中
            $('a[href="#bandwidth"]').click(function(event) {
                $("#bandwidth").empty();

                $("#bandwidth").append('<div class="iframeBox1"><iframe frameborder="no" marginwidth="0" width="100%" height="270" src="/modules/behavior/router/exel.html"></div>')
                $("#bandwidth").append('<div class="iframeBox2"><iframe frameborder="no" marginwidth="0" width="100%" height="270" src="/modules/behavior/router/exel.html"></div>')
                $(".iframeBox1").prepend('<h4 style="padding-left:20px">有线</h4>')
                $(".iframeBox2").prepend('<h4 style="padding-left:20px">无线</h4>')
                $(".iframeBox1,.iframeBox2").append(
                    '<div class="tishi flex flex-align-center flex-pack-center">'+

                        '<div class="left flex flex-align-center">'+
                        '<p></p>'+
                        '<p>上传速率</p>'+
                        '</div>'+
                        '<div class="right flex flex-align-center">'+
                        '<p></p>'+
                        '<p>下载速率</p>'+
                        '</div>'+
                        '</div>')


                $(".iframeBox1,.iframeBox2").css({"width":"49.5%","padding-bottom":"5px"})
                $(".iframeBox1").css({"float":"left","border-right":"1px dashed #ccc"})
                $(".iframeBox2").css({"float":"right","border-left":"1px dashed #ccc"})
                // require.async('./', function(obj){	
                // 	obj.display($('#bandwidth'));
                // });
            });
            $('a[href="#UserStatistics"]').click(function(event) {
                $("#UserStatistics").empty();
                $("#UserStatistics").append('<div class="btn" style="width:100%;padding-top: 1vw;">'+
                    '<ul>'+
                        '<li>1H</li>'+
                        '<li>1D</li>'+
                        '<li>1W</li>'+
                        '</ul>'+
                        '</div>')
                $("#UserStatistics").append('<iframe frameborder="no" width="100%" height="270" src="/modules/behavior/router/userStatistics.html">')
                $(".btn>ul>li").click(function(){
                    $(this).css({"background":"#6f6c6c","color":"#fff"}).siblings().css({"background":"#ccc","color":"#000"})
                })
            });
            $('a[href="#systemState"]').click(function(event) {

                require.async('./displaySystemState', function(obj){		
                    obj.display($('#systemState'));
                });
            });
            $('a[href="#Interface"]').attr('refreshTime','0').click(function(event) {
                var parent=$('#Interface').parent().parent().parent().parent()
                var parents=parent.parents('.gd-much-group').siblings(".gd-single-group ").find(".row>div:nth-child(2)").children()
                parents.before('<div class="container"></div>')
                var cont=parents.siblings('.container')
                cont.append(parent)
                parent.removeClass().addClass('row')
                $(".gd-control-btns>a[href='#/network_config/LAN_config']").text('[ 编 辑 ]')
                $(".gd-control-btns>a[href='#/network_config/LAN_config']").removeClass("u-hide")
                require.async('./displayInterface', function(obj){		
                    obj.display($('#Interface'));
                });
            });
            $('a[href="#RFInformation"]').click(function(event) {
                require.async('./displayRFInformation', function(obj){		
                    obj.display($('#RFInformation'));
                });
            });	
            $('a[href="#wifi"]').click(function(event) {
                // require.async('./displayWifi', function(obj){		
                // 	obj.display($('#wifi'));
                // });
                require.async('./displayWifi', function(obj){		
                    obj.display($('#wifi'));
                });
            });	
            $('a[href="#BridgeState"]').click(function(event) {
                require.async('./displayBridgeState', function(obj){		
                    obj.display($('#BridgeState'));
                });

            });			
            $('a[href="#bandwidth"]').trigger('click');

            $('a[href="#systemState"]').trigger('click');
            $('a[href="#Interface"]').trigger('click');
            $('a[href="#wifi"]').trigger('click');
            $('a[href="#BridgeState"]').trigger('click');

        });
    }
})
