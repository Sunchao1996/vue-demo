var vm = new Vue({
    el:'div',
    data:{
        activeClass:'active',
        errorClass:'text-danger',
        isActive:true,
        hasError:true,
        //v-bind:class 使用对象的时候，对象中的key表示将要添加的样式，value表示是否进行添加对应的样式
        // classObject:{
        //     active:true,
        //     'text-danger':true
        // },
        error:null
    },
    computed:{
        classObject:function(){
            return {
                active:this.isActive &&!this.error,
                'text-danger':this.error && this.error.type==='fatal'
            }
        }
    }
});