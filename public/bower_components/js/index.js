$(document).ready(function(){

	    //先使用构造函数构造库对象
	    var libo=new Libo();
	    //变量库
	    (function(){
	    	var args = {};
	    	//onBox是否是false还是true
	    	args.onBox = false;
	    	//获取容器和音乐播放器
	    	args.container = document.getElementById('container');
	    	args.music = document.getElementById('music');
	    	//获取作者近日活动的模块
	    	args.tips = document.getElementById('tips');
	    	//获取最近小迷照的模块
	    	args.pics = document.getElementById('slidepics');
	    	//歌名数组
	    	args.songs = ['晚安喵','北京巷弄','菊次郎的夏天','爱滴歌'];
	    	//时钟
            args.canCon = document.getElementById("canvas");
            args.can = document.getElementById("clock");
	    	window['args'] = args;
	    }());
	    
	   	//设置关闭遮罩事件
	   	$("#layer .closeLayer").click(function(){
	   		$("#layer").hide();
	   	});

	   	//设置显示遮罩层事件
	   	$("#container .add").mouseover(function(){
	   		libo.startMove(this,{width:60},30);
	   	}).mouseout(function(){
	   		libo.startMove(this,{width:50},30);
	   	}).click(function(){
	   		$("#layer").show();
	   	});

	   	//对音乐播放器进行拖拽设置
	   	libo.onlyDrag(args.container,args.music);
	   	//控制音乐播放器的显示与否
	   	$('#box-foot .music').click(function(){
	   		$(args.music).css('display','block');
	   	});
	   	$('#music .remove').click(function(){
	   		$(args.music).css('display','none');
	   	});

	   	//设置暂停上下曲的按钮事件
	   	(function(){
	   		var preBtn = $('#music .pre'),
	   			nextBtn = $('#music .next'),
	   			pauseBtn = $('#music .pause'),
	   			restartBtn = $('#music .restart'),
	   			audio = $('#music audio'),
	   			pSong = $('#music p'),
	   			isPlay = false;
	   		//初始化音乐播放器的内容,包含音乐和歌名
	   		init();
	   		//设置上一曲的切换
	   		preBtn[0].onclick = function(){
	   			var _this = this;
	   			var index = 0;
	   			var nowSongName = audio.attr('src').split('mp3/')[1].split('.mp3')[0];
	   			args.songs.forEach(function(item,key,arr){
	   				if(nowSongName === item){
	   					if(key <= 0){
	   						index = arr.length - 1;
	   					}else{
	   						index = key - 1;
	   					}
	   				}
	   			}); 
	   			//使用jquery[index]将jQuery对象转成普通的DOM对象
	   			audio[0].pause();
	   			songName(songSrc('../bower_components/mp3/' + args.songs[index] + '.mp3'));
	   			audio[0].play();
	   			pauseBtn.removeClass('hidden');
	   			restartBtn.addClass('hidden');
	   		};

	   		//设置下一曲的切换
	   		nextBtn[0].onclick = function(){
	   			var _this = this;
	   			var index = 0;
	   			var nowSongName = audio.attr('src').split('mp3/')[1].split('.mp3')[0];
	   			args.songs.forEach(function(item,key,arr){
	   				if(nowSongName === item){
	   					if(key >= arr.length-1){
	   						index = 0;
	   					}else{
	   						index = key + 1;
	   					}
	   				}
	   			});
	   			audio[0].pause();
	   			songName(songSrc('../bower_components/mp3/' + args.songs[index] + '.mp3'));
	   			audio[0].play();
	   			pauseBtn.removeClass('hidden');
	   			restartBtn.addClass('hidden');
	   		};

	   		//设置暂停
	   		pauseBtn.click(function(){
	   			var _this = this;
	   			audio[0].pause();
	   			$(_this).addClass('hidden');
	   			restartBtn.removeClass('hidden');
	   		});
	   		//设置继续播放
	   		restartBtn.click(function(){
	   			var _this = this;
	   			audio[0].play();
	   			$(_this).addClass('hidden');
	   			pauseBtn.removeClass('hidden');
	   		});
	   		//设置循环播放
	   		audio[0].onended = function(){  //自动执行之前要把loop属性去掉
	   			nextBtn[0].onclick();
	   		}

	   		//是否初始播放
	   		function isPlaying(isPlay){
	   			if(isPlay){
	   				audio.attr('autoPlay','autoPlay');
	   			}

	   		}
	   		//改变歌名
	   		function songName(songName){
	   			pSong.text(songName);
	   		}

	   		//切换歌曲
	   		function songSrc(src){  //返回的是歌名
	   			audio.attr('src',src);
	   			var src = audio.attr('src');
	   			return src.split('mp3/')[1].split('.mp3')[0];
	   		}

	   		//初始
	   		function init(){
	   			isPlaying(isPlay);
	   			songName(songSrc(audio.attr('src')));
	   		}

	   	}());


	   	//对作者今日活动进行拖拽设置
	   	libo.onlyDrag(args.container,args.tips);
	   	//对近日活动块的选项卡进行设置
        $('.navs li').each(function(index,item){
            $(this).click(function(){
            	$('#tips-container ul').each(function(){
            		$(this).addClass('nosee').removeClass('show');
            	});

            	$('#tips-container ul').eq(index).addClass('show');
            });
        });

        //控制近日活动的显示与否
	   	$('#box-foot .tips').click(function(){
	   		$('#tips').addClass('show');
	   	});
	   	$('#tips .min').click(function(){
	   		$('#tips').removeClass('show').addClass('nosee');
	   	});



	   	/*============================设置图片库的显示与浏览==========================*/
        //控制近日活动的显示与否
	   	$('#box-foot .pics').click(function(){
	   		$('#slidepics').removeClass('nosee').addClass('show');
	   	});
	   	$('#slidepics .no').click(function(){
	   		$('#slidepics').removeClass('show').addClass('nosee');
	   	});


	   	//模块化自定义滚动条项目
	   	libo.totalDrag($('#slidepics .slidebar'),$('#slidepics .bar'),$('#lipics'),$('#slidepics .pic-container'));  //dragParent,dragObj,scrollObj,scrollParent


    //画时钟模块
    (function(){
        if(args.can==null){
            //your browser do not support canvas
        }else{
            var ctx=args.can.getContext("2d");
            var w=args.can.width;
            var h=args.can.height;
            var r=w/2||h/2;
            //按照比例缩放
            var scale=w/200;
            //drawClock
            function draw(){
                var date=new Date();
                ctx.clearRect(0,0,w,h);
                var hour=date.getHours();
                var minute=date.getMinutes();
                var second=date.getSeconds();
                drawBg();
                drawAllPoint();
                drawHour(hour,minute);
                drawMinute(minute);
                drawSecond(second);
                drawPoint();
                ctx.restore();
            }
            draw();
            //定时
            setInterval(draw,1000);
            //drawBackground
            function drawBg(){
                ctx.save();			//将之前的环境保存下来
                ctx.translate(r,r);
                ctx.beginPath();
                ctx.fillStyle="transparent";
                ctx.arc(0,0,r,0,2*Math.PI,false);
                ctx.fill();
                ctx.closePath();
            }
            //drawAllPoints
            function drawAllPoint(){
                var rad;
                var x;
                var y;
                ctx.fillStyle="black";
                for(var i=0;i<60;i++){
                    rad=2*Math.PI /60 *i;
                    x=Math.cos(rad) * (r-5*scale);
                    y=-Math.sin(rad) * (r-5*scale);
                    ctx.beginPath();
                    if(i%5==0){
                        ctx.arc(x,y,4*scale,0,2*Math.PI,false);
                        ctx.closePath();
                        ctx.fill();
                    }else{
                        ctx.arc(x,y,2*scale,0,2*Math.PI,false);
                        ctx.closePath();
                        ctx.fill();
                    }

                }
            }
            function drawHour(hour,minute){
                var rad=2 *Math.PI/ 12 *hour;
                var mrad=2 *Math.PI/ 12 /60 *minute;
                ctx.save();
                ctx.rotate(rad+mrad);
                ctx.beginPath();
                ctx.lineWidth=5*scale;
                ctx.lineCap="round";	//设置笔触
                ctx.moveTo(0,10*scale);
                ctx.lineTo(0,-r/2);
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
            function drawMinute(minute){
                var mrad=2 *Math.PI/ 60 *minute;
                ctx.save();
                ctx.rotate(mrad);
                ctx.beginPath();
                ctx.lineWidth=3*scale;
                ctx.moveTo(0,10*scale);
                ctx.lineTo(0,-r+20*scale);
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
            function drawSecond(second){
                var srad=2 *Math.PI/ 60 *second;
                ctx.save();
                ctx.rotate(srad);
                ctx.beginPath();
                ctx.fillStyle="red";
                ctx.moveTo(2*scale,10*scale);
                ctx.lineTo(-2*scale,10*scale);
                ctx.lineTo(-1*scale,-r+10*scale);
                ctx.lineTo(1*scale,-r+10*scale);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
            function drawPoint(){
                ctx.beginPath();
                ctx.fillStyle="#B4B4BC";
                ctx.arc(0,0,2*scale,0,2 * Math.PI,false);
                ctx.closePath();
                ctx.fill();
            }
        }
    }());
    //对钟表用一个弹性拖动运动
    (function(){
        args.canCon.onmousedown=function(e){
            var oE=e||window.event;
            //鼠标距离自身边界的位置
            var canX=oE.clientX-this.offsetLeft;
            var canY=oE.clientY-this.offsetTop;
            // document.title=canX+" "+canY;
            document.onmousemove=function(e){
                var oE=e||window.event;
                var l=oE.clientX-canX;
                var t=oE.clientY-canY;
                if(l<0){
                    l=0;
                }else if(l>args.container.offsetWidth-args.canCon.offsetWidth){
                    l=args.container.offsetWidth-args.canCon.offsetWidth
                }
                if(t<0){
                    t=0;
                }else if(t>args.container.offsetHeight-args.canCon.offsetHeight){
                    t=args.container.offsetHeight-args.canCon.offsetHeight
                }
                libo.css(args.canCon,"left",l);
                libo.css(args.canCon,"top",t);
            }
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
            }
        }
    }());

});