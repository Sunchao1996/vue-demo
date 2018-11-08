//组件是可复用的 Vue 实例，且带有一个名字
Vue.component('button-counter', {
    //一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝
    data: function () {
        return {
            count: 0
        };
    },
    template: `<button @click="count++">You clicked me {{count}} times.</button>`
});

// var vm = new Vue({
//     el: '#components-demo'
// });
//-----
Vue.component('blog-post', {
    // props: ['title', 'content'],
    props: ['post'],
    template: `<div>
                <h3>{{post.title}}</h3>
                <!--$emit用于指定此组件有什么时间可以绑定，父组件可以将对应的方法和操作绑定到子组件上，若需要将值返回时，在后面添加参数即可-->
                <button v-on:click="$emit('enlarge-text',0.1,0.2)">Enlarge text</button>
                <div v-html="post.content"></div>
               </div>`
});
// var vm = new Vue({
//     el: '#blog-post-demo',
//     data: {
//         postFontSize: 1,
//         posts: [
//             {id: 1, title: 'My journey with Vue', content: '...content...'},
//             {id: 2, title: 'Blogging with Vue', content: '...content...'},
//             {id: 3, title: 'Why Vue is so fun', content: '...content...'}
//         ]
//     },
//     methods:{
//         fontSizeMethod:function(v1,v2){
//             this.postFontSize+=v1;
//             alert(v2)
//         }
//     }
// });
// //自定义组件的v-model
// Vue.component('custom-input', {
//     props: ['value'],
//     //$event表示input绑定的这个事件的对象，此段代码的意思为input的事件触发，将对应的改变的值返回给父组件显示出来
//     template: `<input v-bind:value="value" v-on:change="$emit('input',$event.target.value)" />`
// });
//
// var vm = new Vue({
//     el: '#custom-input',
//     data: {
//         value: ''
//     }
// });
//插槽，即<>中间内容显示的方法<>,<slot></slot>表示标签之间的内容
Vue.component('alert-box', {
    template: `<div>
                <strong>Error!</strong>
                <slot></slot>
                </div>`
});
var vm = new Vue({
    el:'#slotDemo'
});