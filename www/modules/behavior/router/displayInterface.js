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
				"prevWord" : 'MAC地址',
				"inputData" : {
					"type" : 'text',
					"name" : 'mac',
				},
				"afterword" : ''
			},
			{
				"prevWord" : 'IP地址',
				"inputData" : {
					"type" : 'text',
					"name" : 'ipAddress',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '子网掩码',
				"inputData" : {
					"type" : 'text',
					"name" : 'Subnet',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '网关地址',
				"inputData" : {
					"type" : 'text',
					"name" : 'defaultGateway',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '主DNS服务器',
				"inputData" : {
					"type" : 'text',
					"name" : 'DNS',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '备DNS服务器',
				"inputData" : {
					"type" : 'text',
					"name" : 'DNSbackups',
				},
				"afterword" : ''
			},
			{
				"prevWord" : 'AC地址',
				"inputData" : {
					"type" : 'text',
					"name" : 'AC',
				},
				"afterword" : ''
			},

		];
		var $inputGroup = InputGroup.getDom(inputList);
			$input=$inputGroup
			$input.find('[name="mac"]').after("<span>FC:2F:EF:55:ff:aa</span>")
			$input.find('[name="ipAddress"]').after("<span>192.168.1.1</span>")
			$input.find('[name="Subnet"]').after("<span>255.255.255.0</span>")
			$input.find('[name="defaultGateway"]').after("<span>0.0.0.0</span>")
			$input.find('[name="DNS"]').after("<span>0.0.0.0</span>")
			$input.find('[name="DNSbackups"]').after("<span>0.0.0.0</span>")
			$input.find('[name="AC"]').after("<span>192.168.1.252         0.0.0.0        0.0.0.0</span>")
			$input.find('[name="mac"],[name="ipAddress"],[name="Subnet"],[name="defaultGateway"],[name="DNS"],[name="DNSbackups"],[name="AC"]').remove()

			$input.css({'padding-top':'2em'})
			$input.find("tr").css({"line-height":"30px"})
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
		var $table = showWidget();
		console.log("$tableCon")
		console.log($table)
		$tableCon.append($table)

	}

	
	module.exports = {
		display: display
	};
})
