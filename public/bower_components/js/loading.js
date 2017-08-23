window.onload = function(){ 
  //先使用构造函数构造库对象
  var imgs = [
    "../bower_components/resource_imgs/clockBg.png",
    '../bower_components/resource_imgs/window_bg.jpg',
    '../bower_components/resource_imgs/window_bg1.jpg',
    '../bower_components/resource_imgs/window_bg2.jpg',

    '../bower_components/resource_imgs/indexpics/pic1.png',
    '../bower_components/resource_imgs/indexpics/pic10.png',
    '../bower_components/resource_imgs/indexpics/pic2.png',
    '../bower_components/resource_imgs/indexpics/pic3.png',
    '../bower_components/resource_imgs/indexpics/pic4.png',
    '../bower_components/resource_imgs/indexpics/pic5.png',
    '../bower_components/resource_imgs/indexpics/pic6.png',
    '../bower_components/resource_imgs/indexpics/pic7.png',
    '../bower_components/resource_imgs/indexpics/pic8.png',
    '../bower_components/resource_imgs/indexpics/pic9.png',

    '../bower_components/resource_imgs/personpage/bg.jpg',
    '../bower_components/resource_imgs/personpage/blog.png',
    '../bower_components/resource_imgs/personpage/github.png',
    '../bower_components/resource_imgs/personpage/logo.png',
    '../bower_components/resource_imgs/personpage/photo.png',
    '../bower_components/resource_imgs/personpage/site.jpg',
    '../bower_components/resource_imgs/personpage/wyy.png',

    '../bower_components/resource_imgs/picwall/beauty.jpg',
    '../bower_components/resource_imgs/picwall/beauty1.jpg',
    '../bower_components/resource_imgs/picwall/beauty2.jpg',
    '../bower_components/resource_imgs/picwall/beauty3.jpg',
    '../bower_components/resource_imgs/picwall/beauty4.jpg',
    '../bower_components/resource_imgs/picwall/beauty5.jpg',
    '../bower_components/resource_imgs/picwall/beauty6.jpg',
    '../bower_components/resource_imgs/picwall/beauty7.jpg',
    '../bower_components/resource_imgs/picwall/beauty8.jpg',
    '../bower_components/resource_imgs/picwall/beauty9.jpg',

    '../bower_components/resource_imgs/wuxia/10wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/11wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/12wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/13wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/14wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/15wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/16wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/17wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/18wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/19wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/1wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/20wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/21wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/22wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/23wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/24wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/26wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/27wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/28wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/29wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/2wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/30wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/31wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/32wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/33wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/34wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/3wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/4wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/6wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/7wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/8wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/9wuxia.jpg',
    '../bower_components/resource_imgs/wuxia/bigbg.jpg',
    '../bower_components/resource_imgs/wuxia/hua2.png',
    '../bower_components/resource_imgs/wuxia/hua3.png'
  ];

  //先使用构造函数构造库对象
  var libo = new Libo(); 
  var goal = $('#container .pro')[0];

  function every(w,count,len){
    libo.startMove(goal,{width:w},300,function(){
    	all(count,len);
    });
  }

  function all(count,len){
    if(count>=len){
      window.open('./index','_self');
    }
  }
  
  libo.preload(imgs,every,all);
}