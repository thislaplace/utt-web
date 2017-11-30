define(function(require, exports, module) {
	require('jquery');
	DATA = {};
	DATA['str']=[];
	DATA['url']=[];
	var Tips = require('Tips');

	//入口
	function display($container) {
		//内页面显示及顺序
		var arr = [1,2,3];
		DATA["arr"] = arr;	
		//默认先显示第一个页面
		DATA['pagekey'] = arr[0];
		
		//页面配置
		var pagedata = {
					'1':{
						title :'{wizard}',
						func  :display1,
						save  :save1,
						ajax  :ajax1
						},
					'2':{
						title :'{wifiConfig}',
						func  :display3,
						save  :save3,
						ajax:ajax3
					},
					'3':{
						title :'LAN口配置',
						func  :display2,
						save  :save2,
						ajax  :ajax2,				
					},
			};
		DATA["pagedata"] = pagedata;
		DATA["$container"] = $container;
		DATA['pagedata'][DATA['pagekey']].ajax();


	}
	function save1(callback){
		if($('[name="autoPop"]').is(':checked')){
			DATA["str"][0]= "notPopUp=on";
		}else{
			DATA["str"][0] = "notPopUp=off";
		}
		DATA["url"][0]= "formFastConfPop";
		if(callback){
			callback();
		}
		
	}
	function save2(callback){
		
		
		var Serialize = require('Serialize');
		// 将取到的值转换为json
		var queryArr = Serialize.getQueryArrs(DATA["$container"]),
			queryJson = Serialize.queryArrsToJson(queryArr);
			if(queryJson.staticSecDns.length == 0){
				queryJson.staticSecDns = '0.0.0.0';
			}
		var saveFlag=1;
		
		if(queryJson.connectionTypew == "STATIC"){
			
			var wt = require('Tips').showWaiting('{WaitForSaveConfig}');
			$.ajax({
			url: 'common.asp?optType=WanConfig',
			type: 'GET',
			async: false,
			success: function(result) {
				wt.remove();
				var doEval = require('Eval');
				var codeStr=result,variableArr = ['IPs'];;
				result=doEval.doEval(codeStr,variableArr);
				DATA["WANIP"]=result.data["IPs"];
				DATA["WANIP"].forEach(function(item, index, arr) {
					if(index !=0 && queryJson.staticIp == DATA['WANIP'][index]){
						Tips.showError("WAN1 "+"{and}"+"WAN "+parseInt(index+1)+"{cannotbesame}");
						saveFlag=0;
					}});}
			});
		}
		if(saveFlag == 0 || require('InputGroup').checkErr(DATA["$container"])>0){
		}else{
			var	queryStr = Serialize.queryJsonToStr(queryJson);
			DATA['str'][1]=queryStr;
			DATA['url'][1]="formConfigFastDirection";
			if(callback){
				callback();
			}
		}

	}
	


	function save3(callback){
		
		
		var Serialize = require('Serialize');
		// 将取到的值转换为json
		var queryArr = Serialize.getQueryArrs(DATA["$container"]),
			queryJson = Serialize.queryArrsToJson(queryArr);
			if(queryJson.staticSecDns.length == 0){
				queryJson.staticSecDns = '0.0.0.0';
			}
		var saveFlag=1;
		
		if(queryJson.connectionTypew == "STATIC"){
			
			var wt = require('Tips').showWaiting('{WaitForSaveConfig}');
			$.ajax({
			url: 'common.asp?optType=WanConfig',
			type: 'GET',
			async: false,
			success: function(result) {
				wt.remove();
				var doEval = require('Eval');
				var codeStr=result,variableArr = ['IPs'];;
				result=doEval.doEval(codeStr,variableArr);
				DATA["WANIP"]=result.data["IPs"];
				DATA["WANIP"].forEach(function(item, index, arr) {
					if(index !=0 && queryJson.staticIp == DATA['WANIP'][index]){
						Tips.showError("WAN1 "+"{and}"+"WAN "+parseInt(index+1)+"{cannotbesame}");
						saveFlag=0;
					}});}
			});
		}
		if(saveFlag == 0 || require('InputGroup').checkErr(DATA["$container"])>0){
		}else{
			var	queryStr = Serialize.queryJsonToStr(queryJson);
			DATA['str'][1]=queryStr;
			DATA['url'][1]="formConfigFastDirection";
			if(callback){
				callback();
			}
		}

	}
	/**
	 * 展示页面
	 * @param 导航数组[1,2] arr
	 * @param 导航数据json  pagedata
	 * @param 父节点                      $con
	 */
	function showPage(arr,pagedata,$con){
		

		//制作头部
		var tophtml = '';
		for(var i in arr){
			var pgtitle = pagedata[arr[i]].title; //标题名称
			var num = i;		//标题数字
			
			
			// tophtml += '<div data-local="'+pagedata[arr[i]].title+'" class="u-wizard-top '+(i==0?'u-wizard-top-first':'')+(arr[i] == DATA['pagekey']?' u-wizard-isopen':'')+'">'+pagedata[arr[i]].title+'</div>';
			tophtml += '<div class="u-wizard-top '+(arr[i] == DATA['pagekey']?' u-wizard-isopen':'')+'" >'+
					   		'<div class="u-wizard-num">'+(Number(num)+1)+'</div>'+
					   		'<div class="u-wizard-titlespan" data-local="'+pgtitle+'">'+pgtitle+'</div>'+
					   '</div>';
		}
		var $ptop = $('<div class="u-wizard-top-cover"></div>');
		$ptop.append(tophtml);
		
		
		//制作中间
		var $midDom = '';
		if(pagedata[DATA['pagekey']].func){
			$midDom = pagedata[DATA['pagekey']].func();
		}
		
		
		//制作底部
		var nums = 0;
		for(var i in arr){
			if(DATA['pagekey'] == arr[i]){
				nums = i;
			}
		}
		var btnlist = [];
		if(nums==0){
			//第一个
			btnlist =[
				 {
			        "id"        : 'exit',
			        "name"      : '{quitWizard}',
			        "clickFunc" : function($btn){
			            redirect();
			        }
			    },
			    {
			        "id"        : 'next',
			        "name"      : '下一步',
			        "clickFunc" : function($btn){
			            if(require('InputGroup').checkErr($('#1')) > 0){
							return false;
						}
			            var nowpage = '';
			           	for(var i in arr){
			           		if(arr[i] == DATA['pagekey']){
			           			if(arr[Number(i)+1]){
			           				nowpage = arr[Number(i)+1];
			           			}
			           		}
			           	}
			           	DATA['pagedata'][DATA['pagekey']].save();
			           	DATA['pagekey'] = nowpage;
			            DATA['pagedata'][DATA['pagekey']].ajax();
			           
			        }
			    }
			];
			
		}else if(nums == (arr.length-1)){
			//最后一个
			btnlist =[
				{
			        "id"        : 'prev',
			        "name"      : '{preStep}',
			        "clickFunc" : function($btn){
			             	var nowpage = '';
				           	for(var i in arr){
				           		if(arr[i] == DATA['pagekey']){
				           			if(arr[Number(i)-1]){
				           				nowpage = arr[Number(i)-1];
				           			}
				           		}
				           	}

				           	DATA['pagekey'] = nowpage;
			           	 DATA['pagedata'][DATA['pagekey']].ajax();
			        }
			    },
			     {
			        "id"        : 'reset',
			        "name"      : '{reset}',
			        "clickFunc" : function($btn){
			            
			        }
			    },
				 {
			        "id"        : 'exit',
			        "name"      : '{quitWizard}',
			        "clickFunc" : function($btn){
			            redirect(); 
			        }
			    },
			    {
			        "id"        : 'okey',
			        "name"      : '{save}',
			        "clickFunc" : function($btn){
			            console.dir(DATA);
			            if(require('InputGroup').checkErr($('#1')) > 0){
							return false;
						}
			            
			            DATA['pagedata'][DATA['pagekey']].save(callback);
			        }
			    }
			];
			
			
		}else{
			//mid
			btnlist =[
				{
			        "id"        : 'prev',
			        "name"      : '{preStep}',
			        "clickFunc" : function($btn){
			           	 var nowpage = '';
				           	for(var i in arr){
				           		if(arr[i] == DATA['pagekey']){
				           			if(arr[Number(i)-1]){
				           				nowpage = arr[Number(i)-1];
				           			}
				           		}
				           	}
				           	DATA['pagekey'] = nowpage;
			            DATA['pagedata'][DATA['pagekey']].ajax();
			        }
			    },
			   {
			        "id"        : 'reset',
			        "name"      : '{reset}',
			        "clickFunc" : function($btn){
			           
			        }
			    },
				 {
			        "id"        : 'exit',
			        "name"      : '{quitWizard}',
			        "clickFunc" : function($btn){
			            redirect();
			        }
			    },
			    {
			        "id"        : 'next',
			        "name"      : '{next}',
			        "clickFunc" : function($btn){
			            if(require('InputGroup').checkErr($('#1')) > 0){
							return false;
						}
			           var nowpage = '';
			           	for(var i in arr){
			           		if(arr[i] == DATA['pagekey']){
			           			if(arr[Number(i)+1]){
			           				nowpage = arr[Number(i)+1];
			           			}
			           		}
			           	}
			           		 DATA['pagedata'][DATA['pagekey']].save();
			           	DATA['pagekey'] = nowpage;
			            DATA['pagedata'][DATA['pagekey']].ajax();
			        }
			    }
			];
		}
		var Btn = require('BtnGroup');
		var $btnDom = Btn.getDom(btnlist);
		
		
		//最外框
		var $pdiv = $('<div class="u-wizard-pdiv"></div>');
		$pdiv.append($ptop,$midDom,$btnDom);
		$con.empty().append($pdiv);
		var Translate  = require('Translate');
		var tranDomArr = [$pdiv];
		var dicArr     = ['common','error','check'];
		Translate.translate(tranDomArr, dicArr);
	}
	 function callback(){
	 	
    	DATA.str.forEach(function(item,index,arr){
        	postF(DATA.str[index],DATA.url[index]);
        });
        
        	setTimeout(function(){
        		if(DATA['success']){
	        		redirect();
     		  	}
	        },2000)

        
    }
	function redirect(){
		location.href = "#/system_watcher/system_state";
	}
	//向导页-展示
	function display1(){
		var midstr1 = '<ul style="width:100%;margin-bottom:10px;list-style:disc">'+
					'<li data-local="{wizard1}"></li>'+
					'<li data-local="{wizard2}"></li>'+
					'<li data-local="{wizard3}"></li>'+
						'</ul>';
		if(DATA["notPopUps"] == '1'){
			var midstr2 = '<input type="checkbox" checked name="autoPop"  /><span data-local="{wizard4}"> </span>';
		}else{
			var midstr2 = '<input type="checkbox" name="autoPop"  /><span data-local="{wizard4}"> </span>';
		}
		var $middiv = $('<div class="u-wizard-mid-div"></div>');
		$middiv.append(midstr1,midstr2);
		
		//绑定勾选框点击事件
		$middiv.find('[name="autoPop"]').click(function(){
			var tips = require('Tips');
			
			if($(this).is(':checked')){
				
				postF('notPopUp=on','formFastConfPop');
			}else{
				postF('notPopUp=off','formFastConfPop');
			}
		});
		
		return $middiv;
	}
	function ajax1(){
		$.ajax({
			url: 'common.asp?optType=fastConfigPop',
			type: 'GET',
			success: function(result) {
				var doEval 		= require('Eval');
				var codeStr=result,variableArr = ['notPopUps'];
				result=doEval.doEval(codeStr,variableArr);
				DATA["notPopUps"] = result['data']["notPopUps"];
				showPage(DATA["arr"],DATA["pagedata"],DATA["$container"]);
			}
		});
	}
	function ajax2(){
		$.ajax({
			url: 'common.asp?optType=fastConfigNet',
			type: 'GET',
			success: function(result) {
				function processData(jsStr) {
					console.log(jsStr)
					// 加载Eval模块
					var doEval 		= require('Eval');
					var codeStr 	= jsStr,
						variableArr = [
									"ConnTypes",
									"Masks",
									"IPs",
									"GateWays",
									"MainDnss",
									"SecDnss",
									"UserNames",
									"PassWds"
									];
					
					var result = doEval.doEval(codeStr, variableArr),
						isSuccess = result["isSuccessful"];

						console.dir(result);
					if (isSuccess) {
						var data = result["data"];
						return data;
					} else {
						console.log('字符串解析失败')
					}
				}
				DATA['data2'] = processData(result);
				console.dir(DATA);
				showPage(DATA["arr"],DATA["pagedata"],DATA["$container"]);
				}
		});
	}

	function ajax3(){
		$.ajax({
			url: 'common.asp?optType=fastConfigNet',
			type: 'GET',
			success: function(result) {
				function processData(jsStr) {
					console.log(jsStr)
					// 加载Eval模块
					var doEval 		= require('Eval');
					var codeStr 	= jsStr,
						variableArr = [
									"ConnTypes",
									"Masks",
									"IPs",
									"GateWays",
									"MainDnss",
									"SecDnss",
									"UserNames",
									"PassWds"
									];
					
					var result = doEval.doEval(codeStr, variableArr),
						isSuccess = result["isSuccessful"];

						console.dir(result);
					if (isSuccess) {
						var data = result["data"];
						return data;
					} else {
						console.log('字符串解析失败')
					}
				}
				DATA['data2'] = processData(result);
				console.dir(DATA);
				showPage(DATA["arr"],DATA["pagedata"],DATA["$container"]);
				}
		});
	}
	//接入方式-展示
	function display3(){
		/*获取WAN数据*/
		var data=DATA['data2'];
		var inputList = [
			// {
			// 		"display" : true,  //是否显示：否
			// 	    "inputData": {
			// 	        "type"       : 'text',
			// 	        "name"       : 'signWords',
			// 	        "value"		 : ''
			// 	    }

			// },
			{
			"inputData": {
				"type": 'title',
				"name" : '2.4G' ,
			}
			},
			{
				"sign" 	:'STATIC',
				"display" : true,  //是否显示：否
				"necessary": true,  //是否添加红色星标：是
			    "prevWord": 'SSID',
			    "inputData": {
			        "type"       : 'text',
			        "name"       : 'staticIp',
			        "value"		 : data.IPs,
			        "checkFuncs" : ['checkIP'] //自定义含参方法[方法名，参数一，参数二]
			    }

			},
			{
				// "necessary": true,  //是否添加红色星标：是
				"prevWord": '{pwd}',
				"inputData": {
					  	"type"       : 'password',
					  	"name"       : 'pswd',
					  	"checkFuncs" : ['checkPSWD']
						//"checkDemoFunc" : ['funcName',data1,data2] //自定义含参方法[方法名，参数一，参数二]
				},
				"afterWord": ''
			},

			{
				"display"	:true,
				"prevWord"	:"无线模式",
				"inputData" :{
					"defaultValue" : data.ConnTypes,
					"type"		   : 'select',
					"name"		   : 'connectionTypew',
					"items" :[{
						"value"		: '11',
						"name"  	: '11G'
					},{
						"value"		:'11',
						"name"		:'11n'
					},{
						"value"		:'11bgn',
						"name"		:'11b/g/n混合'
					}]
				}
			},
			{
				"display"	:true,
				"prevWord"	:"{channel}",
				"inputData" :{
					"defaultValue" : data.ConnTypes,
					"type"		   : 'select',
					"name"		   : 'connectionTypew',
					"items" :[{
						"value"		: 'auto',
						"name"  	: 'auto',
					},{
						"value"		:'1',
						"name"		:'1'
					},
					{
						"value"		:'2',
						"name"		:'2'
					},
					{
						"value"		:'3',
						"name"		:'3'
					},
					{
						"value"		:'4',
						"name"		:'4'
					},
					{
						"value"		:'5',
						"name"		:'5'
					}
					]
				}
			},
			{
				"display"	:true,
				"prevWord"	:"{channelBW}",
				"inputData" :{
					"defaultValue" : data.ConnTypes,
					"type"		   : 'select',
					"name"		   : 'connectionTypew',
					"items" :[{
						"value"		: 'c1',
						"name"  	: '20M'
					},{
						"value"		:'c2',
						"name"		:'20M/40M'
					}]
				}
			}	
		];


		var inputList1 = [
			// {
			// 		"display" : true,  //是否显示：否
			// 	    "inputData": {
			// 	        "type"       : 'text',
			// 	        "name"       : 'signWords',
			// 	        "value"		 : ''
			// 	    }

			// },
			{
			"inputData": {
				"type": 'title',
				"name" : '5G' ,
			}
			},
			{
				"sign" 	:'STATIC',
				"display" : true,  //是否显示：否
				"necessary": true,  //是否添加红色星标：是
			    "prevWord": 'SSID',
			    "inputData": {
			        "type"       : 'text',
			        "name"       : 'staticIp',
			        "value"		 : data.IPs,
			        "checkFuncs" : ['checkIP'] //自定义含参方法[方法名，参数一，参数二]
			    }

			},
			{
				// "necessary": true,  //是否添加红色星标：是
				"prevWord": '{pwd}',
				"inputData": {
					  	"type"       : 'password',
					  	"name"       : 'pswd',
					  	"checkFuncs" : ['checkPSWD']
						//"checkDemoFunc" : ['funcName',data1,data2] //自定义含参方法[方法名，参数一，参数二]
				},
				"afterWord": ''
			},

			{
				"display"	:true,
				"prevWord"	:"无线模式",
				"inputData" :{
					"defaultValue" : data.ConnTypes,
					"type"		   : 'select',
					"name"		   : 'connectionTypew',
					"items" :[{
						"value"		: '11',
						"name"  	: '11G'
					},{
						"value"		:'11',
						"name"		:'11n'
					},{
						"value"		:'11bgn',
						"name"		:'11b/g/n混合'
					}]
				}
			},
			{
				"display"	:true,
				"prevWord"	:"{channel}",
				"inputData" :{
					"defaultValue" : data.ConnTypes,
					"type"		   : 'select',
					"name"		   : 'connectionTypew',
					"items" :[{
						"value"		: 'auto',
						"name"  	: 'auto',
					},{
						"value"		:'1',
						"name"		:'1'
					},
					{
						"value"		:'2',
						"name"		:'2'
					},
					{
						"value"		:'3',
						"name"		:'3'
					},
					{
						"value"		:'4',
						"name"		:'4'
					},
					{
						"value"		:'5',
						"name"		:'5'
					}
					]
				}
			},
			{
				"display"	:true,
				"prevWord"	:"{channelBW}",
				"inputData" :{
					"defaultValue" : data.ConnTypes,
					"type"		   : 'select',
					"name"		   : 'connectionTypew',
					"items" :[{
						"value"		: 'c1',
						"name"  	: '20M'
					},{
						"value"		:'c2',
						"name"		:'20M/40M'
					}]
				}
			}	
		];
		var inputLists = inputList;
		var inputLists1=inputList1
		var InputGroup = require('InputGroup');
		var $inputs = InputGroup.getDom(inputLists);
		var $inputs1=InputGroup.getDom(inputLists1);
		var $middiv = $('<div class="u-wizard-mid-div" style="overflow:hidden"></div>');
		$middiv.append($inputs);
		$middiv.append($inputs1);
		$inputs.css({"width":"50%","float":"left","overflow":"hidden"})
		$inputs.css({"width":"50%","float":"left","overflow":"hidden"})
		$middiv.append('<div style="clear:both"></div>')
		return $middiv;
		
	}
	function display2(){
		/*获取WAN数据*/
	
		var data=DATA['data2'];
		
		var inputList = [
			// {
			// 		"display" : true,  //是否显示：否
			// 	    "inputData": {
			// 	        "type"       : 'text',
			// 	        "name"       : 'signWords',
			// 	        "value"		 : ''
			// 	    }

			// },
			{
				"display"	:true,
				"prevWord"	:"{accessMode}",
				"inputData" :{
					"defaultValue" : data.ConnTypes,
					"type"		   : 'select',
					"name"		   : 'connectionTypew',
					"items" :[{
						"value"		: 'STATIC',
						"name"  	: '{staticAccess}',
						"control" 	: 'STATIC'
					},{
						"value"		:'DHCP',
						"name"		:'{domainAccess}',
						"control"	:'DHCP'
					},{
						"value"		:'PPPOE',
						"name"		:'{PPPoEAccess}',
						"control"	:'PPPOE'
					}]
				}
			},
			{
				"sign" 	:'STATIC',
				"display" : true,  //是否显示：否
				"necessary": true,  //是否添加红色星标：是
			    "prevWord": '{ip}',
			    "inputData": {
			        "type"       : 'text',
			        "name"       : 'staticIp',
			        "value"		 : data.IPs,
			        "checkFuncs" : ['checkIP'] //自定义含参方法[方法名，参数一，参数二]
			    }

			},
			{
				"sign" 	:'STATIC',
				"display" : true,  //是否显示：否
				"necessary": true,  //是否添加红色星标：是
			    "prevWord": '{netmask}',
			    "inputData": {
			        "type"       : 'text',
			        "name"       : 'staticNetmask',
			        "value"		 : data.Masks,
			        "checkFuncs" : ['re_checkMask'] //自定义含参方法[方法名，参数一，参数二]
			    }

			},
			{
				"sign" 	:'STATIC',
				"display" : true,  //是否显示：否
				"necessary": true,  //是否添加红色星标：是
			    "prevWord": '{GwAddr}',
			    "inputData": {
			        "type"       : 'text',
			        "name"       : 'staticGateway',
			        "value"		 : data.GateWays,
			        "checkFuncs" : ['checkIP'] //自定义含参方法[方法名，参数一，参数二]
			    }

			},
			{
				"sign" 	:'STATIC',
				"display" : true,  //是否显示：否
				"necessary": true,  //是否添加红色星标：是
			    "prevWord": '{mainDNSAddr}',
			    "inputData": {
			        "type"       : 'text',
			        "name"       : 'staticPriDns',
			        "value"		 : data.MainDnss,
			        "checkFuncs" : ['checkMainDns'] //自定义含参方法[方法名，参数一，参数二]
			    }

			},
			{
				"sign" 	:'STATIC',
				"display" : true,  //是否显示：否
				"necessary": false,  //是否添加红色星标：是
			    "prevWord": '{secDNSAddr}',
			    "inputData": {
			        "type"       : 'text',
			        "name"       : 'staticSecDns',
			        "value"		 : data.SecDnss,
			        "checkFuncs" : ['checkNullIP'] //自定义含参方法[方法名，参数一，参数二]
			    }

			},
			{
				"sign":'PPPOE',
				"display" : true,  //是否显示：否
				"necessary": true,  //是否添加红色星标：是
			    "prevWord": '{username}',
			    "inputData": {
			        "type"       : 'text',
			        "name"       : 'pppoeUser',
			        "value"		 : data.UserNames,
			        "checkDemoFunc" : ['checkName','0','31'] //自定义含参方法[方法名，参数一，参数二]
			    }

			},
			{
				"sign":"PPPOE",
				"display" : true,  //是否显示：否
				"necessary": true,  //是否添加红色星标：是
			    "prevWord": '{pwd}',
			    "inputData": {
			        "type"       : 'password',
			        "name"       : 'pppoePass',
			        "value"		 : data.PassWds,
			        "checkDemoFunc" : ['checkName','0','31'],
			        "eye" : true
			    }

			},
			
		];
		var inputLists = inputList;
		var InputGroup = require('InputGroup');
		var $inputs = InputGroup.getDom(inputLists);
		console.log(".....")
		console.log($inputs)
		
		/*
		   	添加 WAN1 配置提示文字
		 * */
		$inputs.find('[name="signWords"]').parent().prev().attr('colspan','3').css({paddingBottom:'3px'}).append('<span data-local="">本页面为WAN1口配置，请您根据自身情况进行配置</span>');
		$inputs.find('[name="signWords"]').parent().prev().find('label').remove();
		$inputs.find('[name="signWords"]').parent().next().remove();
		$inputs.find('[name="signWords"]').parent().remove();
		
		/*
			联想输入IP mac 方法
		*/
		var $dom = $inputs;
		var netmask = $dom.find('[name=staticNetmask]');
		var gateway = $dom.find('[name=staticGateway]');
		var pridns  = $dom.find('[name=staticPriDns]')
		$dom.find('[name="staticIp"]').on('input',function(){
			var ip = $(this).val();
        	var index = ip.substr(0,3);
        	var first = ip.indexOf('.');
            var last = ip.lastIndexOf(".");
            var pre  = ip.substring(0,last+1);
        	var mask = netmask;
        	//根据IP填写子网
        	if(ip.indexOf('.')>0){
        		if(index >= 1 && index<=127){
        			mask.val("255.0.0.0");
        		}else if(index >= 128 && index<=191){
        			mask.val("255.255.0.0");
        		}else if(index >= 192 ){
        			mask.val("255.255.255.0");
        		}
        	}else{
        		mask.val("");
        	}
        	if(ip){
        		//根据IP填写网关
	        	gateway.val(pre+'1');
	        	//根据IP填写主DNS服务器
	        	pridns.val(pre+'1');
        	}else{
        		gateway.val('');
        		pridns.val('');
        	}
		});
		
		var $middiv = $('<div class="u-wizard-mid-div"></div>');
		$middiv.append($inputs);

		return $middiv;
		
	}
	function postF(str,url) {
		console.log(url)
		var Tips = require('Tips');
		$.ajax({
			url: '/goform/'+url,
			type: 'POST',
			data: str,
			success: function(result) {
				var doEval = require('Eval');
				var codeStr = result,
					variableArr = ['status', 'errorstr'],
					result = doEval.doEval(codeStr, variableArr),
					isSuccess = result["isSuccessful"];
				if (isSuccess) {
					var data = result["data"],
						status = data['status'];
					if (status) {
						DATA['success'] = true;
						console.log(result+"~~~~~~~~~~Ajax id ok");
					} else {
						DATA['success'] = false;
						var errorStr = data['errorstr'];
						Tips.showWarning(errorStr, 2);
					}
				} else {
					DATA['success'] = false;
					Tips.showWarning('{netErr}', 2);
				}
			}
		});
	}
	// 提供对外接口
	module.exports = {
		display: display
	};
});
