var oUl=document.getElementById('express')
console.log(oUl)
var oLis=document.getElementsByTagName('li')
oUl.innerHTML+=oUl.innerHTML
oUl.style.height=oLis[0].offsetHeight*oLis.length+'px'
var timer1=setInterval(function () {
    var curTop=oUl.offsetTop
    curTop-=2

    if(curTop<-oUl.offsetHeight/2){
        curTop=0
    }
    oUl.style.top=curTop+'px'
},100)


var flakeColur='#fff'   //雪片的颜色
var newOn=100    //间隔多长时间产生雪片   值越小单位时间内产生的雪片越多
var flake=$('<div></div>').css("position","absolute").html("❉")
$(function () {//页面加载后
    var dwidth=$(document).width()  //获取页面的宽度
    var dheight=$(document).height() //获取页面的高度
    setInterval(function () {
        var starLeft=Math.random()*dwidth   //一开始距离浏览器的随机left
        var endLeft=Math.random()*dwidth   //下落之后距离浏览器的随机left
        var flakeSize=5+50*Math.random()  //雪片的大小区间
        var starOpacity=0.7+0.3*Math.random()  //保证最小透明度0.7
        var endOpacity=0.4+0.3*Math.random()  //保证最大透明度0.4
        var durationTime=4000+7000*Math.random()//雪片下落的随机时间  速度随机
        flake.clone().appendTo($("body")).css({//雪片一开始的状态  flake.clone()克隆一份雪片加到网页之中
            "left":starLeft,
            "top":"-55",
            "color":flakeColur,
            "font-size":flakeSize,
            "z-index":"2",
            "opacity":starOpacity
        }).animate({//动画
            "left":endLeft,
            "top":dheight,
            "opacity":endOpacity
        },durationTime,function () {
            $(this).remove()
        })
    },newOn)
})
/*我希望有个如你一般的人
 I wish there is somebody like you,
 如山间清爽的风
 fresh as the wind from the mountains,
 如古城温暖的光
 warm as the light in the old town,
 只要最后是你就好
 and you will be there, at last.
 */


//鼠标放上停止滚动，鼠标离开继续滚动
// 多行滚动


var wrap=utils.getElementsByClass('wrap')[0]
var inner=utils.getElementsByClass('inner',wrap)[0]
var focuslist=utils.getElementsByClass('focuslist',wrap)[0]
var lis=wrap.getElementsByTagName('li')
var imgs=wrap.getElementsByTagName('img')
var left=wrap.getElementsByTagName('a')[0]
var right=wrap.getElementsByTagName('a')[1]
var data=null
var n=0
    ;(function () {
    var xhr=new XMLHttpRequest()
    xhr.open('get','data.txt',false)
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4&&xhr.status==200){
            data=JSON.parse(xhr.responseText)
        }
    }
    xhr.send()
})()
console.log(data)

;(function () {
    var str1=''
    var str2=''
    for(var i=0;i<data.length;i++){
        str1+='<img src="" real="'+data[i].src+'">'
        str2+=i==0?'<li class="cur"></li>':'<li></li>'
    }
    inner.innerHTML=str1
    //focuslist.innerHTML=str2
})()

;(function () {
    for(var i=0;i<imgs.length;i++){
        var tempImg=new Image
        tempImg.index=i
        tempImg.src=imgs[i].getAttribute('real')
        tempImg.onload=function () {
            imgs[this.index].src=this.src
            if(this.index==0){
                utils.css(imgs[0],'zIndex',1)
                animate({
                    ele:imgs[0],
                    target:{
                        opacity:1
                    }
                })
            }
        }
    }
})()

clearInterval(timer)
var timer=setInterval(autoMove,2000)
function autoMove() {
    n++
    if(n==data.length){
        n=0
    }
    setImg()
}

function setImg() {
    for(var i=0;i<imgs.length;i++){
        if(i==n){
            utils.css(imgs[i],'zIndex',1)
            animate({
                ele:imgs[i],
                target:{
                    opacity:1
                },
                callback:function () {
                    var otherImgs=utils.siblings(this)
                    for(var i=0;i<otherImgs.length;i++){
                        utils.css(otherImgs[i],'opacity',0)
                    }
                    canClick=true
                }
            })
        }
        else {
            utils.css(imgs[i],'zIndex',0)

        }
        //lis[i].className=i==n?'cur':''
    }
}
setImg()

wrap.onmouseover=function () {
    clearInterval(timer)
    left.style.display=right.style.display='block'
}
wrap.onmouseout=function () {
    timer=setInterval(autoMove,2000)
    left.style.display=right.style.display='none'
}

var musicBox=document.querySelector('#musicBox')
var musicAudio=document.querySelector('#musicAudio')
setTimeout(function () {
    musicAudio.play()//自带的播放方法
    musicAudio.addEventListener('canplay',function () {
        musicBox.className='music musicMove'
    },false)
},1000)

musicBox.addEventListener('click',function () {
    if(musicAudio.paused){//暂停状态—》播放
        musicAudio.play()
        musicBox.className='music musicMove'
    }else {//播放状态—》暂停
        musicAudio.pause()
        musicBox.className='music'
        musicBox.style.opacity=1
    }
})




