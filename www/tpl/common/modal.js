/*TMODJS:{"version":1,"md5":"5e8fac2e981684a519f5b5cebe90a65d"}*/
define(function(require){return require("../template")("common/modal",function(a){"use strict";var b=this,c=(b.$helpers,b.$escape),d=a.modalList,e="";return e+='<div id="',e+=c(d.id),e+='" class="modal fade" tabindex="-1" role="dialog"> <div class="modal-dialog" role="document" style="',e+=c(d.size),e+='"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" data-local="',e+=c(d.title),e+='">',e+=c(d.title),e+='</h4> </div> <div class="modal-body"> </div> <div class="modal-footer"> </div> </div> </div> </div> ',new String(e)})});