//侦听属性
// var vm = new Vue({
//     el: '#app-20',
//     data: {
//         firstName: 'Foo',
//         lastName: 'Bar',
//         fullName: ''
//     }, watch: {
//         firstName: function (val) {
//             this.fullName = val + ' ' + this.lastName;
//         },
//         lastName: function (val) {
//             this.fullName = this.firstName + ' ' + val;
//         }
//     }
// });
//计算属性
var vm = new Vue({
    el:'#app-20',
    data:{
        firstName:'Foo',
        lastName:'Bar',
    },
    computed:{
        fullName:function(){
            return this.firstName+' '+this.lastName;
        }
    }
});