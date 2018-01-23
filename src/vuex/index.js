/**
 * Created by LXH on 2017/11/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


import homeStore from './modules/homeStore'
import loginStore from './modules/loginStore'
import groceryStore from './modules/groceryStore'

const store = new Vuex.Store({
    // 定义状态
    state: {
        picHead:'http://test.resource.vjuzhen.com/',
        indexLogo:'',
        indexName:'',
        fromPath:['home'],
        height:{}
    },
    mutations:{
    },
    actions: {
    },
    modules: {
        homeStore: homeStore,
        loginStore: loginStore,
        toolBox: groceryStore
    }
})
export default store