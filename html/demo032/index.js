// var component = {
//     inheritAttrs:false,
//     props: ['label', 'value','className'],
//     template: ` <label>
//                 {{label}}
//                 <input v-bind:class="className" v-bind="$attrs"  v-on:input="$emit('input',$event.target.value)" v-bind:value="value" >
//                 </label>`
// };

// Vue.component('base-input',{
//     props:['value','label'],
//     template:`<label>{{label}}<input v-bind:value="value" v-on:input="$emit('input',$event.target.value)"/></label>`
// });
// Vue.component('base-input',{
//     inheritAttrs:false,
//     props:['value','label'],
//     template:`<label>{{label}}<input v-bind:value="value" v-on="inputListeners"/></label>`,
//     computed:{
//         inputListeners:function(){
//             var vm = this;
//             return Object.assign({},this.$listeners,{
//                 input:function(event){
//                     return vm.$emit('input',event.target.value);
//                 }
//             })
//         }
//     }
// });
// var vm = new Vue({
//     el: '#app',
//     components: {
//         'my-component': component
//     },
//     data:{
//         componentClass:{
//             class:'username-input',
//             placeholder:'Enter your username'
//         },
//         label:'Username ',
//         value:''
//     },
//     methods:{
//         onFocus:function(event){
//             event.preventDefault();
//             alert('focus');
//         },
//
//     }
// });


// Vue.component('text-document',{
//     props:['title'],
//     template:`<input v-bind:value='title' v-on:input="$emit('update:title',$event.target.value)"/></div>`
// });
//
// var vm = new Vue({
//     el:'#app-1',
//     data:{
//         title:'title',
//         data1:{
//             title:'1'
//         },
//
//     }
// });

// Vue.component('navigation-link',{
//     template:`<label><slot></slot></label>`
// });
//
// var vm = new Vue({
//     el:'#example-slot'
// });
// Vue.component('todo-list', {
//     data: function () {
//         return {
//             todos: [
//                 {text: '1', id: 1, isComplete: true},
//                 {text: '2', id: 2, isComplete: true},
//                 {text: '3', id: 3, isComplete: false}
//             ]
//         }
//     },
//     template: ` <ul>
//                     <li v-for="todo in todos" v-bind:key="todo.id">
//                         <!--slot 的 prop随意制定，使用的时候区分开即可-->
//                         <slot v-bind:td="todo">
//                             {{todo.text}}
//                         </slot>
//                     </li>
//                 </ul>`
// });
//
// var vm = new Vue({
//     el: '#example-slot2'
// });
// Vue.component('base-input', {
//     props: ['value', 'label'],
//     template: `<label>{{label}}<input v-bind:value="value" v-on:input="$emit('input',$event.target.value)" />
//                         <button v-on:click="$emit('btn-click')"><slot>Submit</slot></button></label>`
// });
//
// var vm = new Vue({
//     el: '#example-ref',
//     data:{
//       inputValue:''
//     },
//     methods: {
//         btnClick: function () {
//             var label = this.$refs.usernameInput.label;
//             alert(label)
//         }
//     }
// });

Vue.component('base-template',{

});
var vm = new Vue({
    el:'#example-template'
});