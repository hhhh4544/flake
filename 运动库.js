/**
 * Created by hhhh4 on 2017/3/14.
 */





;(function () {
    function move(opt) {
        var ele = opt.ele
        var duration = opt.duration || 800
        var target = opt.target
        var callback = opt.callback
        var time = 0
        var begin = {}
        var change = {}
        for (var key in target) {
            begin[key] = utils.css(ele, key)
            change[key] = target[key] - begin[key]
        }
        var effect = {
            linear: function (t, b, c, d) {
                return t / d * c + b
            }
        }
        window.clearInterval(ele.timer)//定时器存在元素的自定义属性上
        ele.timer = window.setInterval(function () {
            time += 10
            if (time >= duration) {
                utils.css(ele, target)
                window.clearInterval(ele.timer)
                if (typeof callback == 'function') {
                    callback.call(ele)
                }
                return
            }
            for (var key in change) {
                if (change[key]) {
                    var val = effect.linear(time, begin[key], change[key], duration)
                    utils.css(ele, key, val)
                }
            }
        }, 10)


    }
    window.animate = move
})()







;(function () {
    function move(opt) {
        var ele=opt.ele
        var callback=opt.callback
        var duration=opt.duration||1000
        var time=0;
        var begin={}
        var change={}
        var target=opt.target
        var effect={
            linear:function (t,b,c,d) {
                return t/d*c+b
            }
        }
        for(var key in target){
            begin[key]=utils.css(ele,key)
            change[key]=target[key]-begin[key]
        }
        clearInterval(ele.timer)
        ele.timer=setInterval(function () {
            time+=10
            if(time>=duration){
                utils.css(ele,target)
                clearInterval(ele.timer)
                if(typeof callback=='function'){
                    callback.call(ele)
                }
            }
            for(var key in change){
                var val=effect.linear(time,begin[key],change[key],duration)
                utils.css(ele,key,val)
            }
        },10)

    }
    window.animate=move

})()






