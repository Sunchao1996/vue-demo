var vm =  new Vue({
    el:'#app-27',
    data:{
        ok:false,
        loginType:'username'
    },
    methods:{
        clickMethod:function(){
            if(this.loginType ==='username'){
                this.loginType='email'
            }else{
                this.loginType='username'
            }
        }
    }
});