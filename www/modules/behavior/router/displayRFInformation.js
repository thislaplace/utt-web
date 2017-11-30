define(function(require, exports, module){
	function tl(str){
		return require('Translate').getValue(str,['common','doClockMgmt']);
	}	
	function display($container){
			
			$container.empty();
			displayTable($container)
	};

	function showWidget($container){
		var InputGroup = require('InputGroup');
		var inputList = [
			{
				"prevWord" : '无线状态',
				"inputData" : {
					"type" : 'text',
					"name" : 'wirelessStatus',
				},
				"afterword" : ''
			},
			{
				"prevWord" : 'MAC地址',
				"inputData" : {
					"type" : 'text',
					"name" : 'macAddress',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '信道',
				"inputData" : {
					"type" : 'text',
					"name" : 'channel',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '无线模式',
				"inputData" : {
					"type" : 'text',
					"name" : 'wirelessMode',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '无线频宽',
				"inputData" : {
					"type" : 'text',
					"name" : 'bandwidth',
				},
				"afterword" : ''
			}

		];
		var $inputGroup = InputGroup.getDom(inputList);
			$input=$inputGroup
			$input.find('[name="wirelessStatus"],[name="macAddress"],[name="channel"],[name="wirelessMode"],[name="bandwidth"]').remove()

			$input.css("padding-bottom","1em")
			return $inputGroup
	}
	function displayTable($container) {
		var TableContainer = require('P_template/common/TableContainer');
		var conhtml = TableContainer.getHTML({}),
			$tableCon = $(conhtml);
		$container.append($tableCon);
		table($tableCon)

		
	}
	function table($tableCon){
		// var $table = showWidget();
		
		
		// $tableCon.append($table)
		// $tableCon.append($get)
		// $tableCon.append('<div class="getList" style="display:inline-block;padding-bottom:1em;margin-left:2em;overflow:hidden"></div>')
		getList1($tableCon)


	}
	// 2.4G
	function getList1($tableCon){
		var $inputList=[
		{
			"inputData": {
				"type": 'title',
				"name" : '2.4G' ,
			},
		},
			{
				"prevWord" : '无线状态',
				"inputData" : {
					"type" : 'text',
					"name" : 'wirelessStatus',
				},
				"afterword" : ''
			},
			{
				"prevWord" : 'MAC地址',
				"inputData" : {
					"type" : 'text',
					"name" : 'macAddress',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '信道',
				"inputData" : {
					"type" : 'text',
					"name" : 'channel',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '无线模式',
				"inputData" : {
					"type" : 'text',
					"name" : 'wirelessMode',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '无线频宽',
				"inputData" : {
					"type" : 'text',
					"name" : 'bandwidth',
				},
				"afterword" : ''
			}
		];
		var $inputList1=[
		{
			"inputData": {
				"type": 'title',
				"name" : '5G' ,
			},
		},
			{
				"prevWord" : '无线状态',
				"inputData" : {
					"type" : 'text',
					"name" : 'wirelessStatus',
				},
				"afterword" : ''
			},
			{
				"prevWord" : 'MAC地址',
				"inputData" : {
					"type" : 'text',
					"name" : 'macAddress',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '信道',
				"inputData" : {
					"type" : 'text',
					"name" : 'channel',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '无线模式',
				"inputData" : {
					"type" : 'text',
					"name" : 'wirelessMode',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '无线频宽',
				"inputData" : {
					"type" : 'text',
					"name" : 'bandwidth',
				},
				"afterword" : ''
			}
		];
		var InputGroup = require('InputGroup');
		var $inputGroup = InputGroup.getDom($inputList);
		var $inputGroup1 = InputGroup.getDom($inputList1);
			$get=$inputGroup
		$tableCon.append('<div class="getList"></div>')
		$tableCon.append('<div class="getList1"></div>')
		$(".getList").append($get);
		$(".getList1").append($inputGroup1)
		// 2.4G
		$get.find('[name="wirelessStatus"]').after('<span>开启</span>')
		$get.find('[name="macAddress"]').after('<span>FC:2F:EF:55:ff:aa</span>')
		$get.find('[name="channel"]').after('<span>自动（11）</span>')
		$get.find('[name="wirelessMode"]').after('<span>11b/g/n</span>')
		$get.find('[name="bandwidth"]').after('<span>20MHz</span>')
		// 5G
		$inputGroup1.find('[name="wirelessStatus"]').after('<span>开启</span>')
		$inputGroup1.find('[name="macAddress"]').after('<span>FC:2F:EF:55:ff:aa</span>')
		$inputGroup1.find('[name="channel"]').after('<span>自动（11）</span>')
		$inputGroup1.find('[name="wirelessMode"]').after('<span>11b/g/n</span>')
		$inputGroup1.find('[name="bandwidth"]').after('<span>40MHz</span>')
		$tableCon.find("input").remove()
	}



	
	module.exports = {
		display: display
	};
})
