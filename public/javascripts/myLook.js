/**
 * Created by Amy on 2015/8/7.
 */
var child = require('child_process');
child.exec('soffice --convert-to pdf --outdir /public/pdf 0001.pptx',function(){

});