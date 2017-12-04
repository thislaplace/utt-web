define(function(require, exports, module){	
    function tl(str){
        return require('Translate').getValue(str,['doSysMaintenance','common','doNetworkTools']);
    }	
    exports.display = function(){	
        var $container = $('#content');
        $container.empty();
        var dp=require('P_config/config');
        var Path = require('Path');
        var Translate = require('Translate'); 
        var dicNames = ['common', 'doSysMaintenance','doNetworkTools']; 
        Translate.preLoadDics(dicNames, function(){ 
            // 加载路径导航
            var pathList = 
                {
                    "prevTitle" : tl('sysConfig'),
                    "links"     : [
                        {"link" : '#/system_config/system_maintenance', "title" : tl('systemMaintenance')}
                    ],
                    "currentTitle" : ''
                };
            Path.displayPath(pathList);
            var Tabs = require('Tabs');
            // 加载标签页
            var selectId=[];
            var tabsList = [];			
            if(dp.serverMgmt==1){
                tabsList.push({"id" : "1", "title" :tl('serverMgmt')});
                selectId.push('1');
            }
            if(dp.sysUpdate==1){
                tabsList.push({"id" : "2", "title" :tl('sysUpdate')});
                selectId.push('2');
            }
            if(dp.configMgmt==1){
                tabsList.push({"id" : "3", "title" :tl('configMgmt')});
                selectId.push('3');
            }
            tabsList.push({"id":"4","title":"计划任务"})
            selectId.push('4')

            // 生成标签页，并放入页面中
            Tabs.displayTabs(tabsList);
            $('a[href="#1"]').click(function(event) {
                Path.changePath($(this).text());
                require.async('./displayServeMgmt', function(obj){	
                    obj.display($('#1'));
                });
            });
            $('a[href="#2"]').click(function(event) {

                Path.changePath($(this).text());
                require.async('./displaySystemUpdate', function(obj){		
                    obj.display($('#2'));
                });
            });

            $('a[href="#3"]').attr('refreshTime','0').click(function(event) {
                Path.changePath($(this).text());
                require.async('./displayConfigManagement', function(obj){		
                    obj.display($('#3'));
                });
            });
			$('a[href="#4"]').click(function(event) {
				Path.changePath($(this).text());
				require.async('./displayTaskPlan', function(obj){		
					obj.display($('#4'));
				});
			});					
            $('a[href="#'+selectId[0]+'"]').trigger('click');
        });

    }
})
