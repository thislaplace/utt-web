define(function(require, exports, module){
	function tl(str){
		return require('Translate').getValue(str,['common','doClockMgmt']);
	}	
	function display($container){
			
			$container.empty();
			displayTable($container)
	};
	function stats($tableCon){
			$tableCon.prepend('<div class="statsList"></div>')
			var parenWidth=$(".statsList").parent().parent().height()
			$(".statsList").height(parenWidth)
			console.log("parenWidth")
			console.log(parenWidth)
			var tit=['内存使用',"CPU使用"]
		for(var j=0;j<2;j++){
			// var htm='<div class="box flex flex-align-center">'+
			// 			'<span>'+tit[j]+'：</span>'+
			// 			    '<div class="tbox'+(j+1)+'">'+
			// 			        '<div class="tiao'+(j+1)+'"></div>'+
			// 			    '</div>'+
			// 			'<span class="cont'+(j+1)+'"></span>'+
			// 		'</div>'
			var html='<div class="box ">'+
					    '<p class="cont'+(j+1)+'">31%</p>'+
					    
					    '<div class="tbox'+(j+1)+'">'+
					       '<div class="tiao'+(j+1)+'">'+
					        '</div>'+
					    '</div>'+
					    '<p>'+tit[j]+'</p>'+
					'</div>'
			$(".statsList").append(html)
		}
		var i=0;
		var j=0
	    /*add——创建tbx下的div加文字和变宽度的方法*/
		var cn=$(".tbox2").height();
		console.log(".tbox2的高度"+cn)
	    // cpu使用情况
	    function cpu(i){
	    	var cont1=$(".cont1")
	    	var tbox1 =$(".tbox1");
	    	var tiao1 =$(".tiao1");
			    cont1.html(i+'%')
			    tiao1.css("height",i+"%")
				// tiao.css("width",i+"%").html(i+'%');
			}
			var num=100*100/cn
			var fla=setInterval(function(){
				if(i>num){
					clearInterval(fla)
				}else if(i<num){
					cpu(i)
				}
				
				i++
			},100)

			var num1=50*100/cn
			var fla1=setInterval(function(){
				if(j>num1){
					clearInterval(fla1)
				}else if(j<num1){
					memory(j)
				}
				j++
			},100)
		// 内存使用情况
		function memory(j){
			
			var cont2=$(".cont2")
			var tbox2 =$(".tbox2");
	    	var tiao2 =$(".tiao2");
	    	tiao2.css("height",j+"%");
		    cont2.html(j+'%')
	 
		}	
	  
		
	};
	function showWidget($container){
		var InputGroup = require('InputGroup');
		var inputList = [
			{
				"prevWord" : '系统时间',
				"inputData" : {
					"type" : 'text',
					"name" : 'systemTime',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '运行时长',
				"inputData" : {
					"type" : 'text',
					"name" : 'duration',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '设备名称',
				"inputData" : {
					"type" : 'text',
					"name" : 'Device',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '序列号',
				"inputData" : {
					"type" : 'text',
					"name" : 'serialNumber',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '产品型号',
				"inputData" : {
					"type" : 'text',
					"name" : 'product',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '硬件版本',
				"inputData" : {
					"type" : 'text',
					"name" : 'hardware',
				},
				"afterword" : ''
			},
			{
				"prevWord" : '软件版本',
				"inputData" : {
					"type" : 'text',
					"name" : 'software',
				},
				"afterword" : ''
			},

		];
		var $inputGroup = InputGroup.getDom(inputList);
			$input=$inputGroup
			$input.find('[name="systemTime"]').after("<span>2016-10-10  15:20:23</span>")
			$input.find('[name="duration"]').after("<span>0天1时25分20秒</span>")
			$input.find('[name="Device"]').after("<span>sfrgtrh1223</span>")
			$input.find('[name="serialNumber"]').after("<span>4295333623</span>")
			$input.find('[name="product"]').after("<span>WA2520N</span>")
			$input.find('[name="hardware"]').after("<span>V1.0</span>")
			$input.find('[name="software"]').after("<span>WA2520Nv3.0-160930</span>")
			$input.find('[name="systemTime"],[name="duration"],[name="Device"],[name="serialNumber"],[name="product"],[name="hardware"],[name="software"]').remove()

			$input.css("display","inline-block")
			return $input
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
		stats($tableCon);
		$tableCon.append($table)
		$tableCon.css({"height":"100%","overflow":"hidden"})

	}

	
	module.exports = {
		display: display
	};
})
