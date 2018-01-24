/**
 * Created by LXH on 2017/10/31.
 */
import axios from './axios.js'
import qs from 'qs'
import store from'../vuex/'
export const loginService = {
    api: {},
    getWXLoginUrl: function (params) { /* 使用微信登录，生成微信登录二维码 */
        return axios.get('/api/get/getWXLoginUrl' + this.getParam(params))
    },
    phoneLogin: function (params) {
        //return axios.post('/tokens/phone', qs.stringify(params))//需要先注册
        return axios.post('/tokens/bindphone', qs.stringify(params))
    },
    bindPhoneLogin: function (params) {
        return axios.post('/tokens/bindphone', qs.stringify(params))
    },
    pwdLogin: function (params) {
        return axios.post('/tokens/password', qs.stringify(params))
    },
    getWXByCode: function(params) {
        return axios.get('/tokens/wxinfo' + this.getParam(params));
    },
    getWXbaseCode: function(params) {
        return axios.get('/tokens/wxbaseinfo' + this.getParam(params));
    },
    getWBByCode: function(params) {
        return axios.get('/tokens/weiboinfo' + this.getParam(params));
    },
    getQQByCode: function(params) {
        return axios.get('/tokens/qqinfo' + this.getParam(params));
    },
    bindPhone: function (params) {
        return axios.put('/users' + this.getParam(params));
    },
    register: function (params) {
        return axios.post('/users' + this.getParam(params));
    },
    findPwd: function (params) {
        return axios.put('/passwords/phone' + this.getParam(params));
    },
    getSmsCode: function (params) {
        return axios.get('/sms' + this.getParam(params));
    },
    validataSmsCode: function (params) {
        return axios.post('/users', this.getParam(params));
    },
    packageUserInfo (info) {
        let that = this
        let Base64 = require('js-base64').Base64;
        let obj = eval('('+ Base64.decode(info) +')');
        store.state.userInfo.username = obj.name
        store.state.userInfo.userId = obj.userId
        store.state.userInfo.platform = obj.platform
        store.state.userInfo.exp = obj.exp
        store.state.userInfo.nbf = obj.nbf
    },
    getParam: function(param){
        let url = '';
        for(let key in param){
            if(param[key] !== null){
                url ? url += '&'+key+'='+param[key] : url += key+'='+param[key]
            }
        }
        return url ? '?'+url : ''
    }
}
// export default {loginService}
