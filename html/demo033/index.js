// //混入基础
// //定义一个混入对象
// var myMixin = {
//     created:function(){
//         this.hello();
//     },
//     methods:{
//         hello:function(){
//             console.log('hello from mixin');
//         }
//     }
// };
// //定义一个使用混入对象的组件
// var Component = Vue.extend({
//     mixins:[myMixin]
// });
//
// var component = new Component();
//
// var vm = new Vue({
//     el:'#example-mixin',
//     components:{
//         'component-mixin':Component//相当于new
//     }
// });
// //选项合并
// var mixin = {
//     data: function () {
//         return {
//             message: 'hello',
//             foo: 'abc'
//         }
//     }
// };
//
// new Vue({
//     mixins: [mixin],
//     data: function () {
//         return {
//             message: 'goodbye',
//             bar: 'def'
//         }
//     },
//     created: function () {
//         console.log(this.$data);
//     }
// });
// //钩子合并
// var mixin = {
//     created:function(){
//         console.log('mixin created')
//     }
// };
// new Vue({
//     mixins:[mixin],
//     created:function(){
//         console.log('Vue created');
//     }
// });
// //值为对象的合并
// var mixin = {
//     methods:{
//         foo:function(){
//             console.log('foo');
//         },
//         conflicting:function(){
//             console.log('from mixin');
//         }
//     }
// };
// var vm = new Vue({
//     mixins:[mixin],
//     methods:{
//         bar:function(){
//             console.log('bar');
//         },
//         conflicting:function(){
//             console.log('from self');
//         }
//     }
// });
// vm.foo();
// vm.bar();
// vm.conflicting();
// //全局混入
// Vue.mixin({
//     created:function(){
//         var myOption = this.$options.myOption
//         if(myOption){
//             console.log(myOption);
//         }
//     }
// });
//
// new Vue({
//     myOption:'hello!'//自定义选项，即为Vue本身不带的同data同级的选项
// });
// //全局自定义指令
// Vue.directive('focus', {
//     //当被绑定的元素插入到DOM中时...
//     inserted: function (el) {
//         //聚焦元素
//         el.focus();
//     }
// });
// var vm = new Vue({
//     el: '#example-directive'
// });
//局部自定义指令
// var vm = new Vue({
//     el:'#example-directive',
//     directives:{
//         focus:{
//             inserted:function(el){
//                 console.log('inserted');
//             },
//             bind:function(){
//                 console.log('bind');
//             }
//         }
//     }
// });
// //钩子函数参数
// Vue.directive('demo', {
//     inserted: function (el, binding, vnode) {
//         var s = JSON.stringify;
//         el.innerHTML =
//             'name:' + s(binding.name) + '<br>' +
//             'value    :' + s(binding.value) + '<br>' +
//             'expression :' + s(binding.expression) + '<br>' +
//             'arg :' + s(binding.arg) + '<br>' +
//             'modifiers :' + s(binding.modifiers) + '<br>'+
//             'vnode :'+Object.keys(vnode).join(',')+ '<br>';
//     },
//     update:function(el,binding,vnode,oldVnode){
//         var s = JSON.stringify;
//         el.innerHTML +='oldVnode :'+Object.keys(oldVnode).join(',')+'<br>'+
//         'oldValue :'+s(binding.oldValue);
//     }
// });
// var vm = new Vue({
//     el:'#example-directive',
//     data:{
//         data1:'111'
//     }
// });
// //钩子函数bind和update简写
// Vue.directive('demo',function(el,binding){
//     el.style.backgroundColor=binding.value;
// });
// var vm = new Vue({
//     el:'#example-directive',
//     data:{
//         data1:'red'
//     }
// });
// //对象字面量
// Vue.directive('demo',function(el,binding){
//     console.log(binding.value.color);
//     console.log(binding.value.text);
// });
// var vm = new Vue({
//     el:'#example-directive',
//     data:{
//         data1:{color:'red',text:'message'}
//     }
// });
// //渲染函数render
// Vue.component('example-render',{
//     props:{
//         level:{
//             type:Number,
//             required:true
//         }
//     },
//     render:function(createElement){
//         return createElement(
//             'h'+this.level,
//             this.$slots.default
//         );
//     }
// });
// var vm = new Vue({
//     el:'#example-render',
// });
//createElement参数1
// var MyComponent = {
//     props:['someProp'],
//     template:`<p>{{this.someProp}}</p>`
// };
// Vue.component('example-el',{
//     render:function(createElement){
//         return createElement(
//             //{String|Object|Function}一个HTML标签字符串，组件选项对象，或者解析上述任何一种的async异步函数，必选参数
//             'div',
//             //{Object}一个包含模板像相关属性的数据对象，你可以在template中使用这些特性。可选参数
//             {},
//             //{String | Array}子虚拟节点，由createElement生成，也可以使用纯文本方式构成，可选参数
//             [
//                 '文字',
//                 createElement('h1','一则头条'),
//                 createElement(MyComponent,{
//                     props:{
//                         someProp:'foobar'
//                     }
//                 })
//             ]
//         );
//     }
// });
//
// var vm = new Vue({
//     el:'#example-el'
// });
// //createElement参数2
// //取出所有子节点的text拼成字符串
// var getChildrenTextContent = function(children){
//     return children.map(function(node){
//         console.log(node);
//         return node.children ?getChildrenTextContent(node):node.text;
//     }).join("");
// };
// Vue.component('anchored-heading', {
//     props:{
//         level:{
//             type:Number
//         }
//     },
//     render: function (createElement) {
//         var headingId = getChildrenTextContent(this.$slots.default);
//         return createElement('h' + this.level, [createElement('a',
//             {
//                 attrs: {
//                     name:headingId,
//                     href: '#' +headingId
//                 }
//             },this.$slots.default
//         )]);
//     }
// });
// var vm = new Vue({
//     el:'#example-anchored'
// });
// //使用JavaScript替代模板功能
// Vue.component('demo-if', {
//     props: {
//         choose: {
//             type: Boolean
//         }
//     },
//     render: function (createElement) {
//         if (this.choose) {
//             return createElement('p', 'true');
//         } else {
//             return createElement('p', 'false');
//         }
//     }
// });
// Vue.component('demo-model', {
//     model:{
//         prop:'modelValue',
//         event:'input'
//     },
//     props: {
//         'modelValue': {
//             type: String
//         }
//     },
//     render: function (createElement) {
//         var self= this;
//         return createElement('input',
//             {
//                 domProps:{
//                     value:this.modelValue
//                 },
//                 on:{
//                     input:function(event){
//                         self.$emit('input',event.target.value)
//                     }
//                 }
//             },[this,
//             self.$slots.default
//             ]
//         );
//     }
// });
// var vm = new Vue({
//     el: '#demo-javascript',
//     data: {
//         choose: false,
//         modelValue: '1'
//     }
// });
//首字母大写过滤器
// Vue.filter('capitalize',function(value){
//     console.log(value);
//     if(!value){
//         return '';
//     }
//     value = value.toString();
//     return value.charAt(0).toUpperCase()+value.slice(1);
// });
//插槽
Vue.component('demo-slot', {
    data: function () {
        return {
            message: {text: 'text'}
        }
    },
    render: function (createElement) {
        return createElement('div', [
            this.$scopedSlots.s1({
                data: this.message
            })
        ])
    }
});
var vm = new Vue({
    el: '#example-slot',
    filters: {
        capitalize: function (value) {
            console.log(value);
            if (!value) {
                return '';
            }
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
});