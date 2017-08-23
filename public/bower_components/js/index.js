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


});