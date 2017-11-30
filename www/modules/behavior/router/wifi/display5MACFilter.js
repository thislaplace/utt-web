define(function(require, exports, module){
	function tl(str){
		return require('Translate').getValue(str,['common','doWifiMacFilter']);
	}
	require('jquery');
	var DATA = {};
	var Tips = require('Tips');
	module.exports = {
		display: display
	};

	  function processData(jsStr) {
	    // 加载Eval模块
	    var doEval = require('Eval');
	    var codeStr = jsStr,
	      // 定义需要获得的变量
	      variableArr = [
	      'MacFilterEnables', // 无线开关
	      'filterRules',// 过滤规则
	      'filterMacs', // Mac地址数组
	      'totalrecs',// 当前条数
	      'max_totalrecs'// 最大允许配置条数
	      ];
	    // 获得js字符串执行后的结果
	    var result = doEval.doEval(codeStr, variableArr),
	      isSuccess = result["isSuccessful"];
	    // 判断代码字符串执行是否成功
	    if (isSuccess) {
	      // 获得所有的变量
	      var data = result["data"];

	      return data;
	    } else {

	      Tips.showError('{parseStrErr}',3);
	      return false;
	    }
	  }	
	
	/*切换过滤规则*/
	function changeRule(nowmacfilter){
		var macf =$('#macfilter').attr('checktype') == '1'?true:false;
		if(nowmacfilter !== undefined){
			macf = nowmacfilter == '1'?true:false;
		}
		
		
		var dataStr = 'MacFilterEnable='+(macf?'on':'off')+'&filterRule='+$('#filterRule').val();
		$.ajax({
			type:"POST",
			url:"/goform/ConfigWlanMacFilterGlobalConfig_5g",
			data:dataStr,
			success:function(res){
				// 加载Eval模块
			    var doEval = require('Eval');
			    var codeStr = res,
			      // 定义需要获得的变量
			      variableArr = [
			      'status',
			      'errorstr'
			      ];
			    // 获得js字符串执行后的结果
			    var result = doEval.doEval(codeStr, variableArr),
			      isSuccess = result["isSuccessful"];
			    // 判断代码字符串执行是否成功
			    if (isSuccess) {
			      // 获得所有的变量
			      var data = result["data"];
					if(data.status){
						Tips.showSuccess('{saveSuccess}');
						$('[href="#2"]').trigger('click');
					}else{
						Tips.showWarning(data.errorstr);
						$('[href="#2"]').trigger('click');
					}
			    } else {
		
			      Tips.showError('{parseStrErr}');
			      $('[href="#2"]').trigger('click');
			    }
			}
		});
		
					
	}
	/**
	 * 生成表格
	 */
	function display($con){
		$con.empty();
		var TableContainer = require('P_template/common/TableContainer');
		var conhtml = TableContainer.getHTML({}),
			$tableCon = $(conhtml);
		$con.append($tableCon);
		
		$.ajax({
			type:"get",
			url:"common.asp?optType=getWlanMacFilterMacList_5g",
			success:function(result){
				var data = processData(result);
				if(!data){
					return;
				}
				DATA.MacFilterEnables = data.MacFilterEnables;
				DATA.filterRules = data.filterRules;
				DATA.totalrecs = data.totalrecs;
				DATA.max_totalrecs = data.max_totalrecs;
				//将数据生成数据库
				setDatabase(data);
				//生成表格
				setTable($tableCon);
				
				var OnOff = require('P_plugin/OnOff');
				var $onoff = OnOff.getDom({
					prevWord:'5G'+tl('wifiMACFilter'),
					afterWord:'',
					id:'macfilter',
					defaultType:(DATA.MacFilterEnables==1?true:false),
					clickFunc:function($btn,typeAfterClick){
						changeRule(typeAfterClick);
					}
				});
				OnOff.joinTab($onoff);
			}
		});
	}
	/**
	  公用的删除接口
	*/
	function deletFunc(deletearr){
		var str = 'delstr=';
		deletearr.forEach(function(obj,i){
			str += obj.mac+",";
		})
		str = str.substr(0,str.length-1);
		 $.ajax({
          url: '/goform/ConfigWlanMacFilterDel_5g',
          type: 'POST',
          data: str,
          success: function(result) {
            var doEval = require('Eval');
            var codeStr = result,
              variableArr = ['status'],
              result = doEval.doEval(codeStr, variableArr),
              isSuccess = result["isSuccessful"];
            // 判断代码字符串执行是否成功
            if (isSuccess) {
              var data = result["data"],
                status = data['status'];
              if (status == '1') {
                $('[href=#2]').trigger('click');
                Tips.showSuccess('{saveSuccess}');
                
              } else {
                Tips.showError('{delFail}');
              }
            } else {
              Tips.showError('{parseStrErr}');
            }
          }
        });
	}
// /goform/formQQFilterExport

	/**
	* 多项删除
	**/
	  function deleteBtnClick() {
	    //获得提示框组件调用方法
	    var Tips = require('Tips');
	    var database = DATA["database"] ;
	    var tableObj = DATA["tableObj"];
	    var primaryKeyArr = tableObj.getSelectInputKey('data-primaryKey');
	    var length  = primaryKeyArr.length;
	    // 判断是否有被选中的选择框
	    if (length > 0) {
	    	require('Tips').showConfirm(tl('delconfirm'),function(){
				var  datasarr = [];
					primaryKeyArr.forEach(function(primaryKey) {  
				    var data = database.getSelect({primaryKey : primaryKey});
				    datasarr.push(data[0]);
				});
				deletFunc(datasarr);
	       	});
	  	} else {
	      Tips.showWarning('{unSelectDelTarget}');
	    }
	  }	
	/**
	 * 生成数据库
	 */
	function setDatabase(data){		
	      
		// 获取数据库模块，并建立一个数据库
		var Database = require('Database'),
			database = Database.getDatabaseObj(); // 数据库的引用
		// 存入全局变量DATA中，方便其他函数使用
		DATA["database"] = database;
		// 声明字段列表
		var fieldArr = ['id','mac'];
		var arr = [];
		data.filterMacs.forEach(function(obj,i){
			arr.push([
				Number(i)+1,
				obj
			])
		})
		
		// 将数据存入数据表中
		database.addTitle(fieldArr);
		database.addData(arr);
	}
	
	/**
	 * 生成表格
	 */
	function setTable($tableCon){
		// 表格上方按钮配置数据
		var btnList = [
		{
			"id": "add",
			"name": "{add}",
			 "clickFunc" : function($btn){
			 		$btn.blur();
					setAddEditModal('add');
        		}
		},
		{
			"id": "delete",
			"name": "{delete}",
			 "clickFunc" : function($btn){
			 	$btn.blur();
			 	deleteBtnClick();
        	}

		}
		];
		var database = DATA["database"];
		var headData = {
			"btns" : btnList
		};
		// 表格配置数据
		var tableList = {
			"database": database,
			"isSelectAll":true,
			"dicArr" : ['common'],
			"max":DATA.max_totalrecs || '',
			"titles": {
				"ID"		 : {
					"key": "id",
					"type": "text",
				},
				"{MACAddr}"		 : {
					"key": "mac",
					"type": "text",
				},
				"{edit}": {
					"type": "btns",
					"btns" : [
						{
							"type" : 'edit',
							"clickFunc" : function($this){
								$this.blur();
								var primaryKey = $this.attr('data-primaryKey')
								var tableObj = DATA["tableObj"];
								var data = database.getSelect({primaryKey : primaryKey});
								setAddEditModal('edit',data[0]);
							}
						},
						{
							"type" : 'delete',
							"clickFunc" : function($this){
								$this.blur();
								var primaryKey = $this.attr('data-primaryKey')
								var tableObj = DATA["tableObj"];
								var data = database.getSelect({primaryKey : primaryKey});
								require('Tips').showConfirm(tl('delconfirm'),function(){
									deletFunc(data);
								});
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
		var Table = require('Table'),
			tableObj = Table.getTableObj(list),
			$table = tableObj.getDom();
		// 将表格组件对象存入全局变量，方便其他函数调用
		DATA["tableObj"] = tableObj;
		
		/* 过滤规则 */
		var selecthtml = '<select id="filterRule" style="margin-right:5px;width:67px">'+
							'<option value="1">'+tl('allow')+'</option>'+
							'<option value="2">'+tl('ban')+'</option>'+
						'</select>';
		var $selh = $(selecthtml);
		var $newli = $('<li style="margin-right:5px" class="utt-inline-block"></li>');
		$newli.append('<span>'+tl('filterRule')+'：</span>');
		$newli.append($selh);
		$table.find('#btns>ul').prepend($newli);
		$selh.val(DATA.filterRules);
		if($selh.val() == '1'){
			$selh.attr('title',tl('onlyAllowMAC'));
		}else{
			$selh.attr('title',tl('onlyBanMAC'));
		}
		
		$selh.change(function(){
			changeRule()
		})
		
		$tableCon.append($table);
	}
	
	/**
	 * 新增/编辑 弹框
	 */
	function setAddEditModal(type,data){
		var data = data || {};
		var type = type || 'add';
		
		var modallist = {
			id:type+'_modal',
			 title:(type == 'add'?tl('add'):tl('edit')),
			size:'normal',
			"btns" : [
	            {
	                "type"      : 'save',
	                "clickFunc" : function($this){

	                	var $modal = DATA['editModalObj'].getDom();
	                	var errorNum=require('InputGroup').checkErr($modal);
	                	if(errorNum >0){
	                		return;
	                	}
	                	var SRLZ = require('Serialize');
	                	var quryarrs = SRLZ.getQueryArrs($modal);
	                	var quryjson = SRLZ.queryArrsToJson(quryarrs);
	                	quryjson.Action = type;
	                	var datastr = SRLZ.queryJsonToStr(quryjson);
	                	
            			$.ajax({
							type:"POST",
							url: "/goform/ConfigWlanMacFilter_5g",
							data:datastr,
							success:function(result){
								 var doEval = require('Eval');
								 var datas = doEval.doEval(result, ['status','errorstr']),
							      isSuccess = datas["isSuccessful"];
							    // 判断代码字符串执行是否成功
							    if (isSuccess) {
							      // 获得所有的变量
							     	if(datas.data.status == 1){
							     		Tips.showSuccess('{saveSuccess}');
										$('[href=#2]').trigger('click');
										DATA['editModalObj'].hide();
							     	}else{
							     		if(datas.data.errorstr=='undefined'||datas.data.errorstr==undefined||datas.data.errorstr==''){
							     			Tips.showWarning('{saveFail}');
							     		}else{
							     			console.log(datas.data.errorstr);
							     			Tips.showWarning(datas.data.errorstr);
							     		}
							     	}
							    } else {
							      Tips.showError('{parseStrErr}');
							      return false;
							    }
								
							}
						});
	                	
	                }
	            },
                {
	                "type"      : 'reset'
	            },
                {
	                "type"      : 'close'
	            }
	        ]
		};
		var Modal = require('Modal');
		var modalObj = Modal.getModalObj(modallist);
		DATA['editModalObj'] = modalObj;
		var inputlist = [
		    {  
		   		"prevWord"	:'{MACAddr}',
		   		"necessary":true,
		        "inputData": {
		            "value" : data.mac || '',
		            "type": 'text',
		            "name": 'filterMac'
		        },
		        "afterWord": ''
		    },
		    {  
		   		"prevWord"	:'',
		   		"display":false,
		        "inputData": {
		            "value" :data.mac || '',
		            "type": 'text',
		            "name": 'oldMac'
		        },
		        "afterWord": ''
		    },
		];
		var InputGroup = require('InputGroup');
		var $input = InputGroup.getDom(inputlist);
		
		modalObj.insert($input);
		modalObj.show();

		var Translate  = require('Translate');
		var tranDomArr = [$input, modalObj.getDom()];
		var dicArr     = ['common'];
		Translate.translate(tranDomArr, dicArr);
		
	}
	
})
