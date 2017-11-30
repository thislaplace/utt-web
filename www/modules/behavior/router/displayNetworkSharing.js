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
					'usb',
					'useage',
					'totalage',
					'free',
					'useagerate',
					'sd_surpport',
					'sd',
					'sd_useage',
					'sd_totalage',
					'sd_free',
					'sd_useagerate',
					'ftpports',
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

		$.ajax({
			type:"get",
			url:"common.asp?optType=netShareManage",
			success:function(result){
				var data = processData(result);
				if(!data){
					return;
				}
				console.log(data);
				//将数据生成数据库
				// setDatabase(data);
				//生成表格
				setTable($con, data);
			}
		});
	}

	/**
	 * 生成数据库
	 */
	function setDatabase(data){
	      var arr = [];
	      data.deviceInfos.forEach(function(obj,i){
	      	var innerarr = [];
	      	innerarr.push(obj[0]);
	      	innerarr.push(obj[1]);
	      	innerarr.push(obj[2]);
	      	innerarr.push(obj[3]);
			innerarr.push(obj[4]);
			innerarr.push(obj[5]);
	      	arr.push(innerarr);
	      });

		// 获取数据库模块，并建立一个数据库
		var Database = require('Database'),
			database = Database.getDatabaseObj(); // 数据库的引用
		// 存入全局变量DATA中，方便其他函数使用
		DATA["database"] = database;
		// 声明字段列表
		var fieldArr = ['j','all', 'used', 'left','use','open'];
		// 将数据存入数据表中
		database.addTitle(fieldArr);
		database.addData(arr);
	}

	/**
	 * 生成表格
	 */
	function setTable($con, data){

		var inputList = [
			{
				    "prevWord": tl('UusageAmount'),
				    "inputData": {
				        "type"       : 'words',
				        "value"		 : data.useagerate||"0"
				    },

			},
			{

				    "prevWord": tl('UTotalCapacity'),
				    "inputData": {
				        "type"       : 'text',
				        "name"		:'text1b',
				        "value"		 : ''
				    },

			},
			{

				    "prevWord": '',
				    "inputData": {
				        "type"       : 'text',
				        "name"		 : 'btn1',
				        "value"		 : '',
				    },

			},
			{
				 "inputData": {
				        "type"       : 'title',
				        "name"		 : ''
				    }
			},
			{

				    "prevWord": tl('SDusageAmount'),
				     'display' :(data.sd == 0?false:true),
				    "inputData": {
				        "type"       : 'words',
				        "value"		 : data.sd_useagerate || "0"
				    },

			},
			{

				    "prevWord": tl('SDTotalCapacity'),
				     'display' :(data.sd == 0?false:true),
				    "inputData": {
				        "type"       : 'text',
				        "name"		:'text2b',
				        "value"		 : ''
				    },

			},
			{

				    "prevWord": '',
				    'display' :(data.sd == 0?false:true),
				    "inputData": {
				        "type"       : 'text',
				        "name"		 : 'btn2',
				        "value"		 : '',
				    },

			}
		];
		var InputGroup = require('InputGroup'),
		$dom = InputGroup.getDom(inputList);

		/*生成文字*/
		var t1_2 = data.totalage || "0";
		var t1_3 = data.useage || "0";
		var t1_4 = data.free || "0";

		var t2_2 = data.sd_totalage || "0";
		var t2_3 = data.sd_useage || "0";
		var t2_4 = data.sd_free || "0";

		var th1 = t1_2+'<span style="margin-left:50px;margin-right:10px">'+tl('UsedVolume')+'</span> '+t1_3+'<span style="margin-left:50px;margin-right:10px">'+tl('freeSpace')+'</span> '+t1_4;
		$dom.find('[name="text1b"]').parent().empty().append(th1);

		var th2 = t2_2+'<span style="margin-left:50px;margin-right:10px">'+tl('UsedVolume')+'</span> '+t2_3+'<span style="margin-left:50px;margin-right:10px">'+tl('freeSpace')+'</span> '+t2_4;
		$dom.find('[name="text2b"]').parent().empty().append(th2);


		/*生成按钮*/
		var $btn1 = $('<button type="button" class="btn btn-primary">'+tl('PopDevice')+'</button>');
		var $btn2 = $('<button type="button" class="btn btn-primary">'+tl('DeviceSD')+'</button>');
		$dom.find('[name="btn1"]').parent().empty().prev().empty().append($btn1);
		$dom.find('[name="btn2"]').parent().empty().prev().empty().append($btn2);

		/* 修改样式*/

		$dom.find('.u-inputs-title').find('span').remove();
		$dom.find('td').css({
			'height':'25px',
		})
		
		/*绑定点击事件*/
		$btn1.click(function(){
			Tips.showConfirm('{isOrNotPop}',function(){
				sendAjax('storage_type=usb')
			})
			
		});
		
		$btn2.click(function(){
			Tips.showConfirm('{isOrNotPop}',function(){
				sendAjax('storage_type=sd')
			})
		})

		$con.empty().append($dom);
		require('Translate').translate([$con],['common','doNetworkManagementStrategy']);

	}

	function sendAjax(str){
		$.ajax({
			type:"post",
			url:"goform/formStoragePop",
			data:str,
			success:function(result){
				// 加载Eval模块
			    var doEval = require('Eval');
			    var codeStr = result,
			      // 定义需要获得的变量
			      variableArr = [
							'errorstr',
							'status'
			      ];
			    // 获得js字符串执行后的结果
			    var result = doEval.doEval(codeStr, variableArr),
			      isSuccess = result["isSuccessful"];
			    // 判断代码字符串执行是否成功
			    if (isSuccess) {
			      // 获得所有的变量
			      var data = result["data"];
					if(data.status == 1){
						Tips.showSuccess('{saveSuccess}');
					}else{
						if(data.errorstr){
							Tips.showSuccess(data.errorstr);
						}else{
							Tips.showSuccess('{saveFail}');
						}
					}
			    } else {
			      Tips.showError('{parseStrErr}');
			    }
			}
		});
	}
})
