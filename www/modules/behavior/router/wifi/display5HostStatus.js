define(function(require, exports, module) {
	var DATA={};
	var Tips = require('Tips');
	DATA.settimenum = 5000;
	function tl(str){
		    return require('Translate').getValue(str, ['common']);
	}

	function processData(jsStr) {
		// 加载Eval模块
		var doEval = require('Eval');
		var Tips = require('Tips');
		var codeStr = jsStr,
			// 定义需要获得的变量		
		variableArr = 
			[	'HostMacs','BWs'
			];			
		// 获得js字符串执行后的结果
		var result = doEval.doEval(codeStr, variableArr),
			isSuccess = result["isSuccessful"];
		// 判断代码字符串执行是否成功
		if (isSuccess) {
			// 获得所有的变量
			var data = result["data"];
			
			
			
			// 获取数据库模块，并建立一个数据库
			var Database = require('Database'),
				database = Database.getDatabaseObj(); // 数据库的引用
			// 存入全局变量DATA中，方便其他函数使用
			DATA["tableData"] = database;
			// 声明字段列表
			var fieldArr =['id','mac','channel'];
			var dataArr = [];
			data.HostMacs.forEach(function(obj,i){
				dataArr.push([
					Number(i)+1,
					obj,
					data.BWs[i]
				]);
			})
			// 将数据存入数据表中
			database.addTitle(fieldArr);
			database.addData(dataArr);
			return true;
		} else {
			Tips.showError('{parseStrErr}');
			return false;
		}
	}

	function getTableDom() {
		// 表格上方按钮配置数据
		var btnList = [
			{
				"id": "refresh_handel",
				"name": "{refresh}",
				"clickFunc" : function(){
					forajax('',true,true);
				}
			},
			{
				"id": "filter",
				"name": "{filter}",
				"clickFunc" : function(){
					var primaryKeyArr = DATA["tableObj"].getSelectInputKey('data-primaryKey');
					if(primaryKeyArr.length == 0){
						Tips.showWarning('{selectFilterMac}');
						return false;
					}
					var datastrs = 'macStr=';
					primaryKeyArr.forEach(function(pk){
						datastrs += DATA["tableData"].getSelect({primaryKey:pk})[0].mac;
					});
					datastrs = datastrs.substr(0,datastrs,length-1);
					
					$.ajax({
						url: 'common.asp?optType=wirelessHostList_5G',
						type: 'GET',
						success: function(res) {
							// 加载Eval模块
							var doEval = require('Eval');
							var Tips = require('Tips');
							var codeStr = res,
								// 定义需要获得的变量		
							variableArr = 
								[	'status','errorstr'
								];			
							// 获得js字符串执行后的结果
							var result = doEval.doEval(codeStr, variableArr),
								isSuccess = result["isSuccessful"];
							// 判断代码字符串执行是否成功
							if (isSuccess) {
								// 获得所有的变量
								var data = result["data"];
									if(data.status){
										Tips.showSuccess('{oprtSuccess}');
										$('[href="#1"]').trigger('click');
									}else if(data.errorstr){
										Tips.showWarning(data.errorstr);
									}else{
										Tips.showWarning('{oprtFail}');
									}
								} else {
								Tips.showError('{parseStrErr}');
								return false;
							}
						}
					});
					
					
				}
			}
		];
		var database = DATA["tableData"];
		var headData = {
			"btns" : btnList
		};
		// 表格配置数据
		var tableList = {
			"database": database,
			"isSelectAll" : true,
			"dicArr":['common'],
			"titles": {
				"ID"		 : {
					"key": "id",
					"type": "text",
				},
				"{MACAddr}"		 : {
					"key": "mac",
					"type": "text",
				},	
				"{channelBW}"		 : {
					"key": "channel",
					"type": "text",
				}							
			}
		};
		// 表格组件配置数据
		var list = {
			head: headData,
			table: tableList
		};
		// 加载表格组件，获得表格组件对象，获得表格jquery对象
		var Table = require('Table'),
			tableObj = Table.getTableObj(list),
			$table = tableObj.getDom();



		// 将表格组件对象存入全局变量，方便其他函数调用
		DATA["tableObj"] = tableObj;
		// 添加刷新下拉框
		var selecthtml = '<select id=""tableRefreshTime style="margin-right:5px;width:67px">'+
							'<option value="3">3</option>'+
							'<option value="5" selected="selected">5</option>'+
							'<option value="10">10</option>'+
							'<option value="60">60</option>'+
							'<option value="manual">'+tl('manual')+'</option>'+
						'</select>';
		var $selh = $(selecthtml);
		$selh.change(function(){
			clearTimeout(DATA.timeoutobj)
			var $t = $(this);
			if($t.val() != 'manual'){
				DATA.settimenum = $t.val()*1000;
				setTimeForAjax()
			}
		});
		var $newli = $('<li style="margin-right:5px" class="utt-inline-block"></li>');
		$newli.append('<span>'+tl('refreshTime')+'：</span>');
		$newli.append($selh);
		$newli.append('<span style="margin-right:5px">'+tl('second')+'</span>')
		$table.find('#btns>ul').prepend($newli);
		return $table;
	}
	function displayTable($container) {
		var TableContainer = require('P_template/common/TableContainer');
		var conhtml = TableContainer.getHTML({}),
			$tableCon = $(conhtml);
		// 将表格容器放入标签页容器里
		$container.append($tableCon);
		//向后台发送请求，获得表格数据
		forajax($tableCon)
		
	}
	function setTimeForAjax(){
		var newsettime = $('#content li.active>a[data-toggle="tab"]').attr('time-sign');
		DATA.timeoutobj =  setTimeout(function(){
			if(newsettime ==$('#content li.active>a[data-toggle="tab"]').attr('time-sign')){
				forajax('',true);
			}
		},DATA.settimenum);
	}
	function forajax($tableCon,isfresh,ishandle){
		
		$.ajax({
			url: 'common.asp?optType=wireless5gHostList',
			type: 'GET',
			success: function(result) {
				// 将后台数据处理为数据表格式的数据
				var iss = processData(result);
				if(iss){
					// 获得表格Dom
					if(isfresh){
						DATA["tableObj"].refresh(DATA["tableData"]);
					}else{
						var $table = getTableDom();
						// 将表格放入页面
		
						$tableCon.append($table);
						
					}
					if(!ishandle){
						setTimeForAjax();
					}
				}
				
				
			},
			error:function(res){
			}
		});
	}
	function display($container) {
		var Translate = require('Translate'); 
		var dicNames = ['common', 'lanConfig', 'doDhcpServer']; 
		Translate.preLoadDics(dicNames, function(){ 
			 $container.empty();
			 displayTable($container);
		});	
	}
	// 提供对外接口
	module.exports = {
		display: display
	};
});
