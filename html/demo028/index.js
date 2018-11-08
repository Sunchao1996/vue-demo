var vm = new Vue({
    el:'#app-28',
    data:{
        indexKye:1,
        object:{
            first:'firstName',
            last:'lastName'
        },
        parentMessage:'ParentMessage',
        items:[
            {id:2,message:'Bar'},
            {id:1,message:'Foo'}
        ],
        items1:[
            {id:2,message:'Bar'},
            {id:1,message:'Foo'}
        ],
        todos:[
            // {id:2,message:'Bar',isComplete:false},
            // {id:1,message:'Foo',isComplete:true}
        ],
        numbers:[1,2,3,4,5,6]
        // items:[
        //     {text:'Foo'},
        //     {text:'Bar'}
        // ]
    },
    computed:{
        computedNumbers:function(){
            return this.numbers.filter(function(n){
                return n %2 ===0;
            })
        }
    },
    methods:{
        even:function(n){
            return this.numbers.filter(function(n){
                return n %2 ===0;
            });
        }
    }
});
//相当于vm.items[i]={id:3,message:'3'}
Vue.set(vm.items,1,{id:3,message:'3'});
vm.items.splice(1,1,{id:3,message:'4'});
vm.$set(vm.items,1,{id:3,message:'5'});
//相当于vm.items.length=2
vm.items.splice(1);

//动态的为对象添加单个属性
Vue.set(vm.object,"age",23);
vm.$set(vm.object,"age1",24);
//动态的为已有对象添加多个属性
vm.object = Object.assign({},vm.object,{
    age2:25,
    age3:26
});
