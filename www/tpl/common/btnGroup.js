/*TMODJS:{"version":1,"md5":"1f9f82e5a5257885d2558438426bce0d"}*/
define(function(require){return require("../template")("common/btnGroup",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.btn_list,e=(a.value,a.index,b.$escape),f="";return f+='<ul class="align-center"> ',c(d,function(a){f+=' <li class="utt-inline-block"> <button id="',f+=e(a[0]),f+='" class="btn-sm btn-primary " data-local="',f+=e(a[1]),f+='">',f+=e(a[1]),f+="</button> </li> "}),f+=" </ul>",new String(f)})});