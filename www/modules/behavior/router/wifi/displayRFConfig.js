define(function(require, exports, module){
	require('jquery');
	var DATA = {};
	var Tips = require('Tips');
	var Translate  = require('Translate');
	 var dicArr = ['common','doRFT'];
	function T(_str){
	    return Translate.getValue(_str, dicArr);
	}
	
	function display($con){
		$con.empty();
		
		$.ajax({
			type:"get",
			url:"/cgi-bin/luci/admin/rfConfig",
			success:function(result){
				result = JSON.parse(result);
				// 数据处理
				var pro = processData(result);
				if(!pro){
					return false;
				}
				//生成表格
				editModal('edit',DATA.data,$con)
			}
		});
		
	}
	
	// 处理数据
	function processData(res){
	   var doEval = require('Eval');
	   var variableArr = [
			   'WrlessEnables',		 // on off 开启关闭
			   'wrlessModes',  		 // 模式4/6/9（4:仅11g，6:仅11n,9:11b/g/n混合）
			   'channels',     		 // 信道 0/1/2/3/4/5/6/7/8/9/10/11(0代表自动)
			   'chanWidths',   		 // 频道带宽 1/0(1:自动,0:20M)
			   'beacons',      		 // 信标间隔 400/其它（默认400）
			   'wmm',              //  WMM 1/0(1:开启，0:关闭)
			   'shpreambles',      // 短前导码 1/0(1:开启，0:关闭)
			   'rts',
			   'frag',
			   'dtim_period',
			   
			   'WrlessEnables_5',  // "on"/"off"(on:开启,off:"关闭")
			   'wrlessModes_5',    // 2/8/14/15(2:仅11a, 8:11a/n混合, 14:11vht AC/AN/A, 15:_11vht_AC_AN) 
			   'channels_5',       // 信道36/40/44/48/149/153/157/161/165(0代表自动)
			   'chanWidths_5',     // 频道带宽 1/0(1:自动,0:20M)
			   'beacons',          // 400/其它（默认400）
			   'wmm_5',            // WMM 1/0(1:开启，0:关闭)
			   'shpreambles_5',    // 短前导码 1/0(1:开启，0:关闭)
			   'rts_5',
			   'frag_5',
			   'dtim_period_5',
	   ]; 
	   var result = doEval.doEval(res, variableArr);
	   if (!result.isSuccessful) {
	       Tips.showError('{parseStrErr}');
	       return false;
	   }
	   
	  DATA.data = result["data"];
	  console.log(DATA.data);
		return true;
	}
	
	//新增 编辑
	function editModal(type,data,$con){
		var data = data || {};
		var type = (type === undefined?'add':type);
		$con.empty();
//		$('[href="#1"]').text(type=='add'? '{新增}':'{编辑}');
		
		var $divleft = $('<div id="divleft" style="position:relative;display:inline-block;width:350px;height:auto;"></div>');
		var $divright = $('<div id="divright" style="position:absolute;display:inline-block;width:350px;height:auto;left:500px;"></div>');
		var $divSelect=$(
						'<div style="border-bottom:1px dotted #cecece;padding:1em 0">'+
							'<span style="padding-left:2em">频段优先<span>'+
							    '<select style="margin-left:10px">'+
							        '<option value="5">5G优先'+
							        '</option>'+
							    '</select>'+
						'</div>'
						)
		$divleft.append(getLeftInputGroup(data));
		$divright.append(getRightInputGroup(data));
		$(".tab-content").prepend($divSelect);
		console.log("get......")
		console.log($(".tab-content"))
		
		
		
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
					
					var datastr = srlz.queryJsonToStr(jsons);
					
					sendAjax(datastr);
					
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
		var $coverdom = $('<div style="position:relative;display:iblock;width:100%;height:auto;overflow:hidden"></div>');
		$coverdom.append($divleft,$divright);
		$coverdom.find('tr').children(':first-of-type').css('min-width','98px');
	    $con.empty().append($coverdom,$btnGroup);
	   $con.find('[data-control="gjxx"]').addClass('u-hide');
	   Translate.translate([$btnGroup], dicArr);
	   
	}
	/* 
	 	2.4G
	 * */
	function getLeftInputGroup(data){
		var inputList = [
			{
				"inputData": {
					"type": 'title',
					"name" : '2.4G' ,
				}
			},
			{
				"prevWord": '{wireless_capability}',
				"inputData": {
					"type": 'radio',
					"name": 'WrlessEnable',
					defaultValue:data.WrlessEnables || '0',
					items:[
						{name:'{open}',value:'0'},
						{name:'{close}',value:'1'}
					]
				},
				"afterWord": ''
			},
			{
				"prevWord": '{wireless_mode}',
				"inputData": {
					"type": 'select', 
					"name": 'wrlessMode',
					defaultValue:data.wrlessModes || '11bg',
					items:[
						{name:'{_11g_only}',value:'11g'},
						{name:'{_11n_only}',value:'11n'},
						{name:'{_11b_g_n_mix}',value:'11bg'}
					]
				},
				"afterWord": ''
			}, 
			
			{
				"prevWord": '{wireless_channel}',
				"inputData": {
					"type": 'select',
					"name": 'channel',
					defaultValue:data.channels || '0',
					items:[
						{name:'{auto}',value:'0'},
						{name:'1',value:'1'},
						{name:'2',value:'2'},
						{name:'3',value:'3'},
						{name:'4',value:'4'},
						{name:'5',value:'5'},
						{name:'6',value:'6'},
						{name:'7',value:'7'},
						{name:'8',value:'8'},
						{name:'9',value:'9'},
						{name:'10',value:'10'},
						{name:'11',value:'11'},
					]
				},
				"afterWord": ''
			}, 
			{
				"prevWord": '{channel_bandwidth}',
				"inputData": {
					"type": 'select',
					"name": 'chanWidth',
					defaultValue:(data.chanWidths === undefined?'1':data.chanWidths),
					items:[
						{name:'{auto}',value:'1'},
						{name:'HT20',value:'HT20'},
						{name:'HT40-',value:'HT40-'},
						{name:'HT40',value:'HT40'},
						{name:'HT40+',value:'HT40+'},
					]
				},
				"afterWord": ''
			}, 
			
			{
				"prevWord": '{wireless_transpower}',
				"inputData": {
					"type": 'select',
					"name": 'power',
					defaultValue:data.power || '0',
					items:[
						{name:'{auto}',value:'0'},
						{name:'{manual}',value:'1'}
					]
				},
				"afterWord": ''
			},
			
			{
				"prevWord": '最大客户数量',
				"inputData": {
					"type": 'text',
					"name": 'zdkhsl2',
					value:'128',
				},
				"afterWord": ''
			},

			//隐藏数据
			{
				"prevWord": '',
				"inputData": {
					"type": 'text',
					"name": 'gjxx_',
					value:'',
				},
				"afterWord": ''
			},
			{
				"prevWord": '',
				"inputData": {
					"type": 'text',
					"name": 'gjxx',
					value:'',
				},
				"afterWord": ''
			},
			{
				"sign"    :'gjxx',
				"prevWord": 'RTS阈值',
				"inputData": {
					"type": 'text',
					"name": 'rts',
					"value": data.rts || '',
					"checkDemoFunc":["checkNum","1","2347",'int']
					
				},
				"afterWord": '字节(取值范围:1-2347)'
			},
			{
				"sign"    :'gjxx',
				"prevWord": '分段阈值',
				"inputData": {
					"type": 'text',
					"name": 'frag',
					"value": data.frag || '',
					"checkDemoFunc":["checkNum","255","2346",'int']
					
				},
				"afterWord": '字节(取值范围:255-2346)'
			},
			{
				"sign"    :'gjxx',
				"prevWord": 'Beacon间隔',
				"inputData": {
					"type": 'text',
					"name": 'beacon',
					"value": data.beacons || '',
					"checkDemoFunc":["checkNum","20","999",'int']
					
				},
				"afterWord": '毫秒(取值范围:20-999)'
			},
			{
				"sign"    :'gjxx',
				"prevWord": 'DTIM间隔',
				"inputData": {
					"type": 'text',
					"name": 'dtim_period',
					"value": data.dtim_period || '',
					"checkDemoFunc":["checkNum","1","255",'int']
					
				},
				"afterWord": '取值范围:1-255'
			},
			{
				"sign"    :'gjxx',
				"prevWord": '启动短前导',
				"inputData": {
					"type": 'checkbox',
					"name": 'shpreamble',
					defaultValue:data.shpreambles ||'0',
					items:[
						{"value" : 'short_preamble', checkOn :'on',checkOff :'off' ,hide:false ,disabled:false}
					]
				},
				"afterWord": ''
			},
			{
				"sign"    :'gjxx',
				"prevWord": '启动WMM',
				"inputData": {
					"type": 'checkbox',
					"name": 'wmm',
					defaultValue:data.wmm || '0',
					items:[
						{"value" : 'wmm_capable', checkOn :'on',checkOff :'off' ,hide:false ,disabled:false}
					]
				},
				"afterWord": ''
			}
		];
		var InputGroup = require('InputGroup'),
		$dom = InputGroup.getDom(inputList);
		
		$dom.find('[name="gjxx"]').parent().prev().empty().append('<a class="u-inputLink" id="gjxxa" style="cursor:pointer">'+T('advanced_options')+'</a>');
		$dom.find('[name="gjxx"]').css('visibility','hidden');
		$dom.find('[name="gjxx_"]').css('visibility','hidden');
		$dom.find('#gjxxa').click(function(){
			if($(this).hasClass('gjxx-active')){
				$(this).removeClass('gjxx-active');
				$(this).text(T('advanced_options'));
				$('#1').find('[data-control="gjxx"]').addClass('u-hide');
				
			}else{
				$(this).addClass('gjxx-active');
				$(this).text(T('hide_advanced_options'));
				$('#1').find('[data-control="gjxx"]').removeClass('u-hide');
			}
		});
		
		// $dom.find('[name="power"]').css('width','75px');
		$dom.find('[name="power"]').after('<select name="manual" class="u-hide" style="width:75px;margin-left:10px"><option value="3">'+T('high')+'</option><option value="2">'+T('middle')+'</option><option value="1">'+T('low')+'</option></select>');
		$dom.find('[name="manual"]').children('option[value="'+(data.manPower||'1')+'"]').attr('selected','selected');
		$dom.find('[name="power"]').change(function(){
			makewxcsgl2Chaneg();
		});
		makewxcsgl2Chaneg();
		function makewxcsgl2Chaneg(){
			if($dom.find('[name="power"]').val() == '1'){
				$dom.find('[name="manual"]').removeClass('u-hide');
			}else{
				$dom.find('[name="manual"]').addClass('u-hide');
			}
			
		}
		
		/* 模式 与无线速率的交互*/
		var $mode = $dom.find('[name="mode"]');
		var $c_0 = $dom.find('[name="rate"]').children('[value="0"]');
		var $c_11 = $dom.find('[name="rate"]').children('[value="11"]');
		var $c_54= $dom.find('[name="rate"]').children('[value="54"]');
		var $c_150 = $dom.find('[name="rate"]').children('[value="150"]');
		var $c_300 = $dom.find('[name="rate"]').children('[value="300"]');
		var g24arr = [$c_0,$c_11,$c_54,$c_150,$c_300];
		var $rate = $dom.find('[name="rate"]');
		
		makeModeChange()
		$mode.change(function(){
			makeModeChange()
		});
		function makeModeChange(){
			var modval = $mode.val();
			if(modval == '1'){
				rmd([$c_0,$c_54]);
			}else if(modval == '2'){
				rmd([$c_0,$c_150,$c_300]);
			}else if(modval == '3'){
				rmd([$c_0]);
			}
		}
		
		function rmd(arr){
			var rateval = $rate.val();
			var changeval = false;
			g24arr.forEach(function(arrobj){
				if(arr.indexOf(arrobj)>=0){
					arrobj.removeAttr('disabled');
					
				}else{
					arrobj.attr('disabled','disabled');
					if(rateval == arrobj.val()){
						changeval = true;
					}
				}
				if(changeval){
					$rate.val($rate.children(':not([disabled])').eq(0).val());
				}
			});
			
		}
		
		Translate.translate([$dom], dicArr);
		return $dom;
	}
	/*5G*/
	function getRightInputGroup(data){
		var inputList = [
		{
			"inputData": {
				"type": 'title',
				"name" : '5G' ,
			},
		},
		
		{
				"prevWord": '{wireless_capability}',
				"inputData": {
					"type": 'radio',
					"name": 'WrlessEnable_5',
					defaultValue:data.WrlessEnables_5||'0',
					items:[
						{name:'{open}',value:'0'},
						{name:'{close}',value:'1'}
					]
				},
				"afterWord": ''
			},
			{
				"prevWord": '{wireless_mode}',
				"inputData": {
					"type": 'select',
					"name": 'wrlessMode_5',
					defaultValue:data.wrlessModes_5 || '11ac',
					items:[
						{name:'11a', value:'11a', control:'mode_no'},
						{name:'11n', value:'11n', control:'mode_no'},
						{name:'11an', value:'11na', control:'mode_no'},
						{name:'11ac', value:'11ac', control:'mode_ok'},
					]
				},
				"afterWord": ''
			}, 
			
			{
				"prevWord": '{wireless_channel}',
				"inputData": {
					"type": 'select',
					"name": 'channel_5',
					defaultValue:data.channels_5 || '0',
					items:[
						{name:'{auto}',value:'0'},
						{name:'36',value:'36'},
						{name:'40',value:'40'},
						{name:'44',value:'44'},
						{name:'48',value:'48'},
						{name:'149',value:'149'},
						{name:'153',value:'153'},
						{name:'157',value:'157'},
						{name:'161',value:'161'},
						{name:'165',value:'165'},
						
					]
				},
				"afterWord": ''
			}, 
			{
				"prevWord": '{channel_bandwidth}',
				"inputData": {
					"type": 'select',
					"name": 'chanWidth_5',
					defaultValue:(data.chanWidths_5 === undefined?'1':data.chanWidths_5),
					items:[
						{name:'{auto}',value:'1'},
						{name:'HT20',value:'HT20'},
						{name:'HT40-',value:'HT40-'},
						{name:'HT40',value:'HT40'},
						{name:'HT40+',value:'HT40+'},
						{name:'HT80',value:'HT80'},
						{name:'HT160',value:'HT160'},
						{name:'HT80_80',value:'HT80_80'},
					]
				},
				"afterWord": ''
			}, 
			
			{
				"prevWord": '{wireless_transpower}',
				"inputData": {
					"type": 'select',
					"name": 'power_5',
					defaultValue:data.power_5||'0',
					items:[
						{name:'{auto}',value:'0'},
						{name:'{manual}',value:'1'}
					]
				},
				"afterWord": ''
			},

			{
				"prevWord": '最大客户数量',
				"inputData": {
					"type": 'text',
					"name": 'zdkhsl5',
					value:'128',
				},
				"afterWord": ''
			},

			// 信标间隔
			{   "sign"    : 'mode_no',
				"prevWord": '',
				"inputData": {
					"type": 'text',
					"name":'for_mode_no',
					'value':''
				},
				"afterWord": ''
			},
			
			{
				"sign"	  : 'mode_no',
				"prevWord": '',
				"inputData": {
					"type": 'text',
					"name": 'gjxx',
					value:'',
				},
				"afterWord": ''
			},
			
			{
				"sign"    :'gjxx',
				"prevWord": 'RTS阈值',
				"inputData": {
					"type": 'text',
					"name": 'rts_5',
					"value": data.rts_5 || '',
					"checkDemoFunc":["checkNum","1","2347",'int']
					
				},
				"afterWord": '字节(取值范围:1-2347)'
			},
			
			{
				"sign"    :'gjxx',
				"prevWord": '分段阈值',
				"inputData": {
					"type": 'text',
					"name": 'frag_5',
					"value": data.frag_5 || '',
					"checkDemoFunc":["checkNum","256","2346",'int']
					
				},
				"afterWord": '字节(取值范围:256-2346)'
			},
			
			{
				"sign"    :'gjxx',
				"prevWord": 'Beacon间隔',
				"inputData": {
					"type": 'text',
					"name": 'beacon_5',
					"value": data.beacons_5 || '',
					"checkDemoFunc":["checkNum","20","999",'int']
					
				},
				"afterWord": '毫秒(取值范围:20-999)'
			},
			
			{
				"sign"    :'gjxx',
				"prevWord": 'DTIM间隔',
				"inputData": {
					"type": 'text',
					"name": 'dtim_period_5',
					"value": data.dtim_period_5 || '',
					"checkDemoFunc":["checkNum","1","255",'int']
					
				},
				"afterWord": '取值范围:1-255'
			},
			
			{
				"sign"    :'gjxx',
				"prevWord": '启动短前导',
				"inputData": {
					"type": 'checkbox',
					"name": 'shpreamble_5',
					defaultValue:data.shpreambles_5 ||'0',
					items:[
						{"value" : 'short_preamble', checkOn :'on',checkOff :'off' ,hide:false ,disabled:false}
					]
				},
				"afterWord": ''
			},
			
			{
				"sign"    :'gjxx',
				"prevWord": '启动WMM',
				"inputData": {
					"type": 'checkbox',
					"name": 'wmm_5',
					defaultValue:data.wmm_5 || '0',
					items:[
						{"value" : 'wmm_5', checkOn :'on',checkOff :'off' ,hide:false ,disabled:false}
					]
				},
				"afterWord": ''
			}
		];
		
		var InputGroup = require('InputGroup'),
		$dom = InputGroup.getDom(inputList);
		
		$dom.find('[name="for_mode_no"]').parent().css('height','30px');
		$dom.find('[name="for_mode_no"]').remove();
		
		$dom.find('[name="hides"]').css({'visibility':'hidden'});
		$dom.find('[name="gjxx"]').css({'visibility':'hidden'});
		
		$dom.find('[name="power_5"]').css('width','75px');
		$dom.find('[name="power_5"]').after('<select name="manual_5" class="u-hide" style="width:75px;margin-left:10px"><option value="3">'+T('high')+'</option><option value="2">'+T('middle')+'</option><option value="1">'+T('low')+'</option></select>');
		$dom.find('[name="manual_5"]').children('option[value="'+(data.manPower5||'1')+'"]').attr('selected','selected');
		$dom.find('[name="power_5"]').change(function(){
			makewxcsgl2Chaneg();
		});
		makewxcsgl2Chaneg();
		function makewxcsgl2Chaneg(){
			if($dom.find('[name="power_5"]').val() == '1'){
				$dom.find('[name="manual_5"]').removeClass('u-hide');
			}else{
				$dom.find('[name="manual_5"]').addClass('u-hide');
			}
			
		}
		
		Translate.translate([$dom], dicArr);
		return $dom;
	}
	
	
	function sendAjax(posystr){
		var wt2 = Tips.showWaiting('{dataSaving}');
		
		$.ajax({
			type:"post",
			url:'/cgi-bin/luci/admin/wireless_rfconfig',
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
		
		/* 检测并提示*/
		function checktip(){
			var isover = true;
			for(var n in afterdata){
				if(!afterdata[n]){
					isover = false;
				}
			}
			if(isover){
				wt2.remove();
				var errstr = false;
				for(var n in afterdata){
					if(afterdata[n] != '1'){
						errstr = afterdata[n];
						break;
					}
				}
				if(!errstr){
					Tips.showSuccess('{saveSuccess}');
					$('[href="#1"]').trigger('click');
				}else{
					Tips.showWarning(errstr);
				}
				
			}else{
				setTimeout(function(){
					checktip();
				},500);
			}
		}
		
		/* 发送单个ajax*/
		function ajaxpost(datastr,url,index){
			$.ajax({
				type:"post",
				url:url,
				data:datastr,
				success:function(result){
					var doEval = require('Eval');
					var variableArr = ['status','errorstr'];
					var result = doEval.doEval(result, variableArr);
					var isSuccessful = result['isSuccessful'];
					// 判断字符串代码是否执行成功
					if(isSuccessful){
					    // 执行成功
					    var data = result['data'];
					    if(data.status){
					    	afterdata['a'+index] = 1;
					    }else{
					    	Tips.showError();
					    	if(data.errorstr){
					    		afterdata['a'+index] = data.errorstr;
					    	}else{
					    		afterdata['a'+index] = '{saveFail}';
					    	}
					    }
					}
				}
			});
		}
	}
	
	
	  
	module.exports = {
		display: display
	};
});
