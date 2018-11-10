var obj = {
    foo:'bar'
};
Object.freeze(obj);
var vm = new Vue({
    el:'#app-11',
    data:obj
});