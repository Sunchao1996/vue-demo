var vm = new Vue({
    el:'div',
    data:{
        activeColor:'red',
        fontSize:130,
        baseStyles:{
            'color':'red'
        },
        extendStyles:{
            'font-size':'30px'
        }
        // styleObject:{
        //     'color':'red',
        //     'font-size':'30px'
        // }
    },
    computed:{
        styleObject:function(){
            return {
                'color':'red',
                'font-size':'130px'
            }
        }
    }
});