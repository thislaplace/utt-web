/*TMODJS:{"version":1,"md5":"302aecd499f097ccd9344f5a6313717d"}*/
define(function(require){return require("../../template")("common/inputs/checkbox",function(a){"use strict";var b=this,c=(b.$helpers,a.display),d=a.sign,e=b.$escape,f=a.prevWord,g=a.necessary,h=b.$each,i=a.inputList,j=(a.value,a.index,a.disabled),k=a.afterWord,l="";return l+="<tr ",c||(l+='class="u-hide"'),l+=" ",""!=d&&(l+='data-control="',l+=e(d),l+='"'),l+='> <td> <label for="" data-local="',l+=e(f),l+='">',l+=e(f),l+="</label> ",g&&(l+=' <span class="u-necessary">*</span> '),l+=" <span></span> </td> <td> ",h(i,function(a){l+=" ",a[5]?(l+=' <input type="checkbox" name="',l+=e(a[0]),l+='" value="',l+=e(a[1]),l+='" checkonstr="',l+=e(a[3]),l+='" checkoffstr="',l+=e(a[4]),l+='" ',j&&(l+=' disabled="disabled" '),l+=" ",a[7]&&(l+=' disabled="disabled" '),l+=" ",a[6]&&(l+=' class="u-hide" '),l+=' checked="checked"> '):(l+=' <input type="checkbox" name="',l+=e(a[0]),l+='" value="',l+=e(a[1]),l+='" checkonstr="',l+=e(a[3]),l+='" checkoffstr="',l+=e(a[4]),l+='" ',j&&(l+=' disabled="disabled" '),l+=" ",a[7]&&(l+=' disabled="disabled" '),l+=" ",a[6]&&(l+=' class="u-hide" '),l+=" > "),l+=' <span data-local="',l+=e(a[2]),l+='" class="u-afterRC ',a[6]&&(l+="u-hide"),l+='">',l+=e(a[2]),l+="</span> "}),l+=' </td> <td> <span class="u-prompt-word" data-local="',l+=e(k),l+='">',l+=e(k),l+="</span> </td> </tr>",new String(l)})});