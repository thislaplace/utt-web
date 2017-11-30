define(function(require, exports, module){
	function tl(str){
		return require('Translate').getValue(str,['common','doClockMgmt']);
	}	
	function display($container){
			
			$container.empty();
			displayTable($container)
	};

	function showWidget($container){
        var DATA = {}
        $.ajax({
            url: '/cgi-bin/luci/admin/lan_wirelessInterface',
            type: 'GET',
            async:false,
            success: function(result) {
                result = JSON.parse(result);
                console.log(result)

                var doEval = require('Eval');
                var Tips = require('Tips');
                var variableArr = ['type', 'dns', 'lanIp', 'netMask', 'gateway', 'lanMac',];
                var code = doEval.doEval(result, variableArr),
                    isSuccessful = code["isSuccessful"];
                if (isSuccessful) {
                    var data = code["data"];
                    DATA.type  = data.type;
                    DATA.dns   = data.dns;
                    DATA.lanIp   = data.lanIp;
                    DATA.netMask = data.netMask;
                    DATA.gateway = data.gateway;
                    DATA.lanMac  = data.lanMac;
                } 
                else 
                {
                    Tips.showError('{parseStrErr}',3);
                }

            }
        });
		var InputGroup = require('InputGroup');
		var inputList = [
			{
				"prevWord" : 'MAC地址',
				"inputData" : {
					"type" : 'text',
					"name" : 'mac',
                    value:DATA.lanMac,
				},
				"afterword" : ''
			},
			{
				"prevWord" : 'IP地址',
				"inputData" : {
					"type" : 'text',
					"name" : 'ipAddress',
                    value:DATA.lanIp,
				},
				"afterword" : ''
			},
			{
				"prevWord" : '子网掩码',
				"inputData" : {
					"type" : 'text',
					"name" : 'Subnet',
                    value:DATA.netMask,
				},
				"afterword" : ''
			},
			{
				"prevWord" : '网关地址',
				"inputData" : {
					"type" : 'text',
					"name" : 'defaultGateway',
                    value:DATA.gateway,
				},
				"afterword" : ''
			},
			{
				"prevWord" : 'DNS服务器',
				"inputData" : {
					"type" : 'text',
					"name" : 'DNS',
                    value:DATA.dns,
                    "board":"none",
				},
				"afterword" : ''
			},

		];
		var $inputGroup = InputGroup.getDom(inputList);
			$input=$inputGroup
			$input.css({'padding-top':'5em'});
			$input.find("tr").css({"line-height":"30px"});
			$input.find("[type=text]").attr('disabled', true);
			return $inputGroup;
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
