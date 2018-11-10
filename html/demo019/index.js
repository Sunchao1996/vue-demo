var vm = new Vue({
    el: '#app-19',
    data: {
        message: 'Hello!'
    },
    methods:{
      getreversedMessage:function(){
          return this.message.split('').reverse().join('');
      }
    },
    computed: {
        //计算属性的getter
        reversedMessage: function () {
            //this 指向vm实例
            return this.message.split('').reverse().join('');
        }
    }
});