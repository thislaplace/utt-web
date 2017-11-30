define(function(require, exports, module){
	require('jquery');
	function tl(str){
	    return require('Translate').getValue(str, ['common']);
	}
	exports.display = function(){
			var Path = require('P_plugin/Path');
			var Translate = require('Translate'); 
		 	var dicNames = ['common']; 
		 	Translate.preLoadDics(dicNames, function(){
				// 加载路径导航
				var pathList = 
				{
		  		"prevTitle" :tl('wifiConfig'),
		  		"links"     : [
		  			{"link" : '', "title" : tl('wifiHostStatus')}
		  		],
		  		"currentTitle" : ''
				};
					Path.displayPath(pathList);
					var Tabs = require('P_plugin/Tabs');
				// 加载标签页
				var tabsList = [
					{"id" : "1", "title" : '2.4G '+tl('wifiHostStatus')},
					{"id" : "2", "title" : '5G '+tl('wifiHostStatus')}
				];
				// 生成标签页，并放入页面中
				Tabs.displayTabs(tabsList);
				$('a[href="#1"]').click(function(event) {
					Path.changePath($(this).text());
					require.async('./display24HostStatus', function(obj){		
						obj.display($('#1'));
					});
				});
				$('a[href="#2"]').click(function(event) {
					Path.changePath($(this).text());
					require.async('./display5HostStatus', function(obj){		
						obj.display($('#2'));
					});
				});
			    $('a[href="#1"]').trigger('click');
			});
	}
})
