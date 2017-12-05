define(function(require, exports, module) {
    var DATA = {};
    var Translate  = require('Translate');
    var dicArr     = ['common','doNetworkManagementStrategy'];

    function T(_str){
        return Translate.getValue(_str, dicArr);
    }

    function processData(jsStr) {
        var doEval = require('Eval');
        var variableArr = ["type", "day", "hour", "minute", "content"];
        var result = doEval.doEval(jsStr, variableArr),
            isSuccess = result["isSuccessful"];

        if (isSuccess) {
            var data = result["data"];
            var titleArr = ["type", "time", "content" ], // 表格头部的标题列表
                type       	=data["type"],
                day 	    =data["day"],
                hour 	    =data["hour"],
                minute 	    =data["minute"],
                content		=data["content"];
            DATA['maxNum']	=10;

            // 把数据转换为数据表支持的数据结构
            var dataArr = []; // 将要插入数据表中的数据
            DATA['length']=type.length;
            dataArr.type = type; 
            dataArr.day  = day; 
            dataArr.hour = hour; 
            dataArr.minute = minute; 
            dataArr.content = content; 

            // 返回处理好的数据
            var tableData = {
                title: titleArr,
                data: dataArr
            };
            return {
                table: tableData
            };
        } else {
            console.log('字符串解析失败')
        }
    }

    function getTableDom() {
        // 表格上方按钮配置数据
        var btnList = [
            {
                "id": "add",
                "name": "{add}",
                "clickFunc" : function($btn){
                    addBtnClick();
                }
            },
            {
                "id": "delete",
                "name": "{delete}",
                "clickFunc" : function($btn){
                    deleteBtnClick();
                }
            }
        ];

        var database = DATA["tableData"];
        var headData = {
            "btns" : btnList
        };
        // 表格配置数据
        var tableList = {
            "database": database,
            "isSelectAll" : true,
            otherFuncAfterRefresh:otherFunc,
            "dicArr"      :['common','doNetworkManagementStrategy'],
            "titles": {
                "ID"		 : {
                    "key": "ID",
                    "type": "text"
                },
                "启动类型"     :	{
                    "key": "type_for_table",
                    "type": "text"
                },
                "运行时间"		 : {
                    "key": "time",
                    "type": "text"
                },
                "任务内容"		 : {
                    "key": "content",
                    "type": "text"
                },
                "{edit}": {
                    "type": "btns",
                    "btns" : [
                        {
                            "type" : 'edit',
                            "clickFunc" : function($this){
                                var primaryKey = $this.attr('data-primaryKey');
                                var database = DATA.tableData;
                                DATA['primaryKey']=primaryKey;
                                var data = database.getSelect({
                                    primaryKey: primaryKey
                                });
                                console.log("*******************");
                                console.log(data[0].type);
                                editBtnClick(data[0]);
                            }
                        },
                        {
                            "type" : 'delete',
                            "clickFunc" : function($this){
                                var primaryKey = $this.attr('data-primaryKey');
                                var database = DATA.tableData;
                                var data = database.getSelect({
                                    primaryKey: primaryKey
                                });
                                // 删除这条数据
                                remove(data[0], $this);
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
        // 加载表格组件，获得表格组件对象，获得表格jquery对象
        var Table = require('Table'),
            tableObj = Table.getTableObj(list),
            $table = tableObj.getDom();
        // 将表格组件对象存入全局变量，方便其他函数调用
        DATA["tableObj"] = tableObj;
        return $table;
    }
    /**
     * 表格刷新后执行的方法
     */
    function otherFunc(tableObj){
        tableObj.getDom().find('td[data-column-title="{username}"]>[data-local="admin"]').parent().prev().find('input').remove();
    }

    function addSubmitClick(modalID) {
        var Serialize = require('Serialize');
        var database   = DATA["tableData"];
        var Tips = require('Tips');
        var InputGroup=require('InputGroup');
        var $modal = $('#'+modalID);
        if (InputGroup.checkErr($modal)>0){
            //Tips.showError("{checkErr}");
        }else{
            var database = DATA.tableData;
            primaryKey=DATA['primaryKey'];
            var data = database.getSelect({
                primaryKey: primaryKey
            })[0];
            // 将模态框中的输入转化为url字符串
            var queryArr = Serialize.getQueryArrs($modal),
                queryJson = Serialize.queryArrsToJson(queryArr),
                queryStr = Serialize.queryArrsToStr(queryArr);
            var pStr;
            if(modalID=='modal-add'){
                pStr="Action=add&"+queryStr;
            }else{
                //pStr="Action=edit&usernameold="+data.UserNames+"&"+queryStr;
                pStr="Action=edit&"+queryStr;
            }

            $.ajax({
                url: '/cgi-bin/luci/admin/setPlanTask',
                type: 'POST',
                data: pStr,
                success: function(result) {
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
                            Tips.showSuccess(T("saveSuccess"), 2);
                            $modal.modal('hide');
                            setTimeout(function(){
                                $modal.remove();
                            },450);
                            display($('#1'));
                        } else {
                            var errorStr = data['errorstr'];
                            Tips.showWarning(T("saveFail") + errorStr, 2);
                        }
                    } else {
                        Tips.showWarning(T('netErr'), 2);
                    }
                }
            });
        }
    }

    function remove(data, $target) {
        var delstr = data["UserNames"];
        var queryStr = 'delstr=' + delstr;
        var Tips = require('Tips');
        if(delstr=='admin'){
            Tips.showWarning(T('word_2'));
            return;
        }
        Tips.showConfirm(T('delconfirm'),delete_ok,delete_no);
        function delete_no(){
            display($('#1'));
        }
        function delete_ok(){
            $.ajax({
                url: '/goform/formUserDel',
                type: 'POST',
                data: queryStr,
                success: function(result) {
                    var doEval = require('Eval');
                    var codeStr = result,
                        returnStr = ['status'],
                        result = doEval.doEval(codeStr, returnStr),
                        isSuccess = result["isSuccessful"];
                    // 判断代码字符串执行是否成功
                    if (isSuccess) {
                        var data = result["data"],
                            status = data['status'];
                        if (status) {
                            Tips.showSuccess('{delSuccess}', 2);
                            display($('#1'));
                        } else {
                            Tips.showError('{delFail}', 2);
                        }
                    } else {
                        Tips.showError('{netErr}', 2);
                    }
                }
            });
        }
    }

    function showEditAndAddModal(config) {
        // 加载模态框模板模块
        var modal='';
        var Modal = require('Modal');
        var BtnGroup = require('BtnGroup');
        var modalList = {
            "id"   : config.modalID,
            "title": config.modalTitle,
            "btns" : [
                {
                    "type"      : 'save',
                    "clickFunc" : function($this){
                        config.saveFunc(config.modalID);
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
            modal = modalobj.getDom(); // 模态框的jquery对象
        $('body').append(modal);

        var inputList = [
            {   
                "prevWord" : '任务间隔',
                "inputData": {
                    "defaultValue" : config.type, //默认值对应的value值
                    "type": 'select',
                    "name": 'interval',
                    "items" : [
                        {
                            "value" : 'week',
                            "name"  : '每星期'
                        },
                        {
                            "value" : 'day',
                            "name"  : '每天'
                        },
                        {
                            "value" : 'hour',
                            "name"  : '每小时'
                        },
                        {
                            "value" : 'Minute',
                            "name"  : '每分钟'
                        }
                    ]
                }
            },
            {   
                "prevWord" : '运行时间',
                "inputData": {
                    "defaultValue" : config.day, //默认值对应的value值
                    "type": 'select',
                    "name": 'day',
                    "items" : [
                        {
                            "value" : 'Monday',
                            "name"  : '星期一'
                        },
                        {
                            "value" : 'Tuesday',
                            "name"  : '星期二'
                        },
                        {
                            "value" : 'Wednesday',
                            "name"  : '星期三'
                        },
                        {
                            "value" : 'Thursday',
                            "name"  : '星期四'
                        },
                        {
                            "value" : 'Friday',
                            "name"  : '星期五'
                        },
                        {
                            "value" : 'Saturday',
                            "name"  : '星期六'
                        },
                        {
                            "value" : 'Sunday',
                            "name"  : '星期日'
                        },
                    ]
                }
            },
            {   
                "prevWord" : '任务内容',
                "inputData": {
                    "defaultValue" : 'device', //默认值对应的value值
                    "type": 'select',
                    "name": 'TakeEffect',
                    "items" : [
                        {
                            "value" : 'device',
                            "name"  : '重启设备'
                        }
                    ]
                }
            }
        ]

        var h = config.hour || '';
        var m = config.minute || '';

        var IG = require('InputGroup');
        var $inputs = IG.getDom(inputList);
        var afterStr = '<input class="worktime-box" name="hour" value="' + h + '" type="text"><span>:</span><input class="worktime-box" name="minute"  value="' + m + '" type="text"><span>:</span><input class="worktime-box" name="second" type="text" disabled="disabled" value="00"/>';
        $inputs.find('[name="day"]').css({marginRight:'10px'}).after(afterStr);
        $inputs.find('.worktime-box').css({width:'50px',marginLeft:'10px',marginRight:'10px'});
        $inputs.find('[name="hour"]').css({marginLeft:'0px'});
        $inputs.find('[name="hour"],[name="minute"],[name="second"]').keyup(function(){
            if($(this).val().length>=2){
                $(this).blur();
                if($(this).next().next().hasClass('worktime-box')){
                    $(this).next().next().focus();
                }
            }
        });

        $inputs.find('[name="hour"]').keyup(function(){
            var vals = $(this).val();
            if(Number(vals)>23){
                $(this).val('23');
            }else if(Number(vals)<0){
                $(this).val('00');
            }
        });

        $inputs.find('[name="minute"],[name="second"]').keyup(function(){
            var vals = $(this).val();
            if(Number(vals)>59){
                $(this).val('59');
            }else if(Number(vals)<0){
                $(this).val('00');
            }
        });

        $inputs.find('[name="hour"],[name="minute"],[name="second"]').blur(function(){
            var vals = $(this).val();
            if(Number(vals)>=0 && Number(vals)<10){
                $(this).val('0'+Math.round(Number(vals)));
            }
            if(isNaN(vals)){
                $(this).val('00');
            }
        });

        $inputs.click(function(event){
            var e = event || window.event;
            var targ = e.target || e.srcElement;
            var $t = $(targ);
            if($t.attr('name') == 'hour'){
                $inputs.find('[name="minute"],[name="second"]').trigger('blur');
            }else if($t.attr('name') == 'minute'){
                $inputs.find('[name="hour"],[name="second"]').trigger('blur');
            }else if($t.attr('name') == 'second'){
                $inputs.find('[name="hour"],[name="minute"]').trigger('blur');
            }else{
                $inputs.find('[name="hour"],[name="minute"],[name="second"]').trigger('blur');
            }
        })

        $inputs.find('[name="hour"]').checkdemofunc('checkNum','00','59');
        $inputs.find('[name="minute"]').checkdemofunc('checkNum','00','59');

        makeTheAfterInputChange();
        $inputs.find('[name="interval"]').change(function(){
            makeTheAfterInputChange();
        });

        function makeTheAfterInputChange(){
            var a1 = $inputs.find('[name="day"]'),
                a2 = $inputs.find('[name="hour"]'),
                a3 = $inputs.find('[name="minute"]'),
                all = $inputs.find('[name="day"]').parent().parent();
            a1.addClass('u-hide');
            a2.addClass('u-hide').removeAttr('disabled');
            a3.addClass('u-hide');
            all.addClass('u-hide');
            var taskin = $inputs.find('[name="interval"]').val();
            switch(taskin){
                case 'week':
                    all.removeClass('u-hide');
                    a1.removeClass('u-hide').val(config.day || '01');
                    a2.removeClass('u-hide').val(config.hour || '00');
                    a3.removeClass('u-hide').val(config.minute || '00');
                    break;
                case 'day':
                    all.removeClass('u-hide');
                    a1.addClass('u-hide')
                    a2.removeClass('u-hide').val(config.hour || '00');
                    a3.removeClass('u-hide').val(config.minute || '00');
                    break;
                case 'hour':
                    all.removeClass('u-hide');
                    a1.addClass('u-hide')
                    a2.removeClass('u-hide').val('').attr('disabled','true');
                    a3.removeClass('u-hide').val(config.minute || '00');
                    break;
                default:
                    break;
            }
        }
        
        /*
        modalObj.insert($inputs);
        var $modalDom = modalObj.getDom();
        $('body').append($modalDom);

        var Translate  = require('Translate');
        var tranDomArr = [$modalDom];
        var dicArr     = ['common','lanConfig'];
        Translate.translate(tranDomArr, dicArr);

        modalObj.show();
        */
        

        DATA['dom']=$inputs;
        modal.find('.modal-body').empty().append($inputs);
        modal.modal('show');
        var Translate  = require('Translate');
        var tranDomArr = [modal];
        var dicArr     = ['common','doNetworkManagementStrategy'];
        Translate.translate(tranDomArr, dicArr);
    }

    function editBtnClick(data){
        var config={
            "modalID"   	:'modal-edit',
            "modalTitle"	:'{edit}',
            "saveFunc"  	:addSubmitClick,
            "type"          :data.type,
            "day"           :data.day, 
            "hour"          :data.hour, 
            "minute"        :data.minute,
        }	
        showEditAndAddModal(config);
    }

    function addBtnClick() {
        if(DATA['length']>=DATA['maxNum']){
            require('Tips').showWarning(T("word_1"));
            display($('#1'));
            return;
        }
        var config={
            "modalID"   	:'modal-add',
            "modalTitle"	:'{add}',
            "saveFunc"  	:addSubmitClick,
            "type"          :"week",  
            "day"           :"Monday",  
            "hour"          :"00",  
            "minute"        :"00",  
        }	
        showEditAndAddModal(config);
    }

    function deleteBtnClick() {
        var Tips = require('Tips');
        var database = DATA["tableData"];
        var tableObj = DATA["tableObj"];
        // 获得表格中所有被选中的选择框，并获取其数量
        var primaryKeyArr = tableObj.getSelectInputKey('data-primaryKey'),
            length = primaryKeyArr.length;

        // 判断是否有被选中的选择框
        if (length > 0) {
            var str = '';
            primaryKeyArr.forEach(function(primaryKey) {
                var data = database.getSelect({
                    primaryKey: primaryKey
                });
                var name = data[0]["UserNames"];

                if(name!='admin')/*管理员配置不能被删除*/
                    str += name + ',';
            });
            str = str.substr(0, str.length - 1);
            if(str.length==0){
                Tips.showWarning(T('word_2'));
                display($('#1'));
                return;
            }
            str = 'delstr=' + str;
            Tips.showConfirm(T("delconfirm"),delete_ok,delete_no);
            function delete_no(){
                display($('#1'));
            }
            function delete_ok(){
                $.ajax({
                    url: '/goform/formUserDel',
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
                            if (status) {
                                // 提示成功信息
                                Tips.showSuccess('{delSuccess}', 2);
                                display($('#1'));
                            } else {
                                var errorStr = data['errorstr'];
                                Tips.showWarning('{delFail}' + errorStr, 2);
                                display($('#1'));
                            }
                        } else {
                            Tips.showError('{netErr}!', 2);
                        }
                    }
                });
            }
        } else {
            Tips.showWarning('{upleSelectDelName}', 2);
        }
    }


    function converTime(data, i){
        if(data.type[i] == 'week'){
            if(data.day[i] == 'Monday')
                day = '星期一';
            else if(data.day[i] == 'Tuesday')
                day = '星期二';
            else if(data.day[i] == 'Wednesday')
                day = '星期三';
            else if(data.day[i] == 'Thursday')
                day = '星期四';
            else if(data.day[i] == 'Friday')
                day = '星期五';
            else if(data.day[i] == 'Saturday')
                day = '星期六';
            else if(data.day[i] == 'Sunday')
                day = '星期日';
            return day+" "+data.hour[i]+":"+data.minute[i]+":00";

        } else if (data.type[i] == 'day'){
            return data.hour[i]+":"+data.minute[i]+":00";

        } else if (data.type[i] == 'hour'){
            return data.minute[i]+"分";

        } else if (data.type[i] == 'Minute'){
            return "每分钟";
        }
    }

    function converType(type){
        if(type == 'week')
            return '每周';
        else if(type == 'day')
            return '每天';
        else if(type == 'hour')
            return '每小时';
        else if(type == 'Minute')
            return '每分钟';
    }


    function storeTableData(data) {
        console.log(data);
        // 获取数据库模块，并建立一个数据库
        var Database = require('Database');
        var database = Database.getDatabaseObj(); // 数据库的引用
        // 存入全局变量DATA中，方便其他函数使用
        DATA["tableData"] = database;
        // 声明字段列表
        var fieldArr = [
            "ID",
            "type_for_table",//表格显示用的
            "time",
            "type",
            "day",
            "hour",
            "minute",
            "content"
        ];

        var baseData = [];
        for (var i=0; i<DATA.length; i++)
        {
            baseData.push([
                i+1,
                converType(data.type[i]),
                converTime(data, i),
                data.type[i],
                data.day[i],
                data.hour[i],
                data.minute[i],
                data.content[i]
            ]);   
        }
        // 将数据存入数据表中
        database.addTitle(fieldArr);
        database.addData(baseData);
    }

    function displayTable($container) {
        var TableContainer = require('P_template/common/TableContainer');
        var conhtml = TableContainer.getHTML({}),
            $tableCon = $(conhtml);
        // 将表格容器放入标签页容器里
        $container.append($tableCon);

        //向后台发送请求，获得表格数据
        $.ajax({
            url: '/cgi-bin/luci/admin/adminConfig',
            type: 'GET',
            success: function(result) {
                result = JSON.parse(result);
                console.log("************************************")
                console.log(result)
                var data = processData(result);
                var tableData = data["table"];
                var	titleArr  = tableData["title"],
                    tableArr  = tableData["data"];
                storeTableData(tableArr);				
                var $table = getTableDom();
                $tableCon.append($table);
            }
        });
    }

    function display($container) {
        // 清空标签页容器
        $container.empty();
        displayTable($container);
    }
    // 提供对外接口
    module.exports = {
        display: display
    };
});
