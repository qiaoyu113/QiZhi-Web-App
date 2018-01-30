/**
 * Created by zhong on 2017/10/24.
 *
 * (resolve) =>{require(['../components/test.vue'],resolve)}
 *
 */
import Vue from 'vue'
import store from './vuex'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 定义全局组件
import zmodal from './component/common/modal.vue'
import zbanner from './component/common/banner.vue'
import zfooter from './component/common/footer.vue'
import zhistory from './component/common/goback.vue'
import backhome from './component/common/back-home.vue'

Vue.component('z-modal', zmodal)
Vue.component('z-banner', zbanner)
Vue.component('z-footer', zfooter)
Vue.component('z-history', zhistory)
Vue.component('z-home', backhome)


// 定义组件
const short = (resolve) => {require(['./pages/short.vue'],resolve)}
const home = (resolve) => {require(['./pages/home/home.vue'],resolve)}
// 直播
const live = (resolve) => {require(['./pages/home/home.vue'],resolve)}
const liveDetails = (resolve) => {require(['./pages/home/home.vue'],resolve)}
 //首页
const index = (resolve) => {require(['./pages/home/index.vue'],resolve)}
 //文章
const list = (resolve) => {require(['./pages/article/list.vue'],resolve)}
const article = (resolve) => {require(['./pages/article/details.vue'],resolve)}
//专题
const specialList = (resolve) => {require(['./pages/special/list.vue'],resolve)}
const special = (resolve) => {require(['./pages/special/details.vue'],resolve)}
//活动
const activity = (resolve) => {require(['./pages/activity/details.vue'],resolve)}
//专栏
const specialColumn = (resolve) => {require(['./pages/specialColumn/details.vue'],resolve)}
const specialContent = (resolve) => {require(['./pages/specialColumn/content.vue'],resolve)}
// 直播详情
const broadcast = (resolve) => {require(['./pages/broadcast/details.vue'],resolve)}
// 404错误页面
const error = (resolve) => {require(['./pages/error.vue'],resolve)}

// 创建路由器实例，配置路由规则
const routers = [
    {path: '/d/:shortId', component: short},
    {name: 'home',path:'/',component: home, meta: {keepAlive: true}},
    {name: 'err',path:'/s/404',component: error}, //错误跳到404页面
    // 直播
    {name: 'live',path:'/lives',component: live},
    {name: 'liveDetails',path:'/lives/detail/:liveDetailId',component: liveDetails},
    //首页
    {name: 'index',path:'/index',component: index},
    // 文章
    {name: 'article',path:'/articles/:id',component: article},
    {name: 'list',path:'/article/list',component: list},
    //专题
    {name: 'special',path:'/special',component: special},
    {name: 'specialList',path:'/special/list',component: specialList},
    //活动
    {name: 'activity',path:'/activity/:id',component: activity},
    //专栏
    {name: 'specialColumn',path:'/specialColumn/:id',component: specialColumn},
    {name: 'specialContent',path:'/specialContent/:id/:type',component: specialContent},
    // 直播详情
    {name: 'broadcast',path:'/broadcasts/:id',component: broadcast},
    
]

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes:routers
})

let isClient = typeof window != 'undefined' ? true : false
router.beforeEach((to, from, next) => {
    if(from.name == 'home' || from.name == 'activityList' || from.name == 'activity' || from.name == 'article' || from.name == 'columnlist' || from.name == 'knowledge' || from.name == 'articleList' || from.name == 'live'){
        if(!isClient) return
        store.state.height[from.name] = document.body.scrollTop
        // console.log(document.body.scrollTop,111);
    }
    next()
})
router.afterEach((to, from, next) => {

    function checkUrl() {
        if(to.name=='login' || to.name=='password' || to.name=='find' || to.name=='bind' || to.name=='register') return false
        else if(to.name=='wxbaselogin' || to.name=='wxlogin' || to.name=='wblogin' || to.name=='qqlogin' || to.name=='wxbaselogin') return false
        else if(to.name=='weChatAct' || to.name=='weChatAdmin' || to.name=='wxBind' || to.name=='wxcode' || to.name=='payOk') return false
        else if(to.name=='pay' || to.name=='pay2' || to.name=='applyAdmin') return false
        else{ return true}
    }
    if( checkUrl()) {
        let i = store.state.fromPath.length-1
        // console.log('from',store.state.fromPath[i],'to',to.path);
        if(store.state.fromPath[i] != to.path){
            if(to.name != 'home'){
                if (i<2 || store.state.fromPath[i - 1] != to.path){
                    // console.log('记录frompath');
                    store.state.fromPath.push(to.path);
                }
            }else if(store.state.fromPath[i] !='home'){
                store.state.fromPath.push('home');
            }
        }

        if (i<1 || store.state.fromPath[i - 1] != to.path) {
            // console.log('增加state');
            if(!isClient) return
            window.history.pushState({}, '', window.location.href)
        } else if (store.state.fromPath[i - 1] == to.path) {
            // console.log('删除frompath',store.state.fromPath);
            store.state.fromPath.pop();
        }
    }
});

export default router