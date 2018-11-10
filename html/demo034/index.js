const Foo = {
    data: function(){return {a: '1'}},
    template: `<div>foo</div>`, created: function () {
        console.log('foo');
    },
    beforeRouteEnter: function (to, from, next) {
        console.log('Foo beforeRouteEnter');
        next(vm => {
            console.log('beforeRouteEnter Callback'+vm.a);
        });
    }
};
const Bar = {
    template: `<div>bar</div>`, created: function () {
        console.log('bar');
    }
};
const User = {
    template: `<div><p>User{{$route.params.id}}</p><router-view></router-view></div>`
    , created: function () {
        console.log('user{}', this.$route.params.id);
    }, watch: {
        '$route': function (to, from) {
            console.log('watch route');
        }
    }, beforeRouteUpdate: function (to, from, next) {
        //此时的this表示前一个路由组件对象
        console.log('User ' + this.$route.params.id);
        console.log('to' + to);
        console.log('from' + from);
        // next(false);//表示不进行跳转
        next();//表示继续跳转
    }, beforeRouteLeave: function (to, from, next) {
        //此时this也表示前一个路由组件
        console.log('USER LEAVE' + this.$route.params.id);
        next();
    }
};
const UserProfile = {
    template: `<div>profile {{$route.params.id}}</div>`
};
const UserPosts = {
    template: `<div>posts {{$route.params.id}}</div>`
};
const User2 = {
    props: ['id'],
    template: `<div>User {{id}}</div>`
};
const routes = [
    {path: '/foo', components: {default: Foo, a: Bar}, alias: '/f'},
    {
        path: '/bar', component: Bar, beforeEnter: function (to, from, next) {
            console.log('/bar');
            next();
        }
    },
    {
        path: '/user/:id', component: User, children: [
            //访问/user/:id/profile的时候UserProfile会被添加到User的路由视图下
            {path: 'profile', component: UserProfile, name: 'user'},
            //访问/user/:id/posts的时候UserPosts会被添加到User的路由视图下
            {path: 'posts', component: UserPosts},
        ]
    },
    {path: '/user2/:id', component: User2, props: true},
    {path: '/user3/:id', components: {default: User2, a: User2}, props: {default: true, a: false}},
    {path: '/user4/:id', component: User2, props: {id: 2}},
    {
        path: '/user5/:id', component: User2, props: route => {
            return {id: route.params.id}
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

//全局守卫
router.beforeEach(function (to, from, next) {
    console.log('Router BeforeEach');
    next();
});
router.beforeResolve(function (to, from, next) {
    console.log('resolve router');
    next();
});
router.afterEach(function (to, from) {
    console.log('afterEach');
});
// router.push('/foo');
// router.push({name:'user',params:{id:1}});
// router.push({path:'/user/1/profile',query:{id:2}});
// router.push({path:'/user2/1'});
// router.push({path:'/user4/1'});
// router.push({path:'/user5/5'});
// router.push({path:'/home',component:User});
const app = new Vue({
    el: '#app',
    router
});