define(function(require, exports, module){
	require('jquery');
	function tl(str){
	    return require('Translate').getValue(str, ['common','doRFT','doNetName','doRouterConfig']);
	}
	exports.display = function(){
			var Path = require('P_plugin/Path');
			var Translate = require('Translate'); 
		 	var dicNames = ['common','doNetName']; 
		 	Translate.preLoadDics(dicNames, function(){
				// 加载路径导航
				var pathList = 
				{
		  		"prevTitle" :tl('wifiConfig'),
		  		"links"     : [
		  			{"link" : '', "title" : tl('wsdconfig')}
		  		],
		  		"currentTitle" : ''
				};
					Path.displayPath(pathList);
					var Tabs = require('P_plugin/Tabs');
				// 加载标签页
				var tabsList = [
					{"id" : "1", "title" : '2.4G '+tl('wsdconfig')},
					{"id" : "2", "title" : '5G '+tl('wsdconfig')}
				];
				// 生成标签页，并放入页面中
				Tabs.displayTabs(tabsList);
				$('a[href="#1"]').click(function(event) {
					Path.changePath($(this).text());
					require.async('./display24WDSConfig', function(obj){		
						obj.display($('#1'));
					});
				});
				$('a[href="#2"]').click(function(event) {
					Path.changePath($(this).text());
					require.async('./display5WDSConfig', function(obj){		
						obj.display($('#2'));
					});
				});
			    $('a[href="#1"]').trigger('click');
			});
	}
})
