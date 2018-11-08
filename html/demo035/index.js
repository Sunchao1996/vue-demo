'use strict';
Vue.use(Vuex);
const modelA = {
    state: {
        count: 1,
        todos: [
            {id: 1, text: '...', done: true},
            {id: 2, text: '...', done: false}
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done);
        },
        doCount: (state, getters) => {
            return getters.doneTodos.length;
        },
        methodTodos: state => (id) => {
            return state.todos.filter(todo => todo.id === id);
        }
    },
    mutations: {
        increment: function (state, n) {
            state.count = state.count + n;
        },
        increment2: function (state, obj) {
            state.count = state.count + obj.count;
        },inputMutation:function(state,value){
            state.count = value;
        }
    },
    actions: {
        increment: function (context) {
            context.commit('increment', 10);
            console.log('action' + context.state.count);
        },
        increment2({commit, state}) {
            commit('increment', 10);
            console.log('action2' + state.count);
        },
        increment3({commit, state}) {
            setTimeout(() => {
                commit('increment', 10);
                console.log('action3:' + state.count);
            }, '3000')
        },
        increment4({commit, state}) {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    commit('increment', 10);
                    console.log('action4:' + state.count);
                    resolve();//对应.then后里面第一个success回调参数
                }, 3000);
            })
        }, increment5({commit, state, rootState, rootGetters}) {
            console.log('increment5:' + state.count + '  ' + rootState.countRoot + ' ' + rootGetters.doCountRoot);
        }
    }
};
const modelB = {
    state: {
        countB: 2
    }
};


const store = new Vuex.Store({
    state: {countRoot: 0,message:'a'},
    getters: {
        doCountRoot: function (state) {
            return state.countRoot;
        },getMessage:function(state){
            return state.message;
        }
    },
    modules: {
        a: modelA,
        b: modelB
    },
    mutations:{
        updateMessage:function(state,value){
            state.message = value;
        }
    }
});
store.dispatch('increment5');
// store.dispatch('increment4').then(()=>{
//     console.log('increment4 end');
// });
// store.commit('increment', 10);
// store.commit('increment2', {count: 11});
// store.commit({
//     type: 'increment2',
//     count: 21
// });
// console.log(store.state.count);
const map = Vuex.mapGetters;

const Counter = {
    data: function () {
        return {data: {count: 22}, stateCount: this.$store.state.count}

    }, template: `<div><input type="number" v-bind:value="stateCount" @input="inputChange">
                    <input v-model="message"/>
                    <button @click="increment2(data)">Submit</button></div>`,
    computed: {
        count: function () {
            // return this.$store.getters.doCount;
            return this.$store.state.count;
            // return this.increment2(22);
        },
        todos: function () {
            return this.$store.getters.doneTodos;
        },
        find1: function () {
            return this.$store.getters.methodTodos(1);
        },
        message:{
            get(){
                return this.$store.getters.getMessage;
            },
            set(value){
                this.$store.commit('updateMessage',value);
            }
        },
        ...map(['doCount'])
    },
    methods: {
        ...Vuex.mapMutations([
            'increment2'
        ]),inputChange:function(event){
            this.$store.commit('inputMutation',event.target.value);
        }
    }
};
const app = new Vue({
    el: '#app',
    store: store,
    components: {Counter},
    template: `<div class='app'><Counter></Counter></div>`
});