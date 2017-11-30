define(function(require, exports, module){
	require('jquery');
	var DATA = {};
	
	var Tips = require('Tips');
	function tl(str){
	    return require('Translate').getValue(str, ['error','common','doRouterConfig','doNetName']);
	}
	function display($con){
		var Translate = require('Translate');
		var dicNames = ['error','common','doRouterConfig','doNetName'];
		$con.empty();
		var TableContainer = require('P_template/common/TableContainer');
		var conhtml = TableContainer.getHTML({}),
		$tableCon = $(conhtml);
		$con.append($tableCon);		
		
		showTable($tableCon);
	}
	
	/* 获取数据 展示表格 */
	function showTable($tableConDom){
		$.ajax({
			type:"get",
			url:"/cgi-bin/luci/admin/WirelessInterface",
			success:function(result){
				result = JSON.parse(result)
				// 数据处理
				console.log(result);
				processData(result);
				//生成表格
				makeTable($tableConDom);
				$tableConDom.empty().append(DATA["tableObj"].getDom());
			}
		});
	}
	
/* 
加密模式:
	@1:不加密
		encryption=none 
	@2:wep加密
		encryption=wep-open
		key=2
		key2=""
	@3:wep-shared加密
		encryption=wep-shared
		key=2
		key2=""
	@4:WPA-PSK auto
		encryption=psk
		key=""
	@5:WPA-PSK CCMP
		encryption=psk+ccmp
		key=""
	@6:WPA-PSK TKIP
		encryption=psk+tkip
		key=""
	@7:WPA-PSK TKIP and CCMP
		encryption=psk+tkip+ccmp
*/

	function getbase(data,isShow){		
		 var Database = require('Database'),
			database = Database.getDatabaseObj(); // 数据库的引用
			// 声明字段列表，再加字段，注释必须对齐，不对齐去吃屎。
			var fieldArr =[
				'ID',
				'radio_type',
		  	'wIndex_24',				               // ssid编号，唯一标识ssid的东西
		  	'wIndex_5',
				'ssid',                            // ssid的名称
				'sta_rate_policy',	               // 限速策略		（1：共享    2：独享）	
				'sta_rate_down',	                 // 下行带宽
				'sta_rate_up',	                   // 上行带宽
				'rate_limit_show',                 // 用于把限速数据综合显示在页面上
				'isolate',	                       // 无线隔离		（注意：下标只有0）	（1：隔离	 2：不隔离）
				'encode',	                         // 编码			（UTF-8：手机优先   GBK：电脑优先简体	BIG5：电脑优先繁体）
				'hidde',						               // 隐藏ssid		（0：不隐藏ssid1  1：隐藏ssid1）
				'encryption',				               // 加密类型
				'psk_algorithm',                   // 加密算法             
				'psk_wpa_version',                 // psk加密的wpa版本
				'wep_authentication_type',				 // wep认证类型
				'key',							               // 密钥
			];
			
			var baseData = [];
			var j = 1;
			for(var i = 0; i < data.ssid.length; i++){
				
				/*将不可删除的条目进行标记*/
				cantDel = false;
				if(i == 0){
					cantDel = true;
				}
				
				baseData.push([
					Number(j),
					data.radio_type[i],
					data.wIndex_24[i],
					data.wIndex_5[i],
					data.ssid[i],
					data.sta_rate_policy[i],
					data.sta_rate_down[i],
					data.sta_rate_up[i],
					data.sta_rate_down[i] + "/" + data.sta_rate_up[i],
					data.isolate[i],
					data.encode[i],
					data.hidde[i],
					getEncryption(data, i),
					getPskAlgorithm(data, i),
					getPskWpaVersion(data, i),
					getAuthType(data, i),
					getShowPswd(data,i),
				]);
				j++;
			}
			
			// 将数据存入数据表中
			database.addTitle(fieldArr);
			database.addData(baseData);
			return database;
	}
	/* 密码显示 */
	function getShowPswd(data,i){
		var pswd = '';
		if(data.key[i] == 1)
			pswd = data.key1[i];
		else if(data.key[i] == 2)
			pswd = data.key1[i];
		else if(data.key[i] == 3)
			pswd = data.key1[i];
		else if(data.key[i] == 4)
			pswd = data.key1[i];		
		else 
			pswd = data.key[i];
		return pswd;
	}
	
	/*认证类型*/
	function getAuthType(data, i){
		if(data.encryption[i].indexOf("open") != -1)
			return "OPEN";
		else if(data.encryption[i].indexOf("shared") != -1)
			return "SHARED";
		else
			return "";
	}
	
	/*加密模式*/
	function getEncryption(data, i){
		if(data.encryption[i].indexOf("wep") != -1)
			return "wep";
		else if(data.encryption[i].indexOf("psk") != -1)
			return "psk";
		else
			return "none";
	}
	
	function getPskWpaVersion(data, i){
		if(data.encryption[i].indexOf("psk") != -1)
		{
			if(data.encryption[i].indexOf("psk2") != -1)
				return '2';
			else
				return '';
		}
		return ""
	}
	
	function getPskAlgorithm(data, i){
		var str = "";
		var encryption = data.encryption[i];
		if(encryption.indexOf("psk")!=-1)
		{
			if(encryption.indexOf("tkip")!=-1)
			{
				str = "tkip";
			}
			if(encryption.indexOf("ccmp")!=-1)
			{
				str = "ccmp";
			}
			if(encryption.indexOf("ccmp")!=-1 && encryption.indexOf("tkip")!=-1)
			{
				str = "tkip+ccmp";
			}
		}
		return str;
	}
	
	function getWpaVersion(data, i){
		return "";
	}
	
	// 处理数据
	function processData(res){
		  var doEval = require('Eval');
		  var variableArr = [
		  	'radio_type',				 // 射频类型
		  	'wIndex_24',				 // ssid编号，唯一标识ssid的东西
		  	'wIndex_5',
				'ssid',              // ssid的名称
				'sta_rate_policy',	 // 限速策略		（1：共享    2：独享）	
				'sta_rate_down',	   // 下行带宽
				'sta_rate_up',	     // 上行带宽
				'isolate',	         // 无线隔离		（注意：下标只有0）	（1：隔离	 2：不隔离）
				'encode',	           // 编码			（UTF-8：手机优先   GBK：电脑优先简体	BIG5：电脑优先繁体）
				'hidde',						 // 隐藏ssid		（0：不隐藏ssid1  1：隐藏ssid1）
				'encryption',				 // 加密类型
				'key',							 // 密钥 或者wep加密的第几个密钥
				'key1',							 // wep加密的密钥
				'key2',
				'key3',
				'key4',              
				'SSID2NUM', 				 // 条目数
				'SSID5NUM',          
				'radioSupport'       // 22 55 2255 标识该设备支持的2.4G 5G方式
		  ];
		   
		  var result = doEval.doEval(res, variableArr);
		  if (!result.isSuccessful) {
		  	Tips.showError('{parseStrErr}');
		  	return false;
		  }
		   
		  var data = result["data"];
		  DATA.radioSupport = data.radioSupport;
		  DATA.SSID2NUM     = data.SSID2NUM;
		  DATA.SSID5NUM     = data.SSID5NUM;
			DATA.objarr       = getbase(data).table('defaultTable').select();
			DATA["tableData2"] = getbase(data,true);
	}
	
	// 生成表格
	function makeTable($tableCon){
		// 表格上方按钮配置数据
		var btnList = [
		{
			"id": "addWBConfig",
			"name": '{add}',
			"clickFunc" : function($btn){
				makeModel('add',{})
			}
		},
		
		{
			"id": "delWBConfig",
			"name": '{delete}',
			"clickFunc" : function($btn){
				var primaryKeyArr = tableObj.getSelectInputKey('data-primaryKey'); 
			  var length  = primaryKeyArr.length;			
				
				if (length > 0) {
			    primaryKeyArr.forEach(function(primaryKey) {  
						var dataArr = database.getSelect({primaryKey : primaryKey});
						delssid(dataArr);
					});
				}else{
					Tips.showInfo('{unSelectDelTarget}');		
					return;				
				}	
      }
		}];
		
		var database = DATA["tableData2"];
		var headData = {
			"btns" : btnList
		};
		
		// 表格配置数据
		var tableList = {
			"database": database,
			otherFuncAfterRefresh:afterFunc,
			"isSelectAll":true,
			"dicArr" : ['error','common','doRouterConfig','doNetName'],
			"titles": {
				"ID"		 : {
					"key": "ID",
					"type": "text",
				},
				
			  "SSID": {
					"key": "ssid",
					"type": "text"
				},
				
				"{RFIf}": {
					"key": "radio_type",
					"type": "text",
					"filter":function(str){
						if(str=='24g'){
							return '2.4G';
						}else if(str=='5g'){
							return '5G';
						}else if(str=='245g'){
							return '2.4G,5G';
						}
					}
				},
				
				"vlan"		 : {
					"key": "vlan",
					"type": "text",
				},
				
				"{saveMode}": {
					"key": "encryption",
					"type": "text",
					"filter":function(str){
						if(str == "psk")
						{
							return "WPA-PSK/WPA2-PSK";
						}
						else if(str == "wpa")
						{
							return "WPA/WPA2"
						}
						else if(str == "wep")
						{
							return "WEP";
						}
						else
						{
							return "不加密";
						}
					}
				},
				
				"{wifiPassword}": {
					"key": "key",
					"type": "text",
				},
				
				"限速策略":{
					"key":"sta_rate_policy",
					"type":"text",
					"filter":function(str){
						if (str == '1')
						{
							return "共享";
						}
						else if(str == '2') 
						{
							return "独享";
						}
					}
				},
				
				//"{limitType}(bit/s)"		 : {
				"下载/上传速率(kbit/s)":{
					"key": "rate_limit_show",
					"type": "text",
				},
				
				"{edit}": {
					"type": "btns",
					"btns": [
						{
							"type"      : "edit",
							"clickFunc" : function($this){
								var data = database.getSelect({primaryKey : $this.attr('data-primaryKey')})[0];
								makeModel('edit',data)
							}
						},
						{
							"type"      : "delete",
							"clickFunc" : function($this){
								var dataArr = database.getSelect({primaryKey : $this.attr('data-primaryKey')});
								delssid(dataArr);
							}
						},
					]
				}
			}
		};
		
		var list = {
			head: headData,
			table: tableList
		};
		var Table = require('Table'),
		    tableObj = Table.getTableObj(list),
		    $table = tableObj.getDom();
		// 将表格组件对象存入全局变量，方便其他函数调用
		DATA["tableObj"] = tableObj;
		
		function afterFunc(NowTableObj){
			// 名称/MAC编辑
			NowTableObj.getDom().find('td[data-column-title="SSID"]').each(function(){
				var $t = $(this);
				if($t.children('span').length>0){
					var thisText = $t.children('span').text();
					var dpkey = $t.parent().find('[data-table-type="select"]').attr('data-primarykey');
					
					var linkhtml = '<a style="font-size:12px" class="u-inputLink link-forEdit" data-local="'+thisText+'" data-primarykey ="'+dpkey+'">'+thisText+'</a>';
					var $lh = $(linkhtml);
					
					var $inputhtml = $('<input type="text" style="height:20px" data-primarykey ="'+dpkey+'"/>');
					var $btnhtml = $('<button type="button" data-primarykey ="'+dpkey+'" class="btn btn-primary btn-forEditSave" style="position:absolute;top:-3px;left:50px">'+tl('save')+'</button>');
					var $divhtml = $('<div class="for-textEdit u-hide" style="display:inline-block;width:auto;height:auto;position:relative"></div>');
					$divhtml.append($inputhtml,$btnhtml);
					$t.empty();
					$t.append($lh,$divhtml);
				}
			});
			
			
			/* 密码修改*/
			NowTableObj.getDom().find('td[data-column-title="{wifiPassword}"]').each(function(){
				var $t = $(this);
				if($t.children('span:not(".netsher_table_eyes")').length>0){ //&& $t.children('span').text() != ''){
					var thisText = $t.children('span').text();
					var dpkey = $t.parent().find('[data-table-type="select"]').attr('data-primarykey');
					
					var linkhtml = '<a style="font-size:12px;font-weight:bold" class="u-inputLink link-forEdit netsher_table_paswd" data-local="'+thisText+'" data-primarykey ="'+dpkey+'"  data-pswd="'+(thisText == ''? tl('noPassword'):thisText)+'"  data-hidepswd="******">******</a>';
					var $lh = $(linkhtml);
					
					var $inputhtml = $('<input type="text" style="height:20px" data-primarykey ="'+dpkey+'"/>');
					var $btnhtml = $('<button type="button" data-primarykey ="'+dpkey+'" class="btn btn-primary btn-forEditSave" style="position:absolute;top:-3px;left:50px;z-idnex:1">'+tl('save')+'</button>');
					var $divhtml = $('<div class="for-textEdit u-hide" style="display:inline-block;width:auto;height:auto;position:relative"></div>');
					$divhtml.append($inputhtml,$btnhtml);
					
					var $eye = $('<span class="netsher_table_eyes glyphicon glyphicon-eye-open"></span>');
					$t.empty();
					if($t.prev().children('span').text() != 'WPA/WPA2'&& $t.prev().children('span').text() != 'WEP'){
						if($t.prev().children('span').text() == 'WPA-PSK/WPA2-PSK'){
							$t.append($lh,$divhtml,$eye);
						}else{
							var linkhtml2 = '<a style="font-size:12px;" class="u-inputLink link-forEdit netsher_table_paswd" data-local="'+tl('noPassword')+'" data-primarykey ="'+dpkey+'"  data-pswd="'+tl('noPassword')+'"  data-hidepswd="'+tl('noPassword')+'">'+tl('noPassword')+'</a>';
							var $lh2 = $(linkhtml2);
							$t.append($lh2,$divhtml);
						}
						
					}else{
						var linkhtml1 = '<span style="font-size:12px;font-weight:bold;margin-right:10px" class="span-forEdit netsher_table_paswd" data-local="'+thisText+'" data-primarykey ="'+dpkey+'"  data-pswd="'+thisText+'"  data-hidepswd="******">******</span>';
						var $lh1 = $(linkhtml1);
						$t.append($lh1,$eye);
					}
					
				}
			});
		}
		
		/* 绑定表格全局小眼睛 */
		$table.on('click','.netsher_table_eyes',function(event){
			var ev = event || window.event;
			var tar = ev.target || ev.srcElement;
			var $t = $(tar);
			
			if($t.hasClass('glyphicon-eye-open')){
				$t.removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
				var $p = $t.prevAll('.netsher_table_paswd');
				$p.html($p.attr('data-pswd')).css('font-weight','normal');
			}else{
				$t.removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
				var $p = $t.prevAll('.netsher_table_paswd');
				$p.html($p.attr('data-hidepswd')).css('font-weight','bold');
			}
		})
		$(document).click(function(event){
			$('.link-forEdit').removeClass('u-hide');
			$('.for-textEdit').addClass('u-hide');
			
			var targ = (event || window.event).target || (event || window.event).srcElement;
			
			if($(targ).hasClass('for-textEdit')){
				hdieOther($(targ).parent());
			}else if($(targ).parent().hasClass('for-textEdit') && !$(targ).hasClass('btn-forEditSave')){
				hdieOther($(targ).parent().parent());
			}else if($(targ).hasClass('link-forEdit')){
				hdieOther($(targ).parent());
			}
			
			function hdieOther($td){
				$td.find('.link-forEdit').addClass('u-hide');
				$td.find('.for-textEdit').removeClass('u-hide');
				$td.find('.link-forSelect').addClass('u-hide');
				$td.find('.for-SelectEdit').removeClass('u-hide');
			}
		})
	
		// 全局绑定修改名称事件
		$table.on('click','td[data-column-title="SSID"]>a.link-forEdit,td[data-column-title="SSID"]>div.for-textEdit>button.btn-forEditSave',function(event){
			var e = event || window.event;
			var tag = e.target || e.srcElement;
			var $t = $(tag);
			var primaryKey = $t.attr('data-primaryKey')
			var data = DATA["tableData2"].getSelect({primaryKey : primaryKey})[0];
			if($t.hasClass('link-forEdit')){
				var $l = $(this);
				var thisWidth = 80;
				$l.addClass('u-hide');
				$l.next('.for-textEdit').removeClass('u-hide');
				$l.next('.for-textEdit').children('input').css('width',(thisWidth+15)+'px').val(data.SSID);
				$l.next('.for-textEdit').children('button').css('left',(thisWidth+17)+'px');
			}else if($t.hasClass('btn-forEditSave')){
				var $b = $(this);
				var checkInputFunc = require('P_core/CheckFunctions').getFunc('checkInput');
				
				var nowtext = $b.parent().children('input').val();
				var checkres = checkInputFunc(nowtext,['name','1','32','6','eqName']);
				
				if(checkres.isCorrect){
					
					var data = database.getSelect({primaryKey : $t.parent().parent().parent().find('[data-table-type="select"]').attr('data-primaryKey')})[0];
					data.ssid = nowtext;
					makeModel('edit',data,true)
					
				}else{
					Tips.showInfo(checkres.errorStr)
				}
			}
		});
			
			
		// 全局绑定修改密码事件
		$table.on('click','td[data-column-title="{wifiPassword}"]>a.link-forEdit,td[data-column-title="{wifiPassword}"]>div.for-textEdit>button.btn-forEditSave',function(event){
			var e = event || window.event;
			var tag = e.target || e.srcElement;
			var $t = $(tag);
			var primaryKey = $t.attr('data-primaryKey')
			var data = DATA["tableData2"].getSelect({primaryKey : primaryKey})[0];
			if($t.hasClass('link-forEdit')){
				var $l = $(this);
				var thisWidth = 80;
				$l.addClass('u-hide');
				$l.next('.for-textEdit').removeClass('u-hide');
				$l.next('.for-textEdit').children('input').css('width',(thisWidth+15)+'px').val(data.wifiPassword);
				$l.next('.for-textEdit').children('button').css({'left':(thisWidth+17)+'px','z-index':'1'});
			}else if($t.hasClass('btn-forEditSave')){
				var $b = $(this);
				var checkInputFunc = require('P_core/CheckFunctions').getFunc('checkInput');
				
				var nowtext = $b.parent().children('input').val();
				if(nowtext == ''){
					data.selModes = 'NONE';
					makeModel('edit',data,true)
				}else{
					var checkres = checkInputFunc(nowtext,['name','8','30','5']);
					if(checkres.isCorrect){
						var data = database.getSelect({primaryKey : $t.parent().parent().parent().find('[data-table-type="select"]').attr('data-primaryKey')})[0];
						data.pskPsswds = nowtext;
						data.selModes = 'WPA-PSK/WPA2-PSK';
						
						makeModel('edit',data,true)
					}else{
						Tips.showInfo(checkres.errorStr)
					}
					
				}
			}
		});
	}
	
	/* 删除方法 */
	function delssid(delarr){
		var candel = true;
		delarr.forEach(function(obj,i){
			if(obj.cantdel){
				candel = false;
			}
		});
		
		if(!candel){
			Tips.showWarning('{canNotDeleteDefaultTemplate}');
			return false;
		}else{
			Tips.showConfirm(tl('delconfirm'),function(){
				/*整理需要删除的所有数据*/
				var selurlArr = [];
				delarr.forEach(function(obj,i){
					selurlArr.push(obj.delgoform);
					if(obj.RFChoose == '25'){
						selurlArr.push(DATA.objarr[obj.modes].delgoform);
					}
				});
				
				var checkDelArr = new Array(selurlArr.length);
				
				selurlArr.forEach(function(del,i){
					 goDel(del,i)
				});
				settime();
				function settime(){
					setTimeout(function(){
						var isover = true;
						var isWrong = false;
						var errorStr = '';
						checkDelArr.forEach(function(dels){
							if(!dels){
								isover = false;
							}
							if(dels && dels != 1){
								isWrong = true;
								errorStr = dels;
							}
						});
						if(isover){
							if(isWrong){
								Tips.showWarning(errorStr);
							}else{
								Tips.showSuccess('{delSuccess}');
								$('[href="#1"]').trigger('click');
							}
						}else{
							settime();
						}
						
					},500)
				}
				
				function goDel(url,i){
					$.ajax({
						url:'/cgi-bin/luci',
						type:'post',
						data:'',
						success:function(result){
							var doEval = require('Eval');
							var codeStr = result,
								variableArr = ['status', 'errorstr'],
								result = doEval.doEval(codeStr, variableArr),
								isSuccess = result["isSuccessful"];
							// 判断代码字符串执行是否成功
							if (isSuccess) {
								var data = result["data"],
									status = data['status'];
									errorstr = data['errorstr'];
								if (status) {
									// 显示成功信息
									checkDelArr[i] = 1;
								} else {
									if(errorstr!=""){
										checkDelArr[i] = errorstr;
									}else{
										checkDelArr[i] = '{delFail}';
									}
									if(checkSave){
										$('[href="#1"]').trigger('click');
									}
								}
							} else {
								Tips.showWarning('{parseStrErr}');
								if(checkSave){
										$('[href="#1"]').trigger('click');
									}
							}					
						}
					});
				}
			},function(){	
			})
		}
	}
	
	
	/* 新增编辑 弹框*/
	function makeModel(type,data,checkSave){	
		
		var	fre2    = '1',
				fre5    = '1',
				ssid    = '',
				encode  = 'utf-8',
				isolate = '0',
				hidde   = '0',
				pssword = '1',
				key1    = '',
				key2    = '',
				key3    = '',
				key4    = '',
				encryption          = "none",
				psk_key_update_time = 60,
				psk_algorithm       = "",
				psk_wpa_version     = "",
				wpa_key_update_time = "",
				wpa_algorithm       = "",
				wpa_version         = "",
				wep_authentication_type = "",
				sta_rate_policy = '1',
				sta_rate_down = '0',
				sta_rate_up   = '0',
				wIndex_24 = DATA.SSID2NUM,
				wIndex_5 = DATA.SSID5NUM;
		
		if(type == 'edit'){
			//编辑已有SSID
			fre2    =(data.radio_type == '24g'||data.radio_type == '245g')?1:0;
			fre5    =(data.radio_type == '5g'||data.radio_type == '245g')?1:0;
			ssid    = data.ssid || "";
			encode  = data.encode || "utf-8"; 
			isolate = data.isolate || 0;
			hidde   = data.hidde || 0;
			pssword = data["key"];
			key1    = data.key1 || key1;
			key2    = data.key2 || key2;
			key3    = data.key3 || key3;
			key4    = data.key4 || key4;
			
			wIndex_24       = data.wIndex_24;
			wIndex_5        = data.wIndex_5;
			encryption      = data.encryption;
			psk_algorithm   = data.psk_algorithm;
			psk_wpa_version = data.psk_wpa_version;
			wep_authentication_type = data.wep_authentication_type;
			
			ste_rate_policy = data.sta_rate_policy || sta_rate_policy;
			ste_rate_down   = data.sta_rate_down   || sta_rate_down;
			ste_rate_up     = data.sta_rate_up     || sta_rate_up;
			
			wpa_key_update_time = "";
			wpa_algorithm       = "";
			wpa_version         = "";
		}
		
		var modallist = {
			id:'tab_modal',
			title:type=='add'?tl("add"):tl('edit'),
			size:'large',
			"btns" : [
			{
				//上一页按钮
				"id"      : 'prev_tab',
				"name"		: '{prePg}',
				"clickFunc" : function($this){
					DATA.tabModalObj.getDom().find('nav>ul.nav>li.active').prev().children('a').trigger('click');
      	}
      },
      
      {
      	//保存按钮
        "type"      : 'save',
        "clickFunc" : function($this){
        	editModalSave(type,false,data);
        }
      },
      
      {
      	//重填按钮
        "type"      : 'reset',
        clickFunc : function(){
        	//具体实现见下面代码
        }
      },
      
      {
      	//下一页按钮
        "id"      : 'next_tab',
        "name"		: '{nextPg}',
        "clickFunc" : function($this){
        	if(require('InputGroup').checkErr(DATA.tabModalObj.getDom().find(DATA.tabModalObj.getDom().find('nav>ul.nav>li.active').children('a').attr('href'))) == 0){
        		DATA.tabModalObj.getDom().find('nav>ul.nav>li.active').next().children('a').trigger('click');
        	}
        }
      },
      
      {
      	//关闭按钮
      	"type": 'close'
      }]
		};
		
		var Modal = require('Modal');
		var modalObj = Modal.getModalObj(modallist);
		DATA.tabModalObj = modalObj;

		/* 绑定特有的重填方法 */
		var $newreset = modalObj.getDom().find('#reset').clone(false).attr('id','newreset');
		modalObj.getDom().find('#reset').after($newreset);
		modalObj.getDom().find('#reset').remove();
		$newreset.click(function(){
			var $active = $(modalObj.getDom().find('nav>ul.nav>li.active>a').attr('href')).wrap('<form></form>');
			$active.parent()[0].reset();
			$active.unwrap();
			setTimeout(function(){
				$active.find('[type="radio"]:checked,select').each(function(){
					var $ti = $(this);
						var thisTagName = $ti[0].tagName;
						if(thisTagName == 'INPUT'){
							$ti.trigger('click');
						}else if(thisTagName == 'SELECT'){
							$ti.trigger('change');
						}
				});
				//取消所有报错气泡
				$active.find('.input-error').remove();
			},1)
		});
		
		var Tabs = require('Tabs');
		var tabsList = [
			{"id" : "e1", "title" : tl('wirelessSet')},
			{"id" : "e3", "title" : tl('safeSet')},
			{"id" : "e4", "title" : tl('bandwidthSet')}
		];
		var $tabsDom = Tabs.get$Dom(tabsList);
		modalObj.insert($tabsDom);
		var $tabmod = modalObj.getDom();
		$tabmod.find('a[href="#e1"]').click(function(event) {
			if(!$tabmod.find('#gjxx').hasClass('gjxx_close')){
				$tabmod.find('#gjxx').trigger('click');
			}
			showbtns(1);
		});
		$tabmod.find('a[href="#e2"]').click(function(event) {
			showbtns(2);
		});
		$tabmod.find('a[href="#e3"]').click(function(event) {
			showbtns(2);
		});
		$tabmod.find('a[href="#e4"]').click(function(event) {
			showbtns(3);
		});
		
		function showbtns(btnsType){
			var $pb = $tabmod.find('#prev_tab').parent();
			var $nb = $tabmod.find('#next_tab').parent();
			var $save = $tabmod.find('#save').parent();
			if(btnsType == '1'){
				// 起始tab
				$pb.addClass('u-hide');
				$nb.removeClass('u-hide');
				$save.addClass('u-hide');
			}else if(btnsType == '2'){
				// 中间tab
				$pb.removeClass('u-hide');
				$nb.removeClass('u-hide');
				$save.addClass('u-hide');
			}else if(btnsType == '3'){
				// 结束tab
				$pb.removeClass('u-hide');
				$nb.addClass('u-hide');
				$save.removeClass('u-hide');
			}
		}

		var nonull = displaye1($tabmod.find('#e1'));
		if(nonull == 'nonull'){
			Tips.showWarning('{reachMaxCountCantAdd}');
			return false;
		}

		displaye3($tabmod.find('#e3'));
		displaye4($tabmod.find('#e4'));
		$tabmod.find(' a[href="#e1"]').trigger('click');
		$tabmod.find('.modal-body').css({'min-height':'217px'})
		
		if(!checkSave){
			modalObj.show();
		}else{
			editModalSave(type,checkSave,data);
		}
		
   	/*获得初始化的数据*/
   	var netName = '',
   	    ssid	= '';

		/* 无线设置 */
		function displaye1($tabcon){
			var inputlist = [
				{
			    	"necessary" :true,
			    	"prevWord"	:'SSID',
				    "inputData" : {
				        "type"       : 'text',
				        "name"       : 'ssid',
				        "value"      : ssid,
				        "checkDemoFunc": ['checkInput', 'name', '1', '32',6] 
				    },
				    "afterWord": ''
				},
				{
			    	"prevWord"	:'{spjkIf}',
				    "inputData" : {
				        "type"       : 'checkbox',
				        "name"       : 'spjk',
				        "defaultValue" : [(fre2==1?'fre2':'0'),(fre5==1?'fre5':'0')],
				        items:[
				        	{name:'2.4G' ,value:'fre2',checkOn:'1',checkOff:'0'},
				        	{name:'5G' ,value:'fre5',checkOn:'1',checkOff:'0'}
				        ]
				    },
				    "afterWord": ''
				},
				{
					"necessary" :false,
			    	"prevWord"	:'VLAN ID',
				    "inputData" : {
				        "type"       : 'text',
				        "name"       : 'VlanId',
				        //"defaultValue": vlan,
				    },
				    "afterWord": ''
				},
				{
				    "inputData" : {
				        "type"       : 'text',
				        "name"       : 'gjxx',
				        "value"      : ''
				    },
				},
				{	
					"sign":'gj',
			    	"prevWord"	:'{hide}SSID',
				    "inputData" : {
				        "type"       : 'radio',
				        "name"       : 'hidde',
				        "defaultValue" : hidde,
				        items:[
				        	{name:'{open}' ,value:'1'},
				        	{name:'{close}' ,value:'0'}
				        ]
				    },
				    "afterWord": ''
				},
				{	
					"sign":'gj',
			    	"prevWord"	:'{wirelessIsolation}',
				    "inputData" : {
				        "type"       : 'radio',
				        "name"       : 'isolate',
				        "defaultValue" : isolate,
				        items:[
				        	{name:'{open}' ,value:'1'},
				        	{name:'{close}' ,value:'0'}
				        ]
				    },
				    "afterWord": ''
				},
			];
			
			var InputGroup = require('InputGroup');
			var $input = InputGroup.getDom(inputlist);
			/* 电脑/手机优先 */
			$input.find('[name="ssid"]').parent().next().append('<select name="encode" style="margin-left:10px"><option value="UTF-8" data-local="{phoneFirst}"'+(encode=='UTF-8'?'selected="selected"':'')+'>{phoneFirst}</option><option value="GBK" data-local="{computerFirst}" '+(encode=='GBK'?'selected="selected"':'')+'>{computerFirst}</option><option value="BIG5" data-local="{电脑优先（繁体）}"'+(encode=='BIG5'?'selected="selected"':'')+'>{电脑优先（繁体）}</option></select>');
			
			/* 高级选项切换*/
			$input.find('[name="gjxx"]').parent().prev().attr('colspan','2').empty().append('<a id="gjxx" class="gjxx_close" data-local="{advancedOptions}">{advancedOptions}<a/>');
			$input.find('[name="gjxx"]').parent().remove();
			$input.find('tr[data-control="gj"]').addClass('u-hide');
			$input.find('#gjxx').css('cursor','pointer').click(function(){
				var $t = $(this);
				if($t.hasClass('gjxx_close')){
					$t.removeClass('gjxx_close');
					$t.text(tl('hideAdvancedOptions'));
					$input.find('tr[data-control="gj"]').removeClass('u-hide');
				}else{
					$t.addClass('gjxx_close');
					$t.text(tl('advancedOptions'));
					$input.find('tr[data-control="gj"]').addClass('u-hide');
				}
			})
			$tabcon.empty().append($input);		
			
			$input.find('tr').each(function(){
				$(this).children('td').eq(0).css('width','101px')
			})
			
			/* 删除不可被勾选的2.4G 5G*/
			if(type == 'add'){
			}
			var tranDomArr = [$input,$tabmod];
			var dicArr     = ['error','common','doRouterConfig','doNetName'];
			require('Translate').translate(tranDomArr, dicArr);	
		}
		
		/* VLAN设置 */
		function displaye2($tabcon){	
			var inputlist = [
				{
					"necessary" :false,
			    	"prevWord"	:'VLAN ID',
				    "inputData" : {
				        "type"       : 'text',
				        "name"       : 'vlanId',
				        "defaultValue" : 0,
				    },
				    "afterWord": ''
				},
			];
			var InputGroup = require('InputGroup');
			var $input = InputGroup.getDom(inputlist);
			
			$tabcon.empty().append($input);
			var tranDomArr = [$input];
			var dicArr     = ['error','common','doRouterConfig','doNetName'];
			require('Translate').translate(tranDomArr, dicArr);				
		}
		
		/* 安全设置 */
		function displaye3($tabcon){
			
			var inputlist = [
				{
			    	"prevWord"	:'{screType}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'encryption',
				        "defaultValue": encryption,
				        items:[
				        	{name:'{noneEncry}' ,value:'none',control:'0'},
				        	{name:'WEP' ,value:'wep',control:'1'},
				        	{name:'WPA/WPA2' ,value:'wpa',control:'2'},
				        	{name:'WPA-PSK/WPA2-PSK' ,value:'psk',control:'3'},
				        ]
				    },
				    "afterWord": ''
				},
				
				/* WEP */
				{	sign:'1',
			    	"prevWord"	:'{authType}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'wep_authentication_type',
				        "defaultValue":wep_authentication_type,
				        items:[
					        {name:'{openSystem}' ,value:'open'},
				        	{name:'{shareKey}' ,value:'shared'}
				        ]
				    },
				    "afterWord": ''
				},

				{
					sign:'1',
			    	"prevWord"	:'{key}1',
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'key1',
				        "value"      : key1,
				        "eye"		: true,
				        "checkDemoFunc" : ['checkDemoPassword1','',"", "keynum",1] 
				    },
				    "afterWord": ''
				},
				
				{
					sign:'1',
			    	"prevWord"	:'{key}2',
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'key2',
				        "value"      : key2,
				        "eye"		: true,
				        "checkDemoFunc" : ['checkDemoPassword1','',"", "keynum",2] 
				    },
				    "afterWord": ''
				},
				
				{
					sign:'1',
			    	"prevWord"	:'{key}3',
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'key3',
				        "value"      : key3,
				        "eye"		: true,
				        "checkDemoFunc" : ['checkDemoPassword1','',"", "keynum",3] 
				    },
				    "afterWord": ''
				},
				
				{
					sign:'1',
			    	"prevWord"	:'{key}4',
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'key4',
				        "value"      : key4,
				        "eye"		: true,
				        "checkDemoFunc" : ['checkDemoPassword1','',"",  "keynum",4] 
				    },
				    "afterWord": ''
				},
				
				{
					sign:'1',
					'prevWord':'注意',
					"inputData":{
						"type":'words',
						"name":'',
						"value":'密钥长度可以为5，10，13，26.'
					},
					"afterWord":""
				},
				
				 /* WPA/WPA2 */
				{	sign:'2',
			    	"prevWord"	:'WPA{version}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'wpa_version',
				        "defaultValue": wpa_version,
				        items:[
				        	{name:'{autoAuth}' ,value:'WPA1WPA2'},
				        	{name:'WPA' ,value:'WPA'},
				        	{name:'WPA2' ,value:'WPA2'}
				        ]
				    },
				    "afterWord": ''
				},
				
				{	sign:'2',
			    	"prevWord"	:'{screEncrp}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'wpa_algorithm',
				        "defaultVaue": wpa_algorithm,
				        items:[
				        	{name:'{autoAuth}' ,value:'TKIPAES'},
				        	{name:'WPA-PSK' ,value:'WPAPSK'},
				        	{name:'WPA2-PSK' ,value:'WPA2PSK'}
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
				        "value": pssword,
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
				        "name"       : 'wpa_key_update_time',
				        "defaultValue": wpa_key_update_time,
				        "checkDemoFunc" : ['checkInput','num', '60','86400', 'freshTime'] 
				    },
				    "afterWord"		 : '{keyFreshTimeTip}'
				},
				
				{	sign:'3',
			    	"prevWord"	:'WPA{version}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'psk_wpa_version',
				        "defaultValue":psk_wpa_version,
				        items:[
				        	{name:'WPA' ,value:''},
				        	{name:'WPA2' ,value:'2'}
				        ]
				    },
				    "afterWord": ''
				},
				
				{	sign:'3',
			    	"prevWord"	:'{screEncrp}',
				    "inputData" : {
				        "type"       : 'select',
				        "name"       : 'psk_algorithm',
				        "defaultValue": psk_algorithm,
				        items:[
				        	{name:'{autoAuth}' ,value:'tkip+ccmp'},
				        	{name:'TKIP' ,value:'tkip'},
				        	{name:'CCMP' ,value:'ccmp'}
				        ]
				    },
				    "afterWord": ''
				},
				
				{
					sign:'3',
			    	"prevWord"	:'{preShareKey}',
			    	"necessary" : true,
				    "inputData" : {
				        "type"       : 'password',
				        "name"       : 'psk_psswd',
				        "value": pssword,
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
				        "name"       : 'psk_key_update_time',
				        "defaultValue": psk_key_update_time,
				        "checkDemoFunc" : ['checkInput','num','60','86400', 'freshTime'] 
				    },
				    "afterWord": '{keyFreshTimeTip}'
				},
			];
			
			var InputGroup = require('InputGroup');
			var $input = InputGroup.getDom(inputlist);
			
			// 使顶格td长度固定
			$input.find('tr').children(':first').width('138px');
			
			var wepKeyRadio = '1';
			// 密钥1234
			
			$input.find('[name="key1"]').before('<input type="radio" name="keynum" value="1" style="margin-right:10px" '+(wepKeyRadio=='1'?'checked="true"':'')+'/>');
			$input.find('[name="key2"]').before('<input type="radio" name="keynum" value="2" style="margin-right:10px" '+(wepKeyRadio=='2'?'checked="true"':'')+'/>');
			$input.find('[name="key3"]').before('<input type="radio" name="keynum" value="3" style="margin-right:10px" '+(wepKeyRadio=='3'?'checked="true"':'')+'/>');
			$input.find('[name="key4"]').before('<input type="radio" name="keynum" value="4" style="margin-right:10px" '+(wepKeyRadio=='4'?'checked="true"':'')+'/>');
			

			$input.find('[name="key1"],[name="key2"],[name="key3"],[name="key4"]').parent().next().remove();
			
			/* 修改部分样式*/
			$input.find('[data-control="1"]').addClass('democonrrr');
			$input.find('.democonrrr .u-password-eye').css({'left':'164px','z-index':'100'});
			
			/* 绑定部分事件  */			
			$tabcon.empty().append($input);
			$tabcon.append('<style>.democonrrr .input-error{left:276px !important;}</style>')
			var tranDomArr = [$input];
			var dicArr     = ['error','common','doRouterConfig','doNetName'];
			require('Translate').translate(tranDomArr, dicArr);			
		}
		
		/* 带宽设置 */
		function displaye4($tabcon){
			var inputlist = [
				{	
			    	"prevWord"	:'{limitType}',
				    "inputData" : {
				        "type"       : 'radio',
				        "name"       : 'sta_rate_policy',
				        "defaultValue" : sta_rate_policy,
				        items:[
				        	{name:'{shareLimitSpeed}' ,value:'1'},
				        	{name:'{exclusiveLimitSpeed}' ,value:'2'}
				        ]
				    },
				    "afterWord": ''
				},
				{	
			    	"prevWord"	:'{upSpeed}',
				    "inputData" : {
				        "type"       : 'text',
				        "name"       : 'sta_rate_up',
				        "value"      : sta_rate_up,
				        "checkDemoFunc" : ['checkNum','0','100000'] 
				    },
				},
				{	
			    	"prevWord"	:'{downSpeed}',
				    "inputData" : {
				        "type"       : 'text',
				        "name"       : 'sta_rate_down',
				        "value"      : sta_rate_down,
				        "checkDemoFunc" : ['checkNum','0','100000'] 
				    },
				}
			];
			var InputGroup = require('InputGroup');
			var $input = InputGroup.getDom(inputlist);
			
			/* 添加上下行后缀辅助选择框 */
			$input.find('[name="sta_rate_up"],[name="sta_rate_down"]').parent().attr('colspan','2').next().remove();
			$input.find('[name="sta_rate_up"],[name="sta_rate_down"]').after(' kbit/s <==');
			
			var selectarr = ["{noLimitSpeed}","{custom}","64K", "128K", "256K", "512K", "1M", "1.5M", "2M", "3M", "4M", "5M", "6M", "7M", "8M", "9M", "10M", "11M", "12M", "13M", "14M", "15M", "16M", "17M", "18M", "19M", "20M", "25M", "30M", "35M", "40M", "45M", "50M", "90M", "100M"];
			var sevalue =   ["0","auto","64", "128", "256", "512", "1000", "1500", "2000", "3000", "4000", "5000", "6000", "7000", "8000", "9000", "10000", "11000", "12000", "13000", "14000", "15000", "16000", "17000", "18000", "19000", "20000", "25000", "30000", "35000", "40000", "45000", "50000", "90000", "100000"];
			
			var selehtml = '<select>'+
								(function(){
									var options = '';
									selectarr.forEach(function(selobj,ins){
										options += '<option data-local="'+selobj+'" value="'+sevalue[ins]+'">'+selobj+'</option>';
									});
									return options;
								}())+
							'</select>';
							
			var $sxselect = $(selehtml).change(function(){
				var $s = $(this);
				if($s.val().toString() !== 'auto'){
					$input.find('[name="sta_rate_up"]').val($s.val());
				}
			});
			
			$input.find('[name="sta_rate_up"]').parent().append($sxselect,tl('speedTip'));
			$input.find('[name="sta_rate_up"]').keyup(function(){
				$sxselect.val('auto');
			})
			if($input.find('[name="sta_rate_up"]').val() != '0'){
				$sxselect.val('auto');
			}
			
			var $xxselect = $(selehtml).change(function(){
				var $s = $(this);
				if($s.val().toString() !== 'auto'){
					$input.find('[name="sta_rate_down"]').val($s.val());
				}
			});
			
			$input.find('[name="sta_rate_down"]').parent().append($xxselect,tl('speedTip'));
			$input.find('[name="sta_rate_down"]').keyup(function(){
				$xxselect.val('auto');
			})
			
			if($input.find('[name="sta_rate_down"]').val() != '0'){
				$xxselect.val('auto');
			}
			
			$tabcon.empty().append($input);
			var tranDomArr = [$input];
			var dicArr     = ['error','common','doRouterConfig','doNetName'];
			require('Translate').translate(tranDomArr, dicArr);		
		}
		
		/* 新增/编辑弹框保存方法 */
		function editModalSave(type,checkSave,olddata){
			var Tips = require('Tips');
			/* 如果为表格点击修改事件，跳过检测直接保存 */
			if(checkSave){
    			saveE();
    			return false;
    	}
			
			/* 阶梯 输入检测  */
			var IG = require('InputGroup');
			var $mamodal = DATA.tabModalObj.getDom();
  		/* 阶梯检测保存方法 */
  		var earr = ['#e1','#e3','#e4'];
  		if(IG.checkErr($mamodal,true)>0){
  			for(var i = 0;i<earr.length;i++){
  				if(IG.checkErr($mamodal.find(earr[i]),true)>0){
  					$mamodal.find('[href="'+earr[i]+'"]').trigger('click');
  					return false;
  				}
  			}
  		}
  		
  		saveE();		
    	/* 保存 */
			function saveE(){
				/*调用解析组件获取页面数据*/
				var SRLZ = require('Serialize');
				var strs = SRLZ.getQueryStrs(DATA.tabModalObj.getDom());
				var jsons = SRLZ.queryStrsToJson(strs);
				var newstrs = SRLZ.queryJsonToStr(jsons);
				//radio_type必须有初始值，不能定义了不给初值！
				var radio_type = "";
				
				/* 根据不同类型保存不同地址 
				 * */
	
				//这里2.4G和5G的判断顺序绝对不能颠倒！
				if(DATA.tabModalObj.getDom().find('[name="spjk"][value="fre2"]').is(':checked')){
					radio_type = '24';
				}
				if(DATA.tabModalObj.getDom().find('[name="spjk"][value="fre5"]').is(':checked')){
					radio_type = radio_type + '5';
				}
				radio_type = radio_type + "g";
				
				newstrs = newstrs + "&radio_type=" + radio_type + "&wIndex_24=" + wIndex_24 + "&wIndex_5=" + wIndex_5;
				gosave(newstrs, "newSsid");
				
				
				/* 单个保存 */
				function gosave(str, url){
					$.ajax({
						url:'/cgi-bin/luci/admin/' + url,
						type:'post',
						data:(str),
						success:function(result){
							var doEval = require('Eval');
							var codeStr = result,
									variableArr = ['status', 'errorstr'],
									result = doEval.doEval(codeStr, variableArr),
									isSuccess = result["isSuccessful"];
							// 判断代码字符串执行是否成功
							if (isSuccess) {
								var data = result["data"],
										status = data['status'];
										errorstr = data['errorstr'];
								if (!status) {
									if(checkSave){
										$('[href="#1"]').trigger('click');
									}
								}
							} 
							else 
							{
								Tips.showWarning('{parseStrErr}');
								if(checkSave){
										$('[href="#1"]').trigger('click');
								}
							}					
						}
					});
				}
			}
		}
	}
	
	module.exports = {
		display: display
	};
});
