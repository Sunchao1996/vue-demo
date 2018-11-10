var vm = new Vue({
    el:'#app-18',
    data:{
        linkAddr:'http://www.baidu.com'
    },
    methods:{
        clickMethod:function(){
            window.location.href='http://www.baidu.com'
        }
    }
});