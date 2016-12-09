/**
 * Created by Administrator on 16-12-8.
 */

//var msg = {name:'lmm', age:20};
//
////var bodyBuf = new Buffer(5);
////bodyBuf.write(data);
////
////console.log(bodyBuf);
//
//msg = JSON.stringify(msg);
//console.log(msg);
//
//var len = Buffer.byteLength(msg);
//
//console.log(len);
//
////写入4个字节表示本次包长
//var headBuf = new Buffer(4);
//headBuf.writeUInt32LE(len, 0);
//console.log(headBuf.toString());
//
//var bodyBuf = new Buffer(len+headBuf.length);
//headBuf.copy(bodyBuf,0,0,headBuf.length);
//bodyBuf.write(msg,headBuf.length);
//console.log(bodyBuf.toString());


var ExBuffer = require('./ExBuffer');

/*************************基本操作****************************/

//构造一个ExBuffer，采用4个字节（uint32无符号整型）表示包长，而且是little endian 字节序
var exBuffer = new ExBuffer().uint32Head().littleEndian();
//或者构造一个ExBuffer，采用2个字节（ushort型）表示包长，而且是big endian 字节序 (默认)
//var exBuffer = new ExBuffer().ushortHead().bigEndian();

//只要收到满足的包就会触发事件
//exBuffer.on('data',function(buffer){
//    console.log('>> receive data,length:'+buffer.length);
//    console.log(buffer);
//});
//
//
////传入一个9字节长的数据，分多次put （对应于TCP中的分包的情况）
//exBuffer.put(new Buffer([0,9]));
//exBuffer.put(new Buffer([1,2,3,4,5,6,7]));
//exBuffer.put(new Buffer([8,9]));
//
////传入一个3个字节的数据和一个6个字节的数据，一次put（对应于TCP中的粘包的情况）
//exBuffer.put(new Buffer([0,3,1,2,3,0,6,1,2,3,4,5,6]));


//大数据处理测试 (20MB)
//var exBuffer = new ExBuffer().uint32Head().bigEndian();
exBuffer.on('data',function(buffer){
    console.log('>> receive data,length:'+buffer.length);
    console.log(buffer);
});
var sbuf = new Buffer(4);
sbuf.writeUInt32BE(1024*1024*20,0);//写入包长
exBuffer.put(sbuf);
exBuffer.put(new Buffer(1024*1024*20));