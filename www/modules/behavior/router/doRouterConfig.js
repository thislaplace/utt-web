define(function(require, exports, module) {
  require('jquery');
  var DATA = {};
  exports.display = function() {
    var Translate = require('Translate');
    var dicNames = ['common', 'doRouterConfig'];

    function T(_str) {
      return Translate.getValue(_str, dicNames);
    }
    var dics = ['doRouterConfig'];
    Translate.preLoadDics(dics, function() {
      var Path = require('Path');

      $.ajax({
        url: 'common.asp?optType=allConfig',
        type: 'GET',
        success: function(result) {
          var doEval = require('Eval');
          var codeStr = result,
            variableArr = [
              'PolicyRoute'
            ];
          result = doEval.doEval(codeStr, variableArr),
            isSuccess = result["isSuccessful"];
          //判断代码字符串执行是否成功
          if (isSuccess) {
            var data = result["data"];
            DATA.PolicyRoute = data.PolicyRoute;
            // 加载路径导航
            var pathList = {
              "prevTitle": T('utt_netConf'),
              "links": [{
                "link": '#/network_config/router_config',
                "title": T('rou_routeConf')
              }],
              "currentTitle": ''
            };
            Path.displayPath(pathList);
            var Tabs = require('Tabs');
            // 加载标签页
            var tabsList = [{
              "id": "1",
              "title": T("staticRoute")
            }];
            console.log(DATA)
            console.log(DATA.PolicyRoute)
            if (DATA.PolicyRoute == 1) {
              tabsList.push({
                "id": "2",
                "title": T("com_policyroute")
              })
            }
            // 生成标签页，并放入页面中
            Tabs.displayTabs(tabsList);
            $('a[href="#1"]').click(function(event) {
              Path.changePath($(this).text());
              require.async('./displayStaticRouter', function(obj) {
                obj.display($('#1'));
              });
            });
            if (DATA.PolicyRoute == 1) {
              $('a[href="#2"]').click(function(event) {
                Path.changePath($(this).text());
                require.async('./displayPolicyRouter', function(obj) {
                  obj.display($('#2'));
                });
              });
            }
            $('a[href="#1"]').trigger('click');
          } else {
            alert('失败');
          }
        }
      });


    });
  }
})
