define(function(require, exports, module){
	require('jquery');
	var DATA = {};
	var Tips = require('Tips');
	var Translate  = require('Translate');
	 var dicArr = ['common','doRFT','doNetName','doRouterConfig'];
	function tl(_str){
	    return Translate.getValue(_str, dicArr);
	}
	
	function display($con){
		$con.empty();
		
		$.ajax({
			type:"get",
			url:"/cgi-bin/luci?optType=getWirelessBaseConfig",
			success:function(result){
				
				// 数据处理
				var pro = processData(result);
				if(!pro){
					return false;
				}
				//生成表格
				editModal('edit',{},$con)
			}
		});
		
	}
	
	// 处理数据
	function processData(res){
		   var doEval = require('Eval');
		   var variableArr = [
			   'WrlessEnables',  // 启用无线功能
			   'ssids',   // 无线网络名称
			   'encodeType',  // 编码
			   'limit_type',  // SSID限速策略
			   'limit_up',  // 上行
			   'limit_down',  // 下行
			   'broadcastEnables',  // 启用SSID1广播
			   
			   'ssid2s', 
			   'encodeType2', 
			   'limit_type2 ',  
			   'limit_up2 ',  
			   'limit_down2',  
			   'broadcastEnables2',  
			   
			   'wrlessModes',  // 无线模式
			   'channels',  // 信道
			   'chanWidths',  // 频宽
			   'LanWlanSep',  // 有线无线隔离
			   'multi_ssidSep',  // 无线多SSID隔离
			   
			   'WDSEnableds',  // 开启WDS
			   'bridgeSSIDs',  // 无线网络名称
			   'briggeBSSIDs',  // 无线MAC地址
			   'apcliSecModes',  // 加密方式 ： NONE=无 WEP WPAPSK 
			   'apclikeyFormats',  // SSID限速策略 : 0 16进制  1：SCII
			   
			   'apclikeynums',  // 密钥1 1 2 3 4
			   'apcliwepkey1s',  // wep密钥
			   'apcliwepkey2s',  // 
			   'apcliwepkey3s',  // 
			   'apcliwepkey4s',  // 
			   'apclikeyLength1s',  // 密钥类型 0：禁用  4:64位  13:128位
			   'apclikeyLength2s',  
			   'apclikeyLength3s',  
			   'apclikeyLength4s', 
			   'apcliSecModes',  // WPA版本       WPAPSK WPA2PSK
			   'apcliAuthModes',  // 加密算法     TKIP AES
			   'apclipskPsswds',  // 预共享密钥
			   
		   ]; 
		   var result = doEval.doEval(res, variableArr);
		   if (!result.isSuccessful) {
		       Tips.showError('{parseStrErr}');
		       return false;
		    }
		   
		    DATA.data = result["data"];
		    console.log(res);
		   
			return true;
	}
	//新增 编辑
	function editModal(type,data,$con){
		var data = DATA.data || {};
		var type = (type === undefined?'add':type);
		$con.empty();
		
		var wdsEnable = (data.WDSEnableds == '1'?'1':'0'),  // WDS功能
			bridgessid = data.bridgeSSIDs || '',  // 无线网络名称
			bridgebssid = (data.briggeBSSIDs == '000000000000'?'':data.briggeBSSIDs) ||'', // 无线MAC名称
			apclisecmode = data.apcliSecModes || 'NONE', // 加密方式
			
			apclikeyFormat = data.apclikeyFormats ||'0', // 密钥格式
			
			apclikeynum = data.apclikeynums ||'0',
			
			apcliwepkey1 = data.apcliwepkey1s ||'',
			apcliwepkey2 = data.apcliwepkey2s||'',
			apcliwepkey3 = data.apcliwepkey3s || '',
			apcliwepkey4 = data.apcliwepkey4s || '',
			
			apclikeyLength1 = data.apclikeyLength1s ||'0',
			apclikeyLength2 = data.apclikeyLength2s ||'0',
			apclikeyLength3 = data.apclikeyLength3s ||'0',
			apclikeyLength4 = data.apclikeyLength4s ||'0',
			
			apcliwpapskAuthMode = data.apcliSecModes || 'WPA-PSK',
			apcliwpapskCipher = data.apcliAuthModes||'TKIP',
			
			apclipskPsswd = data.apclipskPsswds||'';
		
			
		var inputList = [
			{
				"prevWord": '{wdsFunc}',
				"inputData": {
					"type": 'radio',
					"name": 'wdsEnable',
					defaultValue:wdsEnable,
					items:[
						{name:'{open}',value:'1'},
						{name:'{close}',value:'0'}
					]
				},
				"afterWord": ''
			},
			{
			    	"prevWord"	:'无线模式',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'apclisecmode',
				        "defaultValue" : apclisecmode,
				        items:[
				        	{name:'repeater Modal' ,value:'repeater',control:'0'},
				        	{name:'bridgo Modal' ,value:'bridgo',control:'1'},
				        	{name:'lazy Modal' ,value:'lazy',control:'2'},
				        	{name:'APClient Modal' ,value:'APClient',control:'3'},
				        ]
				    },
				    "afterWord": ''
				},
			// {
			// 	"prevWord": '{wifiNetName}',
			// 	"inputData": {
			// 		"type": 'text',
			// 		"name": 'bridgessid',
			// 		"value": bridgessid,
			// 		"checkDemoFunc" : ['checkInput', 'name', '1', '9', '2']
			// 	},
			// 	"afterWord": ''
			// },  
			{
				"necessary" :true,
				"prevWord": '{wifiMACName}',
//				"disabled":true,
				"inputData": {
					"type": 'text',
					"name": 'briggebssid1',
					"value": bridgebssid,
					"checkFuncs" : ['checkMac']
				},
				"afterWord": ''
			},  
			{
				"necessary" :true,
				"prevWord": '{wifiMACName}',
				// "disabled":true,
				"inputData": {
					"type": 'text',
					"name": 'briggebssid2',
					"value": bridgebssid,
					"checkFuncs" : ['checkMac']
				},
				"afterWord": ''
			}, 
			{
				"necessary" :true,
				"prevWord": '{wifiMACName}',
				// "disabled":true,
				"inputData": {
					"type": 'text',
					"name": 'briggebssid3',
					"value": bridgebssid,
					"checkFuncs" : ['checkMac']
				},
				"afterWord": ''
			}, 
			{
				"necessary" :true,
				"prevWord": '{wifiMACName}',
				// "disabled":true,
				"inputData": {
					"type": 'text',
					"name": 'briggebssid4',
					"value": bridgebssid,
					"checkFuncs" : ['checkMac']
				},
				"afterWord": ''
			}, 
			{
			    	"prevWord"	:'{screType}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'apclisecmode',
				        "defaultValue" : apclisecmode,
				        items:[
				        	{name:'{noneEncry}' ,value:'NONE',control:'0'},
				        	{name:'WEP' ,value:'WEP',control:'1'},
//				        	{name:'WPA/WPA2' ,value:'WPAPSK',control:'2'},
				        	{name:'WPA-PSK/WPA2-PSK' ,value:'WPAPSK',control:'3'},
				        ]
				    },
				    "afterWord": ''
				},
				/* WEP */
				/*
				{	sign:'1',
			    	"prevWord"	:'{authType}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'wepAuthType',
				        "defaultValue" : wepAuthType,
				        items:[
					        {name:'{autoAuth}' ,value:'0'},
					        {name:'{openSystem}' ,value:'1'},
				        	{name:'{shareKey}' ,value:'2'}
				        ]
				    },
				    "afterWord": ''
				},
				*/
				{	sign:'1',
			    	"prevWord"	:'{keyType}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'apclikeyFormat',
				        "defaultValue" : apclikeyFormat,
				        items:[
					        {name:'{hexType}' ,value:'0'},
					        {name:'{asciiType}' ,value:'1'},
				        ]
				    },
				    "afterWord": ''
				},
				
				{
					sign:'1',
			    	"prevWord"	:'',
				    "inputData" : {
				        "type"       : 'words',
				        "name"       : '',
				        "value" : '{authTip}'
				    },
				    "afterWord": ''
				},
				{
					sign:'1',
			    	"prevWord"	:'{keyChoose}',
				    "inputData" : {
				        "type"       : 'text',
				        "name"       : 'wepmiyue',
				        value: ''
				    },
				    "afterWord": ''
				},
				{
					sign:'1',
			    	"prevWord"	:'{key}1',
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'apcliwepkey1',
				        "value"      : apcliwepkey1,
				        "eye"		: true,
				        "checkDemoFunc" : ['checkDemoPassword1','apclikeyLength1',"apclikeyFormat", "apclikeynum",0] 
				    },
				    "afterWord": ''
				},
				{
					sign:'1',
			    	"prevWord"	:'{key}2',
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'apcliwepkey2',
				        "value"      : apcliwepkey2,
				        "eye"		: true,
				        "checkDemoFunc" : ['checkDemoPassword1','apclikeyLength2',"apclikeyFormat", "apclikeynum",1] 
				    },
				    "afterWord": ''
				},
				{
					sign:'1',
			    	"prevWord"	:'{key}3',
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'apcliwepkey3',
				        "value"      : apcliwepkey3,
				        "eye"		: true,
				        "checkDemoFunc" : ['checkDemoPassword1','apclikeyLength3',"apclikeyFormat", "apclikeynum",2] 
				    },
				    "afterWord": ''
				},
				{
					sign:'1',
			    	"prevWord"	:'{key}4',
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'apcliwepkey4',
				        "value"      : apcliwepkey4,
				        "eye"		: true,
				        "checkDemoFunc" : ['checkDemoPassword1','apclikeyLength4',"apclikeyFormat",  "apclikeynum",3] 
				    },
				    "afterWord": ''
				},
				 /* WPA/WPA2 */
				{	sign:'2,3',
			    	"prevWord"	:'WPA{version}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'apcliwpapskAuthMode',
				        "defaultValue" : apcliwpapskAuthMode,
				        items:[
//				        	{name:'{autoAuth}' ,value:'0'},
				        	{name:'WPA-PSK' ,value:'WPAPSK'},
				        	{name:'WPA2-PSK' ,value:'WPA2PSK'}
				        ]
				    },
				    "afterWord": ''
				},
				{	sign:'2,3',
			    	"prevWord"	:'{screEncrp}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'apcliwpapskCipher',
				        "defaultValue" : apcliwpapskCipher,
				        items:[
//				        	{name:'{autoAuth}' ,value:'0'},
				        	{name:'TKIP' ,value:'TKIP'},
				        	{name:'AES' ,value:'AES'}
				        ]
				    },
				    "afterWord": ''
				},
				/*
				{
					sign:'2',
			    	"prevWord"	:'Radius{server}IP',
			    	"necessary" : true,
				    "inputData" : {
				        "type"       : 'text',
				        "name"       : 'radiusIP',
				        "value"		 : radiusIP,
				        "checkFuncs" : ['checkIP']
				    },
				    "afterWord": ''
				},
				{
					sign:'2',
			    	"prevWord"	:'Radius{serverPort}',
			    	"necessary" : true,
				    "inputData" : {
				        "type"       : 'text',
				        "name"       : 'radiusPort',
				        "value": radiusPort,
				        "checkDemoFunc" : ['checkNum','1','65535'] 

				    },
				    "afterWord": '{serverPortTip}'
				},
				{
					sign:'2',
			    	"prevWord"	:'Radius{scret}',
			    	"necessary" : true,
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'radiusPsswd',
				        "value": radiusPsswd,
				        "eye"	:true,
				        "checkDemoFunc": ['checkInput', 'name', '8', '30', '5']
				    },
				    "afterWord": '{scretTip}'
				},
				{
					sign:'2',
			    	"prevWord"	:'{keyFreshTime}',
			    	"necessary" : true,
				    "inputData" : {
				        "type"       : 'text',
				        "name"       : 'wpaTime',
				        "value"		 : wpaTime,
				        "checkDemoFunc" : ['checkInput','num', '60','86400', 'freshTime'] 
				    },
				    "afterWord"		 : '{keyFreshTimeTip}'
				},
				*/
				/*
				{
					sign:'2',
			    	"prevWord"	:'{自动下发}',
				    "inputData" : {
				        "type"       : 'checkbox',
				        "name"       : 'vlanType',
				        defaultValue: [(vlanType=='1'?'on':'')],
				        items:[
				        	{name:'',value:'on',checkOn:'1',checkOff:'0'},
				        ]
				    },
				    "afterWord": ''
				},
				*/
				
				
				/* WPA-PSK/WPA2-PSK */
				
				/*
				{	sign:'3',
			    	"prevWord"	:'WPA{版本}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'wpaVersion',
				        "defaultValue" : wpaVersion,
				        items:[
				        	{name:'WPA' ,value:'WPA'}
				        ]
				    },
				    "afterWord": ''
				},
				{	sign:'3',
			    	"prevWord"	:'{加密算法}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'jmsf2',
				        "defaultValue" : 'AES',
				        items:[
				        	{name:'AES' ,value:'AES'}
				        ]
				    },
				    "afterWord": ''
				},
				*/
				{
					sign:'3',
			    	"prevWord"	:'{preShareKey}',
			    	"necessary" : true,
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'apclipskPsswd',
				        "value"		 : apclipskPsswd,
				        "eye"		:true,
				        "checkDemoFunc": ['checkInput', 'name', '8', '30', '5']
				    },
				    "afterWord": '{preShareKeyTip}'
				},
				/*
				{
					sign:'3',
			    	"prevWord"	:'{keyFreshTime}',
			    	"necessary" : true,
				    "inputData" : {
				        "type"       : 'text',
				        "name"       : 'pskTime',
				        "value"		 : pskTime,
				        "checkDemoFunc" : ['checkInput','num','60','86400', 'freshTime'] 
				    },
				    "afterWord": '{keyFreshTimeTip}'
				}
				*/
		
		];
		var InputGroup = require('InputGroup'),
			$input = InputGroup.getDom(inputList);
		console.log("$input")
		console.log($input)
		/* 固定扫描*/
		$input.find('[name="briggebssid"]').parent().css('width','100px');
		
		/* 扫描链接 */
		var linkdatas = [
			{
				id : 'wdsscan',
				name : '{scan}',
				clickFunc :function($thisDom){
					$.ajax({
						type:"GET",
						url:"common.asp?optType=ApScan",
						success:function(result){
							var doEval = require('Eval');
							var variableArr = ['status','errorstr'];
							var res = doEval.doEval(result, variableArr);
							if (!res.isSuccessful) {
						       Tips.showError('{parseStrErr}');
						       return false;
						    }
							var tmer = Tips.showTimer('{dataReading}',8,function(){
								showScanModel();
							});
							setTimeout(function(){
								tmer.stop(true);
							},5000)
							 
							 
						}
					});
				}
			}
		];
		
		InputGroup.insertLink($input,'briggebssid1',linkdatas);
		InputGroup.insertLink($input,'briggebssid2',linkdatas);
		InputGroup.insertLink($input,'briggebssid3',linkdatas);
		InputGroup.insertLink($input,'briggebssid4',linkdatas);
		// 使顶格td长度固定
		$input.find('tr').children(':first').width('138px');
		
		// 密钥titile
		$input.find('[name="wepmiyue"]').after('<span style="margin-left:24px"  data-local="{webKey}">{webKey}</span><span style="margin-left:115px" data-local="{passwdType}">{passwdType}</span>');
		$input.find('[name="wepmiyue"]').parent().attr('colspan',2).next().remove();
		$input.find('[name="wepmiyue"]').remove();
		
		// 密钥1234
		$input.find('[name="apcliwepkey1"]').before('<input type="radio" name="apclikeynum" value="0" style="margin-right:10px" '+(apclikeynum=='0'?'checked="true"':'')+'/>');
		$input.find('[name="apcliwepkey2"]').before('<input type="radio" name="apclikeynum" value="1" style="margin-right:10px" '+(apclikeynum=='1'?'checked="true"':'')+'/>');
		$input.find('[name="apcliwepkey3"]').before('<input type="radio" name="apclikeynum" value="2" style="margin-right:10px" '+(apclikeynum=='2'?'checked="true"':'')+'/>');
		$input.find('[name="apcliwepkey4"]').before('<input type="radio" name="apclikeynum" value="3" style="margin-right:10px" '+(apclikeynum=='3'?'checked="true"':'')+'/>');
		
		
		$input.find('[name="apcliwepkey1"],[name="apcliwepkey2"],[name="apcliwepkey3"],[name="apcliwepkey4"]').parent().attr('colspan',2);
		$input.find('[name="apcliwepkey1"]').after('<select class="edittab_mytype" name="apclikeyLength1" style="margin-left:10px;width:80px" >'+
												'<option value="0" data-local="{disable}" '+(apclikeyLength1=='0'?'selected="selected"':'')+'>{disable}</option>'+
												'<option value="5" data-local="64{bit}" '+(apclikeyLength1=='5'?'selected="selected"':'')+'>64{bit}</option>'+
												'<option value="13" data-local="128{bit}" '+(apclikeyLength1=='13'?'selected="selected"':'')+'>128{bit}</option>'+
											'</select>');
		$input.find('[name="apcliwepkey2"]').after('<select class="edittab_mytype" name="apclikeyLength2" style="margin-left:10px;width:80px" >'+
												'<option value="0" data-local="{disable}" '+(apclikeyLength2=='0'?'selected="selected"':'')+'>{disable}</option>'+
												'<option value="5" data-local="64{bit}" '+(apclikeyLength2=='5'?'selected="selected"':'')+'>64{bit}</option>'+
												'<option value="13" data-local="128{bit}" '+(apclikeyLength2=='13'?'selected="selected"':'')+'>128{bit}</option>'+
											'</select>');
		$input.find('[name="apcliwepkey3"]').after('<select class="edittab_mytype" name="apclikeyLength3" style="margin-left:10px;width:80px" >'+
												'<option value="0" data-local="{disable}" '+(apclikeyLength2=='0'?'selected="selected"':'')+'>{disable}</option>'+
												'<option value="5" data-local="64{bit}" '+(apclikeyLength2=='5'?'selected="selected"':'')+'>64{bit}</option>'+
												'<option value="13" data-local="128{bit}" '+(apclikeyLength2=='13'?'selected="selected"':'')+'>128{bit}</option>'+
											'</select>');
		$input.find('[name="apcliwepkey4"]').after('<select class="edittab_mytype" name="apclikeyLength4" style="margin-left:10px;width:80px" >'+
												'<option value="0" data-local="{disable}" '+(apclikeyLength2=='0'?'selected="selected"':'')+'>{disable}</option>'+
												'<option value="5" data-local="64{bit}" '+(apclikeyLength2=='5'?'selected="selected"':'')+'>64{bit}</option>'+
												'<option value="13" data-local="128{bit}" '+(apclikeyLength2=='13'?'selected="selected"':'')+'>128{bit}</option>'+
											'</select>');
		$input.find('[name="apcliwepkey1"],[name="apcliwepkey2"],[name="apcliwepkey3"],[name="apcliwepkey4"]').parent().next().remove();
		/* 修改部分样式*/
		$input.find('[data-control="1"]').addClass('democonrrr');
		$input.find('.democonrrr .u-password-eye').css({'left':'164px','z-index':'100'});
		/* 绑定部分事件  */
		$input.find('select.edittab_mytype').change(function(){
			makeEdittabMytypeChange(this);
		});
		
		setTimeout(function(){
			$input.find('select.edittab_mytype').trigger('change');
			makeWepKeyRadioChange()
		},500);
		
		
		function makeEdittabMytypeChange(thisDom){
			var $t = $(thisDom);
			var $chooseDom = $t.prevAll('input[type="radio"]');
			var $inputDom = $t.prevAll('input[type="text"],input[type="password"]');
			if($t.val() != '0'){
				$chooseDom.removeAttr('disabled');
				$inputDom.removeAttr('disabled');
				$inputDom.blur();
			}else{
				$chooseDom.attr('disabled','disabled');
				$inputDom.attr('disabled','disabled');
				$inputDom.val('').blur();
			}
		}
		
		$input.find('[name="apclikeynum"]').click(function(){
			makeWepKeyRadioChange();
			})
		function makeWepKeyRadioChange(){
			InputGroup.checkErr($input.find('[name="apcliwepkey1"],[name="apcliwepkey2"],[name="apcliwepkey3"],[name="apcliwepkey4"]').parent())
		}
		
		
		$input.find('[name="apclikeyFormat"]').change(function(){
//			InputGroup.checkErr($input.find('[name="apcliwepkey1"],[name="apcliwepkey2"],[name="apcliwepkey3"],[name="apcliwepkey4"]').parent())
			makeWepKeyRadioChange();
		});
		
		
		
		
		
		var btnGroupList = [
		    {
		        "id"        : 'save',
		        "name"      : '{save}',
		        "clickFunc" : function($btn){
		        	
		        	
		        	var IG = require('InputGroup');
		        	if(IG.checkErr($con)>0){
		        		return false;
		        	}
		            var srlz = require('Serialize');
					var arrs = srlz.getQueryArrs($con);    
					var jsons = srlz.queryArrsToJson(arrs);
					
					var hidearr = [
						'WrlessEnables',  // 启用无线功能
					   'ssids',   // 无线网络名称
					   'encodeType',  // 编码
					   'limit_type',  // SSID限速策略
					   'limit_up',  // 上行
					   'limit_down',  // 下行
					   'broadcastEnables',  // 启用SSID1广播
					   
					   'ssid2s', 
					   'encodeType2', 
					   'limit_type2 ',  
					   'limit_up2 ',  
					   'limit_down2',  
					   'broadcastEnables2',  
					   
					   'wrlessModes',  // 无线模式
					   'channels',  // 信道
					   'chanWidths',  // 频宽
					   'LanWlanSep',  // 有线无线隔离
					   'multi_ssidSep'  // 无线多SSID隔离
					];
					
					var hidearrSend = [
					   'WrlessEnable',  // 启用无线功能
					   'ssid',   // 无线网络名称
					   'encodeType',  // 编码
					   'share_select',  // SSID限速策略
					   'rxBand',  // 上行
					   'txBand',  // 下行
					   'broadcastEnablew',  // 启用SSID1广播
					   
					   'ssid2', 
					   'encodeType2', 
					   'share_select2 ',  
					   'txBand2 ',  
					   'rxBand2',  
					   'broadcastEnablew2',  
					   
					   'wrlessMode',  // 无线模式
					   'channel',  // 信道
					   'chanWidth',  // 频宽
					   'LanWlanSep',  // 有线无线隔离
					   'WiredSsidSep'  // 无线多SSID隔离
					];
					
					hidearr.forEach(function(hidobj,i){
						jsons[hidearrSend[i]] = DATA.data[hidobj];
					});
					
					var datastr = srlz.queryJsonToStr(jsons);
					$.ajax({
						type:"POST",
						url:"/goform/ConfigWirelessBase",
						data:datastr,
						success:function(result){
							var doEval = require('Eval');
							var variableArr = ['status','errorstr'];
							var res = doEval.doEval(result, variableArr);
							if (!res.isSuccessful) {
						       Tips.showError('{parseStrErr}');
						       return false;
						    }
							
							if(!res["data"].status){
								Tips.showWarning('{saveFail}');
						      	return false;
							}
							
							Tips.showSuccess('{saveSuccess}');
							$('[href="#1"]').trigger('click');
							 
						}
					});
					
										
		        }
		    },
		    {
		        "id"        : 'reset',
		        "name"      : '{reset}',
		        "clickFunc" : function($btn){

		        }
		    }
		];
		var BtnGroup = require('BtnGroup');
		var $btnGroup = BtnGroup.getDom(btnGroupList).addClass('u-btn-group');
	   $con.empty().append($input,$btnGroup);
	   $con.append('<style>.democonrrr .input-error{left:276px !important;}</style>');
	   var dicArr     = ['common','doRFT','doNetName','doRouterConfig'];
	   Translate.translate([$con], dicArr);
	   
	}
	
	/*扫描表格*/
	function showScanModel(){
		$.ajax({
			url: 'common.asp?optType=aspOutPutApScan',
			type: 'GET',
			success: function(codeStr) {
				// 将后台数据处理为数据表格式的数据
				var doEval = require('Eval');
				variableArr =[	
					'bssids', // 无线MAC
					'ssids',  // 无线网络名称
					'channels',  // 信道
					'signalStrength',  // 信号强度
					'Encrypts'  //是否加密
				];	
				var result = doEval.doEval(codeStr, variableArr),
					isSuccess = result["isSuccessful"];
				
				if(!isSuccess){
					Tips.showError('{parseStrErr}');
					return false;	
				}
				var data = result["data"];
				// 获得表格Dom
				var Database = require('Database'),
				database = Database.getDatabaseObj(); // 数据库的引用
				// 存入全局变量DATA中，方便其他函数使用
				DATA["tableData"] = database;
				var fieldArr =['id','bssids','ssids','channels','signalStrength','Encrypts'];
				var dataArr = [];
				data.bssids.forEach(function(obj,i){
					dataArr.push([
						Number(i)+1,
						obj,
						data.ssids[i],
						data.channels[i],
						data.signalStrength[i],
						data.Encrypts[i]
					]);
				})
				// 将数据存入数据表中
				database.addTitle(fieldArr);
				database.addData(dataArr);
//				var database = DATA["tableData"];
				var headData = {
					"btns" : []
				};
				// 表格配置数据
				var tableList = {
					"database": database,
					"isSelectAll" : false,
					"dicArr":['common'],
					"titles": {
						"ID"		 : {
							"key": "id",
							"type": "text",
						},
						"{wifiMACAddress}"		 : {
							"key": "bssids",
							"type": "text",
						},	
						"{wifiNetName}"		 : {
							"key": "ssids",
							"type": "text",
						},
						"{signalStrength}"		 : {
							"key": "signalStrength",
							"type": "text",
						},
						"{channel}"		 : {
							"key": "channels",
							"type": "text",
						},
						"{isEncrypt}"		 : {
							"key": "Encrypts",
							"type": "text",
						},
						"{operation}"		 : {
							"type": "links",
							"links":[
								{
									name :'{chooses}',
									clickFunc:function($link){
										var thisdata = database.getSelect({primaryKey:$link.attr('data-primarykey')})[0]
										$('[name="bridgebssid"]').val(thisdata.bssids);
										DATA.modalObj.hide();
									}
								}
							]
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
				var TableContainer = require('P_template/common/TableContainer');
				var conhtml = TableContainer.getHTML({}),
					$tableCon = $(conhtml);
				// 将表格容器放入标签页容器里
				DATA.modalObj.insert($tableCon);
				$tableCon.append($table);
				var dicArr     = ['common','doRFT','doNetName','doRouterConfig'];
	    		Translate.translate([DATA.modalObj.getDom()], dicArr);
			}
		});
		
		
		/*制作弹框*/
		var modalList = {
			"id"   : "modal-scan",
			"title": tl('scan'),
			"size" : "large", //normal、large :普通宽度、加大宽度
			"btns" : []
		};
		// 初始化模态框，并获得模态框类实例
		var Modal = require('Modal');
		var modalObj = Modal.getModalObj(modalList);
		DATA.modalObj = modalObj;
		modalObj.show();
		var dicArr     = ['common','doRFT','doNetName','doRouterConfig'];
	    Translate.translate([DATA.modalObj.getDom()], dicArr);
	}
	 
	  
	 
	module.exports = {
		display: display
	};
});
