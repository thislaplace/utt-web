define(function(require, exports, module){
	require('jquery');
	exports.display = function(){

	    var dics = ['doElectroReport','doUserAuthentication','doTimePlan']; 
	    var Translate = require('Translate'); 
	    Translate.preLoadDics(dics, function(){
		var Path = require('Path');
		// 加载路径导航
		var pathList = 
		{
		    "prevTitle" : '行为管理',
		    "links"     : [
		    {"link" : '#/behavior_management/electro_report', "title" : '电子通告'}
		    ],
		    "currentTitle" : ''
		};
		Path.displayPath(pathList);
		// 加载标签页
		var Tabs = require('Tabs');
		var tabsList = [
		{"id" : "1", "title" : "电子通告"}
		];
		// 生成标签页，并放入页面中
		Tabs.displayTabs(tabsList);
		$('a[href="#1"]').click(function(event) {
		    //				Path.changePath($(this).text());
		    require.async('./displayElectroReport', function(obj){		
			obj.display($('#1'));
		    });
		});
		$('a[href="#1"]').trigger('click');
	    });
	}
})
