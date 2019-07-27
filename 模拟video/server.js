const express = require('express');
const ffmpeg = require('ffmpeg');
const extractFrames = require('ffmpeg-extract-frames');

//开服务器
let server = new express();
server.use(express.static('./'));
server.listen(8080, function () {
	console.log('已监听8080');
})
let videoPath = './你的名字.mp4'
var videoTime;
//获取视频时长
let process = new ffmpeg(videoPath);
process.then((video)=>{
	videoTime = video.metadata.duration.seconds;
	e(videoTime)
},(result)=>{
	console.log(result);
})
let a = [1000,2000,3000,4000];

function e(x){
	for(let i = 0;i<x;i++){
		a.push(i*1000);
	}
	xx(a);
}
async function xx(arr){
	await extractFrames({
		input: videoPath,
		output: './jpg/%i.jpg',
		offsets: arr
	})
}




