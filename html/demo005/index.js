var app= new Vue({
    el:'#app-5',
    data:{
        message :'Hello Vue.js!'
    },
    methods:{
        reverseMessage:function(){
            this.message=this.message.split(' ').reverse().join(' ');
        }
    }
});