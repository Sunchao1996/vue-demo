var vm = new Vue({
    el:'#app-21',
    data:{
        firstName:'Foo',
        lastName :'Bar'
    },
    computed:{
        fullName:{
            get:function(){
                return this.firstName+' '+this.lastName
            },
            set:function(val){
                var names=val.split(' ');
                this.firstName=names[0];
                this.lastName=names[1];
            }
        }
    }
});
vm.fullName='Sun Chao';