define(function(require, exports, module){
	require('jquery');
	var DATA = {};
	var Tips = require('Tips');
	var Translate  = require('Translate');
	 var dicArr = ['common','doRFT','doNetName','doRouterConfig'];
	function T(_str){
	    return Translate.getValue(_str, dicArr);
	}
	
	function display($con){
		$con.empty();
		
		$.ajax({
			type:"get",
			url:"/cgi-bin/luci?optType=aspOutPutApConfTempList",
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
			   'tmpname',  // 模板名称
			   'wlFres',   // 2.4G / 5G
			   'wlModes',  // 模式
			   'channels',  // 信道
			   'wlRates',  // 速率
			   'powers' // 功率
			   
		   ]; 
		   var result = doEval.doEval(res, variableArr);
		   if (!result.isSuccessful) {
		       Tips.showError('{parseStrErr}');
		       return false;
		    }
		   
		    var data = result["data"];
		    console.log(res);
		   
			return true;
	}
	//新增 编辑
	function editModal(type,data,$con){
		var data = data || {};
		var type = (type === undefined?'add':type);
		$con.empty();
		
		var encryType = '0',
			wepAuthType = '0',
			wepFormat = '',
			wepKey1Text = '',
			wepKey2Text = '',
			wepKey3Text = '',
			wepKey4Text = '',
			wpaVersion = '0',
			wpaEncrp = '0',
			radiusIP = '',
			radiusPort = '',
			radiusPsswd = '',
			wpaTime = '',
			pskPsswd = '',
			pskTime = '',
			wepKeyRadio = '0',
			wepKey1Type = '0',
			wepKey2Type = '0',
			wepKey3Type = '0',
			wepKey4Type = '0';
			
			
		var inputList = [
			{
				"prevWord": 'WDS功能',
				"inputData": {
					"type": 'radio',
					"name": 'WDSGN',
					defaultValue:'0',
					items:[
						{name:'开启',value:'1'},
						{name:'关闭',value:'0'}
					]
				},
				"afterWord": ''
			},
			{
				"prevWord": '无线模式',
				"inputData": {
					"type":"select",
					"name":"wifiPattern",
					"defaultValue" : encryType,
				        items:[
				        	{name:'{noneEncry}' ,value:'0',control:'0'},
				        	{name:'WEP' ,value:'1',control:'1'},
				        	{name:'WPA/WPA2' ,value:'2',control:'2'},
				        	{name:'WPA-PSK/WPA2-PSK' ,value:'3',control:'3'},
				        ]
				}
			},
			{
				"necessary" :true,
				"prevWord": '对等APMAC地址',
				"inputData": {
					"type": 'text',
					"name": 'APMAC1',
					"value": '',
//					"checkDemoFunc" : ['checkInput', 'name', '1', '9', '2']
				},
				"afterWord": ''
			},  
			{
				"necessary" :true,
				"prevWord": '对等APMAC地址',
				"inputData": {
					"type": 'text',
					"name": 'APMAC2',
					"value": '',
//					"checkDemoFunc" : ['checkInput', 'name', '1', '9', '2']
				},
				"afterWord": ''
			}, 
			{
				"necessary" :true,
				"prevWord": '对等APMAC地址',
				"inputData": {
					"type": 'text',
					"name": 'APMAC3',
					"value": '',
//					"checkDemoFunc" : ['checkInput', 'name', '1', '9', '2']
				},
				"afterWord": ''
			},
			{
				"necessary" :true,
				"prevWord": '对等APMAC地址',
				"inputData": {
					"type": 'text',
					"name": 'APMAC4',
					"value": '',
//					"checkDemoFunc" : ['checkInput', 'name', '1', '9', '2']
				},
				"afterWord": ''
			}, 
			{
			    	"prevWord"	:'{screType}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'encryType',
				        "defaultValue" : encryType,
				        items:[
				        	{name:'{noneEncry}' ,value:'0',control:'0'},
				        	{name:'WEP' ,value:'1',control:'1'},
				        	{name:'WPA/WPA2' ,value:'2',control:'2'},
				        	{name:'WPA-PSK/WPA2-PSK' ,value:'3',control:'3'},
				        ]
				    },
				    "afterWord": ''
				},
				/* WEP */
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
				{	sign:'1',
			    	"prevWord"	:'{keyType}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'wepFormat',
				        "defaultValue" : wepFormat,
				        items:[
					        {name:'{hexType}' ,value:'1'},
					        {name:'{asciiType}' ,value:'2'},
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
				        "name"       : 'wepKey1Text',
				        "value"      : wepKey1Text,
				        "eye"		: true,
				        "checkDemoFunc" : ['checkDemoPassword','wepKey1Type',"wepFormat", "wepKeyRadio",0] 
				    },
				    "afterWord": ''
				},
				{
					sign:'1',
			    	"prevWord"	:'{key}2',
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'wepKey2Text',
				        "value"      : wepKey2Text,
				        "eye"		: true,
				        "checkDemoFunc" : ['checkDemoPassword','wepKey2Type',"wepFormat", "wepKeyRadio",1] 
				    },
				    "afterWord": ''
				},
				{
					sign:'1',
			    	"prevWord"	:'{key}3',
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'wepKey3Text',
				        "value"      : wepKey3Text,
				        "eye"		: true,
				        "checkDemoFunc" : ['checkDemoPassword','wepKey3Type',"wepFormat", "wepKeyRadio",2] 
				    },
				    "afterWord": ''
				},
				{
					sign:'1',
			    	"prevWord"	:'{key}4',
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'wepKey4Text',
				        "value"      : wepKey4Text,
				        "eye"		: true,
				        "checkDemoFunc" : ['checkDemoPassword','wepKey4Type',"wepFormat",  "wepKeyRadio",3] 
				    },
				    "afterWord": ''
				},
				 /* WPA/WPA2 */
				{	sign:'2,3',
			    	"prevWord"	:'WPA{version}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'wpaVersion',
				        "defaultValue" : wpaVersion,
				        items:[
				        	{name:'{autoAuth}' ,value:'0'},
				        	{name:'WPA' ,value:'1'},
				        	{name:'WPA2' ,value:'2'}
				        ]
				    },
				    "afterWord": ''
				},
				{	sign:'2,3',
			    	"prevWord"	:'{screEncrp}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'wpaEncrp',
				        "defaultValue" : wpaEncrp,
				        items:[
				        	{name:'{autoAuth}' ,value:'0'},
				        	{name:'TKIP' ,value:'1'},
				        	{name:'AES' ,value:'2'}
				        ]
				    },
				    "afterWord": ''
				},
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
				        "name"       : 'pskPsswd',
				        "value"		 : pskPsswd,
				        "eye"		:true,
				        "checkDemoFunc": ['checkInput', 'name', '8', '30', '5']
				    },
				    "afterWord": '{preShareKeyTip}'
				},
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
		
		];
		var InputGroup = require('InputGroup'),
			$input = InputGroup.getDom(inputList);
		var btndatas = [
        {
            id : 'config',
            name : '扫描',
            clickFunc :function($thisDom){
                alert('你点击了配置小按钮');
            }
        }]

		InputGroup.insertBtn($input,'APMAC4',btndatas);
		InputGroup.insertBtn($input,'APMAC3',btndatas);
		InputGroup.insertBtn($input,'APMAC2',btndatas);
		InputGroup.insertBtn($input,'APMAC1',btndatas);
		// 使顶格td长度固定
		$input.find('tr').children(':first').width('138px');
		
		// 密钥titile
		$input.find('[name="wepmiyue"]').after('<span style="margin-left:24px"  data-local="{webKey}">{webKey}</span><span style="margin-left:115px" data-local="{passwdType}">{passwdType}</span>');
		$input.find('[name="wepmiyue"]').parent().attr('colspan',2).next().remove();
		$input.find('[name="wepmiyue"]').remove();
		
		// 密钥1234
		$input.find('[name="wepKey1Text"]').before('<input type="radio" name="wepKeyRadio" value="0" style="margin-right:10px" '+(wepKeyRadio=='0'?'checked="true"':'')+'/>');
		$input.find('[name="wepKey2Text"]').before('<input type="radio" name="wepKeyRadio" value="1" style="margin-right:10px" '+(wepKeyRadio=='1'?'checked="true"':'')+'/>');
		$input.find('[name="wepKey3Text"]').before('<input type="radio" name="wepKeyRadio" value="2" style="margin-right:10px" '+(wepKeyRadio=='2'?'checked="true"':'')+'/>');
		$input.find('[name="wepKey4Text"]').before('<input type="radio" name="wepKeyRadio" value="3" style="margin-right:10px" '+(wepKeyRadio=='3'?'checked="true"':'')+'/>');
		
		
		$input.find('[name="wepKey1Text"],[name="wepKey2Text"],[name="wepKey3Text"],[name="wepKey4Text"]').parent().attr('colspan',2);
		$input.find('[name="wepKey1Text"]').after('<select class="edittab_mytype" name="wepKey1Type" style="margin-left:10px;width:80px" >'+
												'<option value="0" data-local="{disable}" '+(wepKey1Type=='0'?'selected="selected"':'')+'>{disable}</option>'+
												'<option value="1" data-local="64{bit}" '+(wepKey1Type=='1'?'selected="selected"':'')+'>64{bit}</option>'+
												'<option value="2" data-local="128{bit}" '+(wepKey1Type=='2'?'selected="selected"':'')+'>128{bit}</option>'+
											'</select>');
		$input.find('[name="wepKey2Text"]').after('<select class="edittab_mytype" name="wepKey2Type" style="margin-left:10px;width:80px" >'+
												'<option value="0" data-local="{disable}" '+(wepKey2Type=='0'?'selected="selected"':'')+'>{disable}</option>'+
												'<option value="1" data-local="64{bit}" '+(wepKey2Type=='1'?'selected="selected"':'')+'>64{bit}</option>'+
												'<option value="2" data-local="128{bit}" '+(wepKey2Type=='2'?'selected="selected"':'')+'>128{bit}</option>'+
											'</select>');
		$input.find('[name="wepKey3Text"]').after('<select class="edittab_mytype" name="wepKey3Type" style="margin-left:10px;width:80px" >'+
												'<option value="0" data-local="{disable}" '+(wepKey3Type=='0'?'selected="selected"':'')+'>{disable}</option>'+
												'<option value="1" data-local="64{bit}" '+(wepKey3Type=='1'?'selected="selected"':'')+'>64{bit}</option>'+
												'<option value="2" data-local="128{bit}" '+(wepKey3Type=='2'?'selected="selected"':'')+'>128{bit}</option>'+
											'</select>');
		$input.find('[name="wepKey4Text"]').after('<select class="edittab_mytype" name="wepKey4Type" style="margin-left:10px;width:80px" >'+
												'<option value="0" data-local="{disable}" '+(wepKey4Type=='0'?'selected="selected"':'')+'>{disable}</option>'+
												'<option value="1" data-local="64{bit}" '+(wepKey4Type=='1'?'selected="selected"':'')+'>64{bit}</option>'+
												'<option value="2" data-local="128{bit}" '+(wepKey4Type=='2'?'selected="selected"':'')+'>128{bit}</option>'+
											'</select>');
		$input.find('[name="wepKey1Text"],[name="wepKey2Text"],[name="wepKey3Text"],[name="wepKey4Text"]').parent().next().remove();
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
		
		$input.find('[name="wepKeyRadio"]').click(function(){
			makeWepKeyRadioChange();
			})
		function makeWepKeyRadioChange(){
			InputGroup.checkErr($input.find('[name="wepKey1Text"],[name="wepKey2Text"],[name="wepKey3Text"],[name="wepKey4Text"]').parent())
		}
		
		
		$input.find('[name="wepFormat"]').change(function(){
			InputGroup.checkErr($input.find('[name="wepKey1Text"],[name="wepKey2Text"],[name="wepKey3Text"],[name="wepKey4Text"]').parent())
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
					
					jsons['action'] = (type=="add"?'add':'edit');
					
					
					/* 区分2.4G 5G 数据*/
					var g5json = {};
					for(var i in jsons){
						if(i.indexOf('_5')>0){
							g5json[i.substr(0,i.length-2)] = jsons[i];
							delete jsons[i];
						}
					}

					g5json.VHTBW = jsons.VHTBW;
					g5json.name = jsons.name+"_5";
					g5json.oldName = jsons.oldName;
					g5json.action = jsons.action;
					g5json.wlFre = '1';
					
					jsons.name = jsons.name+"_4";
					jsons.wlFre = '0';
					
					if(type=='add'){
						jsons.oldName = '';
						g5json.oldName = '';
					}else{
						g5json.oldName = jsons.oldName+'_5';
						jsons.oldName = jsons.oldName+"_4";
					}
					
					var str4 = srlz.queryJsonToStr(jsons);
					var str5 = srlz.queryJsonToStr(g5json);
					
					sendAjax(str4,str5);
					
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
	
	  
	module.exports = {
		display: display
	};
});
