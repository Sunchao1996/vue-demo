var vm = new Vue({
    el:'#example-1',
    data:{
        counter:0
    }
});
var vm2 = new Vue({
    el:'#example-2',
    methods:{
        greet:function(event){
            alert('Hello Vue.js');
            //event是原生DOM事件
            if(event){
                alert(event.target.tagName);
            }
        }
    }
});
// vm2.greet();

var vm3 = new Vue({
    el:'#example-3',
    methods:{
        say:function(message){
            alert(message);
        }
    }
});
var vm4 = new Vue({
    el:'#example-4',
    methods:{
        warn:function(message,event){
            if(event){
                event.preventDefault();
            }
            alert(event);
            alert(event.cancelable);
            alert(message);
        }
    }
});
var vm5 = new Vue({
    el:'#example-5',
    methods:{
        onenter:function(event){
            alert(event.key);
        }
    }
});
//定义全局key值,别名，如下为112的别名是f1
// Vue.config.keyCodes.f1=112;

var vm6 = new Vue({
    el:'#example-6',
    methods:{
        onPageDown:function(evnent){
            alert(event.key);
        }
    }
});

var vm7 = new Vue({
    el:'#example-7',
    methods:{
        clear:function(){
            alert('clear');
        },
        clickCtrl:function(){
            alert('clickCtrl');
        }
    }
});

var vm8 = new Vue({
    el:'#example-8',
    methods:{
        onClick:function(){
            alert('onClidk');
        },
        onCtrlClick:function(){
            alert('onCtrlClick');
        }
    }
});

var vm9 = new Vue({
    el:'#example-9',
    methods:{
        onClick:function(){
            alert('mouse right');
        }
    }
});