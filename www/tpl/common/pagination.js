/*TMODJS:{"version":1,"md5":"b9c9665ea702fade92974403762e70fd"}*/
define(function(require){return require("../template")("common/pagination",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.pagination_list,e=(a.list,a.index,b.$escape),f="";return f+='<nav> <ul class="pagination"> <li><a id="previous" href="#">&laquo;</a></li> ',c(d,function(a){f+=' <li><a href="#" data-local="',f+=e(a[1]),f+='">',f+=e(a[1]),f+="</a></li> "}),f+=' <li><a id="next" href="#">&raquo;</a></li> </ul> </nav> ',new String(f)})});