var data = {a:1};
var vm = new Vue({
    el:'#example',
    data:data
});
vm.$watch('a',function(newValue,oldValue){
    console.log('newValue'+newValue);
});