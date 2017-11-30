define(function(require, exports, module){
	function tl(str){
		return require('Translate').getValue(str,['common', 'doNetworkManagementStrategy']);
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
	      'sambaEn', // samba 开关
	      'ftpEn', // ftp开关
	      'ftpport', // ftp端口
	      'WANEnable', // wan口访问
	      'resourcename', // 共享文件名
	      'resourcespath', // 共享文件路径
				'data' //磁盘目录
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

	/**
	 * 生成表格
	 */
	function display($con){
		$con.empty();
//		var TableContainer = require('P_template/common/TableContainer');
//		var conhtml = TableContainer.getHTML({}),
//			$tableCon = $(conhtml);
//		$con.append($tableCon);

		/* 制作左右排列的容器 */

//		$con.append('<div id="net_left" style="float:left;position:relative;width:420px;overflow:hidden"></div><div id="net_right" style="position:relative;margin-left:430px"></div>');


		$.ajax({
			type:"get",
			url:"common.asp?optType=FtpServer",
			success:function(result){
				var data = processData(result);
				if(!data){
					return;
				}
				DATA.sambaEn = data.sambaEn;
				DATA.ftpEn = data.ftpEn;
				DATA.ftpport = data.ftpport;
				DATA.WANEnable = data.WANEnable;
				DATA.resourcename = data.resourcename;
				DATA.resourcespath = data.resourcespath;
				DATA.data = data.data || [];

				console.log(DATA);

				//将数据生成数据库
//				setDatabase(data);
				//生成表格
//				setTable($('#net_right'));
//				setInputs($('#net_left'));
				$con.empty();
				setInputs($con);
			}
		});
	}


	/*
	 生成左侧表单
	 * */
	function setInputs($con){
		var inputlist = [
			{
				"prevWord": tl('ShareDir'),
				"disabled":true,
				"inputData": {
					"value":  (DATA.resourcename || ''),
					"type": 'text',
					"name": 'gxml'
				},
				"afterWord": ''
			},
			{
				"prevWord": '{enableSambaServer}',
				"inputData": {
					"defaultValue": (DATA.sambaEn == 'on'?['1']:[]),
					"type": 'checkbox',
					"name": 'sambaEn',
					"items": [{
						"value": '1',
						"name": '',
						"checkOn":'on',
						"checkOff":'off'
					}]
				},
				"afterWord": ''
			},
			{
				"prevWord": '{enableFtpServer}',
				"inputData": {
					"defaultValue": (DATA.ftpEn == 'on'?['1']:[]),
					"type": 'checkbox',
					"name": 'ftpEn',
					"items": [{
						"value": '1',
						"name": '',
						"checkOn":'on',
						"checkOff":'off'
					}]
				},
				"afterWord": ''
			},
			{
				"prevWord": '{ftpPort}',
				"inputData": {
					"value": DATA.ftpport || '',
					"type": 'text',
					"name": 'ftpport'
				},
				"afterWord": '{defaultValue21}'
			},
			{
				"prevWord": '{allowWan}',
				"inputData": {
					"defaultValue": (DATA.WANEnable == 'on'?['1']:[]),
					"type": 'checkbox',
					"name": 'WANEnable',
					"items": [{
						"value": '1',
						"name": '',
						"checkOn":'on',
						"checkOff":'off'
					}]
				},
				"afterWord": ''
			},
			{
				"prevWord": '',
				"display":false,
				"inputData": {
					"value": (DATA.resourcename || ''),
					"type": 'text',
					"name": 'resourcename'
				},
				"afterWord": ''
			},
			{
				"prevWord": '',
				"display":false,
				"inputData": {
					"value":(DATA.resourcespath || ''),
					"type": 'text',
					"name": 'resourcepath'
				},
				"afterWord": ''
			}

		];

		var InputGroup = require('InputGroup');
		var $dom = InputGroup.getDom(inputlist);

		/*选择共享目录按钮 */
		var btn1 = [
			{
				id:'choosml',
				name:tl('selectShareDir')+tl('ShareDir'),
				clickFunc:function($this){
					var data = {};
					editModel({},'modify');
				}
			}
		];
		InputGroup.insertLink($dom,'gxml',btn1);


		$dom.find('[name="ftpport"]').css('width','55px');


		var btnGroupList = [
			{
				"id"        : 'save',
				"name"      : '{save}',
				"clickFunc" : function($this){

					if(InputGroup.checkErr($con)>0){
						return;
					}


					var Serialize = require('Serialize');

					var queryArr = Serialize.getQueryArrs($con),
						queryJson = Serialize.queryArrsToJson(queryArr),
						queryStr = Serialize.queryArrsToStr(queryArr);
						console.log(queryJson);
						queryJson.oldfilename = DATA.resourcename;
						queryJson.olddirpass = DATA.resourcespath;
						/*此处为假数据*/
//						queryJson.resourcename = "12345";
//						queryJson.resourcespath = "/USB1";
						queryStr = Serialize.queryJsonToStr(queryJson);
					$.ajax({
						url: 'goform/formNetShare_Org',
						type: 'POST',
						data: queryStr,
						success: function(result) {
							var doEval = require('Eval');
							var codeStr = result,errorstr
								variableArr = ['status', 'errorstr'],
								result = doEval.doEval(codeStr, variableArr),
								isSuccess = result["isSuccessful"];

							// 判断代码字符串执行是否成功
							if (isSuccess) {
								var data = result["data"],
									status = data['status'];
								if (status) {
									// 显示成功信息
	                                Tips.showSuccess('{saveSuccess}');
	                                display($('#2'));
								} else {
									Tips.showWarning(result["data"]["errorstr"], 2);
								}
								console.log(result);
							} else {
								Tips.showWarning('{netErr}', 2);
							}
						}
					});


				}
			},
			{
				"id"        : 'reset',
				"name"      : '{reset}'
			}
		];
		var BtnGroup = require('BtnGroup');
		var $btnGroup = BtnGroup.getDom(btnGroupList);
		$btnGroup.addClass('u-btn-group');

		$con.empty().append($dom,$btnGroup);
		require('Translate').translate([$con],['common','doNetworkManagementStrategy']);
	}


	/**
	 * 生成数据库
	 */
	function setDatabase(data){
	      var arr = [];
	      data.names.forEach(function(obj,i){
	      	var innerarr = [];
	      	innerarr.push(data.names[i]);
	      	innerarr.push(data.zones[i]);
	      	innerarr.push('root'+data.dirctorys[i]);
	      	arr.push(innerarr);
	      });

		// 获取数据库模块，并建立一个数据库
		var Database = require('Database'),
			database = Database.getDatabaseObj(); // 数据库的引用
		// 存入全局变量DATA中，方便其他函数使用
		DATA["database"] = database;
		// 声明字段列表
		var fieldArr = ['names','zones', 'dirctorys'];
		// 将数据存入数据表中
		database.addTitle(fieldArr);
		database.addData(arr);
	}

	/**
	 * 生成表格
	 */
	function setTable($con){
		var TableContainer = require('P_template/common/TableContainer');
		var conhtml = TableContainer.getHTML({}),
		$tableCon = $(conhtml);
		$con.empty().append($tableCon)
		// 表格上方按钮配置数据
		var btnList = [
		{
			"id": "add",
			"name": "{add}",
			 "clickFunc" : function($btn){
			 		$btn.blur();
			 		editModel({},'add');

			 }
		},
		{
			"id": "delete",
			"name": "{delete}",
			 "clickFunc" : function($btn){
			 	var primaryKeyArr = DATA["tableObj"].getSelectInputKey('data-primaryKey');
			 	if(primaryKeyArr.length == 0){
			 		Tips.showInfo('{notSelete}');
			 		return false;
			 	}



				Tips.showConfirm(tl('delconfirm'),function(){

					var detstr = "delstr=";
					primaryKeyArr.forEach(function(keyobj){
						var data = database.getSelect({
							primaryKey: keyobj
						})[0];
						detstr += data.names+",";
					})
					detstr = detstr.substr(0,detstr.length-1);
					$.ajax({
						type:"post",
						url:"/goform/formFtpServerDirDel",
						async:true,
						data:detstr,
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
								if (status) {
									// 显示成功信息
	                                Tips.showSuccess('{delSuccess}');
	                                display($('#2'));
								} else {
									Tips.showWarning(data.errorstr);
								}
							} else {
								Tips.showWarning('{parseStrErr}');
							}

						}
					});
				});


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
			"otherFuncAfterRefresh":otherFunc,
			"dicArr" : ['common'],
			"titles": {
				"{name}"		 : {
					"key": "names",
					"type": "text",
					"checkDemoFunc":['checkInput','name','1','31',5]
				},
				"{volume}"		 : {
					"key": "zones",
					"type": "text",
				},
				"{folderWhere}"		 : {
					"key": "dirctorys",
					"type": "text",
				},
				"{edit}": {
					"type": "btns",
					"btns" : [
						{
							"type" : 'edit',
							"clickFunc" : function($this){
								var primaryKey = $this.attr('data-primaryKey');
								DATA['primaryKey']=primaryKey;
								var data = database.getSelect({
									primaryKey: primaryKey
								})[0];
								editModel(data,'modify');
							}
						},
						{
							"type" : 'delete',
							"clickFunc" : function($this){
								var primaryKey = $this.attr('data-primaryKey');
								var data = database.getSelect({
									primaryKey: primaryKey
								})[0];
								Tips.showConfirm(tl('delconfirm'),function(){
									$.ajax({
										type:"post",
										url:"/goform/formFtpServerDirDel",
										async:true,
										data:'delstr='+data.names,
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
												if (status) {
													// 显示成功信息
					                                Tips.showSuccess('{delSuccess}');
					                                display($('#2'));
												} else {
													Tips.showWarning(data.errorstr);
												}
											} else {
												Tips.showWarning('{parseStrErr}');
											}

										}
									});
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
		$tableCon.append($table);


		function otherFunc(tbobj){
		}
		require('Translate').translate([$tableCon],['common','doNetworkManagementStrategy']);
	}



	/*
	 	新增 编辑 目录弹框
	 * */
	function editModel(data,type){
		var Modal = require('Modal');
		var modalList = {
			"id": "modal-FTP",
			"title": (type=="add"?'{add}':'{edit}'),
			"btns" : [
            {
                "type"      : 'save',
                "clickFunc" : function($this){
                	var IG  = require('InputGroup');
                	if(IG.checkErr(DATA["modalobj"].getDom())==0){
                		var eqname = DATA["modalobj"].getDom().find('[name="names"]').val();
                		if(DATA.tree.getCheckedNodes(true).length >0){
                			var filepathArr = DATA.tree.getCheckedNodes(true)[0].getPath();
	                		var fpath = '';
	                		filepathArr.forEach(function(obj){
	                			fpath += obj.name+"/";
	                		});
	                		fpath = fpath.substr(0,fpath.length-1);
	                		/* */
	                		$('[name="resourcename"]').val(eqname);
	                		$('[name="gxml"]').val(fpath);
	                		$('[name="resourcepath"]').val(fpath)
	                		DATA["modalobj"].hide();
                		}else{
                			Tips.showWarning('{haveNoFolder}');
                			return;
                		}
                	}
                }
            },
            {
                "type"      : 'reset'
             }
             ,
            {
                "type"      : 'close'
            }
        ]
		};
		// 获得模态框的html
		var modalobj = Modal.getModalObj(modalList),
		//var modalHTML = Modal.getHTML(modalList),
		$modal = modalobj.getDom(); // 模态框的jquery对象
		$modal.find('.modal-body').css('height','340px');
		$modal.find('.modal-dialog').css('width','449px');

		DATA["modalobj"]=modalobj;
		modalobj.show();


		/*
		 生成表单
		 * */

		var inputlist = [
			{
				"prevWord": '{name}',
				"necessary":true,
				"inputData": {
					"value": $('[name="resourcename"]').val() || '',
					"type": 'text',
					"name": 'names',
					"checkDemoFunc":['checkInput','name','1','31','5']
				},
				"afterWord": ''
			},{
				"prevWord": '',
				 display:false,
				"inputData": {
					"value": $('[name="resourcename"]').val() || '',
					"type": 'text',
					"name": 'oldnames'
				},
				"afterWord": ''
			}

		];

		var InputGroup = require('InputGroup');
		var $dom = InputGroup.getDom(inputlist);
		modalobj.insert($dom);

		/*

		 * 生成树图
		 * */

		require('P_libs/js/jquery.ztree.all.min.js');

		var datas = DATA.data.concat();
		 _clear(datas)
		function _clear(arr){
			arr.forEach(function(k){
				k.checked = false;
				if(k.children){
					_clear(k.children)
				}
			})
		}
		if($('[name="resourcepath"]').val().indexOf('/')>=0){

			var paths = $('[name="resourcepath"]').val().split('/');
			var index = 0;
			 _re(datas)


			function _re(arr){
				arr.forEach(function(o){
					if(o.name == paths[index]){
						if(Number(index) == paths.length-1){
							o.checked = true;
						}else{
							index++;
							o.open = true;
							_re(o.children)
						}
					}
				})
			}

		}
		console.log(datas);





		var setting =
		{
			check: {
				enable: true,
				radioType: { "Y": "", "N": "" },
				chkStyle: "radio",
				nocheckInherit: false,
				radioType: "all"
			},
			view: {
				showIcon: false
			},
			callback: {
				onClick: function(event, treeId, treeNode){
					treeNode.checked = true;
					$.fn.zTree.getZTreeObj(treeId).updateNode(treeNode);
				}
			}
		};

		var $treeUl = $(document.createElement('ul'));
		$treeUl.attr({ id : 'FTP_DIR' , class : 'ztree'});
		$treeUl.css({
			position:'absolute',
			width:'347px',
			height:'260px',
			overflow:'auto',
			borderTop:'1px solid #cecece',
			top:'60px',
			left:'72px'
		})
		// 向节点注入ztree图
		var treeDom = $.fn.zTree.init($treeUl,setting,datas);
		DATA.tree = treeDom;
		modalobj.insert($treeUl);
		/*数据过滤 按照路径设置勾选*/

		if(type=="add"){
			var tnode = treeDom.getNodesByFilter(function(node){
				return node.level == 0&& node.name=="root";
			}, true);
			if(tnode){
				tnode.checked = true;
				treeDom.updateNode(tnode);
			}

		}else{
			if($('[name="resourcepath"]').val().indexOf('/')>=0){
//				var paths = $('[name="resourcepath"]').val().split('/');
////				paths.forEach(function(nobj,ni){
////					var tnode = DATA.tree.getNodesByFilter(function(node){
////						return node.level == ni&& node.name==nobj;
////					}, true);
////					tnode.open = true;
////					DATA.tree.updateNode(tnode);
////				})
//				var nlevel = (paths.length-1);
//				var tnode = DATA.tree.getNodesByFilter(function(node){
//					return node.level == nlevel&& node.name==paths[nlevel];
//				}, true);
//				tnode.checked = true;
////				tnode.open = false;
//				DATA.tree.updateNode(tnode);
//

			}else{
				var tnode = DATA.tree.getNodesByFilter(function(node){
					return node.level == 0;
				}, true);
				if(tnode == ''){
					tnode.checked = true;
					DATA.tree.updateNode(tnode);
				}
				
			}
		}

//		setTimeout(function(){
//			var tnode = DATA.tree.getNodesByFilter(function(node){
//				return node.level == 0;
//			}, true);
//
//			if(tnode){
//				tnode.open = false;
//				DATA.tree.updateNode(tnode);
//			}
//
//		},500);

		require('Translate').translate([modalobj.getDom()],['common','doNetworkManagementStrategy']);


	}

})
