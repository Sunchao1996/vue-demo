var vm = new Vue({
    el:'#app',
    data:{
        a:1
    },
    created:function(){
        console.log('a is'+this.a);
    }
});