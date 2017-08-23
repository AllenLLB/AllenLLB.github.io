window.onload = function(){
	waterfull('main','box');

	//假设后台数据
	var dataInt = [{"src":'beauty.jpg'},{"src":'beauty1.jpg'},{"src":'beauty2.jpg'},{"src":'beauty3.jpg'},{"src":'beauty4.jpg'},{"src":'beauty5.jpg'},{"src":'beauty6.jpg'},{"src":'beauty7.jpg'},{"src":'beauty8.jpg'},{"src":'beauty9.jpg'}];
	//设置滚动条数据
	window.onscroll = function(){
		if(checkScrollSlide()){
		//满足条件的时候对后台数据进行渲染
			for(data in dataInt){
				var oMain = document.getElementById('main');
				var oLi = document.createElement('li');
				oLi.className = 'box';
				var oA = document.createElement('a');
				oA.href = '#';
				oA.className = 'thumbnail';
				var img = document.createElement('img');
				img.src = "../bower_components/resource_imgs/picwall/" + dataInt[data].src;
				oA.appendChild(img);
				oLi.appendChild(oA);
				oMain.appendChild(oLi);
			}
			waterfull('main','box');
		}
	}
}

function waterfull(parent,box){
  //取出所有的
  var oParent = document.getElementById(parent);
  var boxs = getByClass(oParent,box);
  //计算整个页面需要显示的列数
  var oBoxW = boxs[0].offsetWidth;   //210
  var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
  //手动设置main的宽度
  oParent.style.cssText = 'width:'+ oBoxW*cols +'px;margin:0 auto';
  
  var hArr = [];   //存放每一列盒子的高度
  for(var i = 0;i<boxs.length;i++){
    if(i<cols){
    	hArr.push(boxs[i].offsetHeight);
    }else{
      var minH = Math.min.apply(null,hArr);
      var index = getMinHIndex(hArr,minH);
      boxs[i].style.position = 'absolute';
      boxs[i].style.top = minH + 'px';
      boxs[i].style.left = boxs[index].offsetLeft +'px';
      boxs[i].style.left = oBoxW*index +'px';
      hArr[index] += boxs[i].offsetHeight;
    }
  }
  
}

function getByClass(obj,classname){
  var elements = obj.getElementsByTagName('*');
  var result = [];
  for(var i = 0;i<elements.length;i++){
    if(elements[i].className == classname){
    	result.push(elements[i]);
    }
  }
  return result;
}

function getMinHIndex(arr,value){
  return arr.indexOf(value);
}


//检测是否具备了滚动加载数据块的条件
function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBox = getByClass(oParent,'box');
	var lastBoxH = oBox[oBox.length-1].offsetTop + Math.floor(oBox[oBox.length-1].offsetHeight/2);  //和整个页面的距离
    //滚走的距离
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;  //后者是混杂模式的使用方法
    //当前浏览器窗口的高度,也存在混杂模式和标准模式
    var height = document.documentElement.clientHeight || document.body.clientHeight;
    return lastBoxH < scrollTop+height?true:false;
}

//第一行盒子不需要定位,但是需要找一个最小的盒子的高度